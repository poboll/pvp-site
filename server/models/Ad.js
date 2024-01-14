const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 描述
    name: { type: String },
    items: [{
        // 图片地址
        image: { type: String },
        // 图片跳转连接
        url: { type:String },
    }]
})

module.exports = mongoose.model('Ad', schema)