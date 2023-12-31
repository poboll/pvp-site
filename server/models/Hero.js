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
    },
    // 称号
    title: {
        type: String
    },
    // 英雄分类 (单个英雄可能属于多个分类，所以这里使用数组方式)
    categories: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category'
        }
    ],
    // 评分
    scores: {
        // 难度
        difficult: {
            type: Number
        },
        // 技能
        skills: {
            type: Number
        },
        // 攻击
        attack: {
            type: Number
        },
        // 生存
        survive: {
            type: Number
        },
    },
    // 技能，只要是复数就设置成数组
    skills: [
        {
            // 技能图标
            icon: { type: String },
            // 技能名称
            name: { type: String },
            // 描述
            description: { type: String },
            // 小提示
            tips: { type: String }
        }
    ],
    // 出装装备（顺风出装）
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 出装装备（逆风出装）
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 使用技巧 
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 英雄关系
    partners: [
        {
            // 关联英雄模型
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
            // 描述
            description: { type: String }
        }
    ]
})

// 导出一个 Hero 模型
module.exports = mongoose.model('Hero', schema)