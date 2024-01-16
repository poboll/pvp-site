const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        // 查询这个模型的时候不查询password这个字段
        select: false,
        // 密码需要加密
        set(val) {
            // 使用 bcrypt 库的散列（同步）方法对值进行加密后再存入数据库，加密强度为10
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)