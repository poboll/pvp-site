//引用express
const express = require('express')

//创建express实例
const app = express()

// 默认端口
const port = process.env.PORT || 3000;

//会在3000端口启动，启动后会调用回调函数
app.listen(port, () => {
    const host = 'localhost' || '127.0.0.1'; // '0.0.0.0'
    console.log(`App listening on http://${host}:${port}`);
});