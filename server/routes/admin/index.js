// 导出一个函数，该函数接收一个 Express 应用实例作为参数
module.exports = app => {
    // 引入 Express 库
    const express = require('express');

    // 定义一个路由，这是一个 Express 的子路由
    const router = express.Router();

    // 引入 Category 模型
    const Category = require('../../models/Category');

    // 在子路由上添加一个 POST 方法，接口地址是 '/categories'
    router.post('/categories', async (req, res) => {
        try {
            // 从请求体中获取数据，创建 Category 模型实例
            const model = await Category.create(req.body);

            // 将创建好的模型实例作为响应发送回客户端
            res.send(model);
        } catch (error) {
            // 如果出现错误，将错误信息发送回客户端
            res.status(500).send(error.message);
        }
    });

    // 在子路由上添加一个 GET 方法，接口地址是 '/categories'
    router.get('/categories', async (req, res) => {
        try {
            // 从请求体中获取数据，创建 Category 模型实例、关联取出
            // const items = await Category.find().limit(10);
            const items = await Category.find().populate('parent').limit(10)

            // 将创建好的模型实例作为响应发送回客户端
            res.send(items);
        } catch (error) {
            // 如果出现错误，将错误信息发送回客户端
            res.status(500).send(error.message);
        }
    });

    //通过id获取分类详情
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    });

    //更新分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });

    //删除分类
    router.delete('/category/:id', async (req, res) => {
        // await Category.findOneAndDelete(req.params.id)
        await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 将子路由挂载到 '/admin/api' 路径上
    // 这意味着访问 '/admin/api/categories' 将会触发上面定义的 POST 方法
    app.use('/admin/api', router);
};