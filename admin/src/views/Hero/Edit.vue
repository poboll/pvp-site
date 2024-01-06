<template>
    <div class="hero-container">
        <!-- 页面标题，根据是否有id属性决定是编辑还是新建英雄 -->
        <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
        <!-- 表单，@submit.native.prevent="save" 表示在表单提交时调用 save 方法并阻止默认事件 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- 切换标签页，有两个标签页：基础信息和技能 -->
            <el-tabs value="skills" type="border-card">
                <!-- 基础信息标签页 -->
                <el-tab-pane label="基础信息" name="basic">
                    <!-- 基础信息表单项：名称、称号、头像、分类、难度、技能等 -->
                    <!-- 上传头像的组件 -->
                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" :action="`${$.defaults.baseURL}/upload`" :show-file-list="false"
                            :on-success="uploadSuccess">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <!-- 下拉选择分类的组件 -->
                    <el-form-item label="分类">
                        <el-select v-model="model.categories" multiple>
                            <!-- 遍历显示分类选项 -->
                            <el-option v-for="item of categories" :key="item._id" :label="item.name"
                                :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 使用 el-rate 组件展示难度、技能、攻击和生存评分 -->
                    <el-form-item label="难度">
                        <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <!-- 其他表单项，包括顺风出装、逆风出装等 -->
                </el-tab-pane>
                <!-- 技能标签页 -->
                <el-tab-pane label="技能" name="skills">
                    <!-- 添加技能按钮，点击调用 model.skills.push({}) 来添加新的技能项 -->
                    <el-button size="small" @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能
                    </el-button>
                    <!-- 技能列表，使用 el-row 和 el-col 来展示技能项的表单 -->
                    <el-row type="flex" style="flex-wrap: wrap;">
                        <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
                            <!-- 技能项表单，包括名称、图标、描述、小提示等 -->
                            <!-- 删除按钮，点击调用 model.skills.splice(index, 1) 来删除对应的技能项 -->
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <!-- 提交按钮 -->
            <el-form-item style="margin-top: 1rem;">
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "heroEdit",
    props: {
        id: {}
    },
    data() {
        return {
            // 英雄信息
            model: {
                // 属性和默认值
            },
            // 英雄分类
            categories: [],
            // 装备（物品）列表
            items: []
        };
    },
    created() {
        // 在组件创建时调用获取英雄分类、物品列表和英雄信息的方法
        this.getItemsList();
        this.getCategories();
        // 如果有id属性，则调用getModel方法获取英雄信息
        this.id && this.getModel();
    },
    methods: {
        // 获取英雄信息
        async getModel() {
            // 使用REST API获取英雄信息
            let res = await this.$.get(`rest/heroes/${this.id}`);
            // 将获取到的英雄信息合并到model中
            this.model = Object.assign({}, this.model, res.data);
        },
        // 获取英雄分类
        async getCategories() {
            // 使用REST API获取英雄分类
            let res = await this.$.get(`rest/categories`);
            this.categories = res.data;
        },
        // 获取装备（物品）列表
        async getItemsList() {
            // 使用REST API获取装备（物品）列表
            let res = await this.$.get("rest/items");
            this.items = res.data;
        },
        // 保存英雄信息
        async save() {
            try {
                if (this.id) {
                    // 如果有id属性，则使用put请求更新英雄信息
                    await this.$.put(`rest/heroes/${this.id}`, this.model);
                } else {
                    // 如果没有id属性，则使用post请求创建新英雄
                    await this.$.post("rest/heroes", this.model);
                }
                // 保存成功后跳转到英雄列表页
                this.$router.push("/heroes/list");
                // 弹出保存成功的消息
                this.$message({
                    type: 'success',
                    message: '保存成功'
                });
            } catch (error) {
                // 处理保存失败的情况，例如弹出错误消息
                this.$message({
                    type: 'error',
                    message: '保存失败'
                });
            }
        },
        // 图片上传成功的回调函数
        uploadSuccess(res) {
            // 更新头像链接
            this.model.avatar = res.url;
        }
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.avatar {
    width: 5rem;
    height: 5rem;
    display: block;
}
</style>