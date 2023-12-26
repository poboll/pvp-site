// 引入mongoose库，用于与MongoDB数据库进行交互
const mongoose = require('mongoose');

// 创建分类模型的字段定义
const schema = new mongoose.Schema({
    // 定义字段 "name"，类型为字符串
    name: {
        type: String
    }
});

// 使用mongoose的Schema来定义数据模型（Model）"Category"
// 第一个参数是模型的名称，第二个参数是前面定义的schema
const CategoryModel = mongoose.model('Category', schema);

// 导出创建好的Category模型，以便其他文件或模块可以使用
module.exports = CategoryModel;