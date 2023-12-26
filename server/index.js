// 引用express模块
const express = require('express');

// 创建express实例
const app = express();

// 默认端口，如果环境变量中有指定端口则使用环境变量中的值，否则使用3000端口
const port = process.env.PORT || 3000;

// 引入后端路由：将express实例传递给该模块，这样admin里就有一个app可用
require('./routes/admin')(app);

//引入数据库配置
require('./plugins/db')(app)

// 监听指定端口，当有请求到达时调用回调函数
app.listen(port, () => {
    // 设置主机地址为'localhost'或'127.0.0.1'，这里的'0.0.0.0'通常用于在本地和远程都可访问的情况
    const host = 'localhost' || '127.0.0.1'; // 或者使用 '0.0.0.0'
    
    // 在控制台输出应用启动的消息，包括主机地址和端口号
    console.log(`App listening on http://${host}:${port}`);
});