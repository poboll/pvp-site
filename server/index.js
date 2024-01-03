// 引用 Express 模块
const express = require('express');

// 创建 Express 实例
const app = express();

// 使用 CORS 中间件，处理跨域请求
app.use(require('cors')());

// 使用 Express 内置的 JSON 解析中间件，处理请求体中的 JSON 数据
app.use(express.json());

//托管静态文件，使该目录里的文件可以被客户端通过 /upload 这个地址访问
app.use('/uploads', express.static(`${__dirname}/uploads`))

// 默认端口，如果环境变量中有指定端口则使用环境变量中的值，否则使用3000端口
const port = process.env.PORT || 3000;

// 引入后端路由：将 Express 实例传递给该模块，这样 admin 路由里就有一个可用的 app 对象
require('./routes/admin')(app);

// 引入数据库配置
require('./plugins/db')(app);

// 监听指定端口，当有请求到达时调用回调函数
app.listen(port, () => {
    // 设置主机地址为 'localhost' 或 '127.0.0.1'，这里的 '0.0.0.0' 通常用于在本地和远程都可访问的情况
    const host = 'localhost' || '127.0.0.1'; // 或者使用 '0.0.0.0'

    // 在控制台输出应用启动的消息，包括主机地址和端口号
    console.log(`App listening on http://${host}:${port}`);
});