//数据库配置
// 引入mongoose库，用于连接MongoDB数据库
const mongoose = require('mongoose');

// 导出一个函数，该函数接受一个Express应用程序实例作为参数
module.exports = app => {

    // 连接MongoDB数据库，使用'mongodb://127.0.0.1:27017/pvp-site'作为连接字符串
    mongoose.connect('mongodb://127.0.0.1:27017/pvp-site', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // 监听数据库连接的一次性事件，一旦数据库连接成功，执行回调函数
    mongoose.connection.once('open', () => {
        console.log('连接成功～');  // 在控制台输出连接成功的消息
    });
}