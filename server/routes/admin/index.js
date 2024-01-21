// 导出一个函数，该函数接收一个 Express 应用实例作为参数
module.exports = app => {
    // 引入 Express 库
    const express = require('express');
    const jwt = require('jsonwebtoken')
    // 全局报错：const assert = require('http-assert')
    // 使用：assert(user, 422, '用户不存在')
    // 处理：app.use(async(err, req, res, next) => {
    //     //console.log(err)
    //     res.status(err.statusCode || '500').send({
    //         message: err.message
    //     })
    // })

    // 定义一个路由，这是一个 Express 的子路由
    const router = express.Router({
        /** 合并url参数。把父级app.use中的参数合并到router实例中，
          * 这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
          */
        mergeParams: true
    });

    // 引入Admin模型
    const Admin = require('../../models/AdminUser')
    // 引入 Category 模型
    // const Category = require('../../models/Category');
    // 要在每个路由里面找到对应关系(url)

    // 创建资源
    // 在子路由上添加 POST 方法，接口地址通过 url 判断
    router.post('/', async (req, res) => {
        try {
            // 从请求体中获取数据，创建 req.Model 模型实例
            const model = await req.Model.create(req.body);

            // 将创建好的模型实例作为响应发送回客户端
            res.send(model);
        } catch (error) {
            // 如果出现错误，将错误信息发送回客户端
            res.status(500).send(error.message);
        }
    });

    // 资源列表
    // 在子路由上添加 GET 方法，接口地址通过 url 判断
    router.get('/', async (req, res, next) => {
        // 中间件、在任意处理函数前添加 async function(req, res, next) 接收三个参数
        // 获取用户信息：请求头
        // split分割，pop（）提取最后的元素
        const token = String(req.headers.authorization || '').split(' ').pop()
        // console.log(token)

        // 没有token告知用户先登录
        if (!token) {
            res.send({
                code: 110,
                msg: '请先登录'
            })
        }

        // [结构赋值]通过从前端获取的token解密出是哪个id生成的
        const { id } = jwt.verify(token, app.get('secret'))

        // 查询出这个user挂载到req中，接下来接口即可使用
        req.user = await Admin.findById(id)
        console.log(req.user)

        if (!req.user) {
            res.send({
                code: 110,
                msg: '请先登录'
            })
        }

        // 调用 next
        await next()
    }, async (req, res) => {
        try {
            // return res.send({ modelName })
            // 从请求体中获取数据，创建 req.Model 模型实例、关联取出
            // const items = await req.Model.find().limit(10);
            let queryOptions = {}
            //检查模型名称
            if (req.Model.modelName === 'Category') {
                queryOptions = {
                    populate: 'parent'
                }
            }
            const items = await req.Model.find().setOptions(queryOptions).limit(10)
            // 将创建好的模型实例作为响应发送回客户端
            res.send(items);
        } catch (error) {
            // 如果出现错误，将错误信息发送回客户端
            res.status(500).send(error.message);
        }
    });

    // 资源详情
    // 通过id获取资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    });

    // 更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });

    // 删除资源
    router.delete('/:id', async (req, res) => {
        // await Category.findOneAndDelete(req.params.id)
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 将子路由挂载到 '/admin/api' 路径上
    // rest代表的是通用的接口；resource用来动态获取接口地址，如categories
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        /** 添加中间件处理 
         *  获取resource字段是接口的名称，如categories，由于接口名称和模型名称有大小写和单复数区别
         *  需要操作模型，使用 inflection 转换成类名
         */
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`) // 给请求对象上挂载一个属性
        next()
    }, router)

    const multer = require('multer')// 专门用于处理中间件
    const upload = multer({ dest: `${__dirname}/../../uploads` })// 目标地址，当前文件夹目录__dirname
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {// 接收上传的单个文件
        // 之所以可以用req.file获取到文件数据，是因为用multer库的upload.single('file')将file参数赋值到req上
        const file = req.file

        // 给file里面添加一个url属性，作为前端展示图片的一个地址，需要用上面已有的file对象内的属性拼接出来
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录接口
    app.post('/admin/api/login', async (req, res) => {
        // 根据参数进行解构
        const { username, password } = req.body

        // 1.根据用户名找用户
        /**[键值对]
         * 由于在Admin模型中设置了password字段默认不被查出来（select:false），如果想要查询
         * password这个字段，用select('+password')表示增加查询password这个字段
         */
        const user = await Admin.findOne({ username }).select('+password')

        // 查询不到用户
        if (!user) {
            res.send({
                code: 0,
                msg: '该用户不存在'
            })
        }

        // 2.校验密码
        // 用用户传进来的password和数据库中查到的用户password值进行对比 返回布尔值
        let isValid = require('bcrypt').compareSync(password, user.password)

        // 密码错误
        if (!isValid) {
            res.send({
                code: 0,
                msg: '密码错误'
            })
        }

        // 3.返回token
        // 生成token(jwt签名)
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))

        res.send({
            code: 1,
            token
        })
    })
};