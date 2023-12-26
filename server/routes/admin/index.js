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

    // 将子路由挂载到 '/admin/api' 路径上
    // 这意味着访问 '/admin/api/categories' 将会触发上面定义的 POST 方法
    app.use('/admin/api', router);
};