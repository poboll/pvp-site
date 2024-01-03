// 分类模型
const mongoose = require('mongoose')

// 创建分类模型的字段
const schema = new mongoose.Schema({
    // 英雄名称
    name: {
        type: String
    },
    // 头像
    avatar: {
        type: String
    }
})

// 导出一个Category模型
module.exports = mongoose.model('Hero', schema)