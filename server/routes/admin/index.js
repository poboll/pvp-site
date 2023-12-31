// 导出一个函数，该函数接收一个 Express 应用实例作为参数
module.exports = app => {
    // 引入 Express 库
    const express = require('express');

    // 定义一个路由，这是一个 Express 的子路由
    const router = express.Router({
        /** 合并url参数。把父级app.use中的参数合并到router实例中，
          * 这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
          */
        mergeParams: true
    });

    // 引入 Category 模型
    // const Category = require('../../models/Category');
    // 要在每个路由里面找到对应关系(url)

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

    // 在子路由上添加 GET 方法，接口地址通过 url 判断
    router.get('/', async (req, res) => {
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

    //通过id获取分类详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    });

    //更新分类
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });

    //删除分类
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
        /**添加中间件处理 
         * 获取resource字段是接口的名称，如categories，由于接口名称和模型名称有大小写和单复数区别
         * 需要操作模型，使用 inflection 转换成类名
         */
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`) // 给请求对象上挂载一个属性
        next()
    }, router)
};