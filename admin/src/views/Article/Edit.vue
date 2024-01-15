<template>
    <div class="container">
        <!-- 根据是否有id属性决定是编辑还是新建文章 -->
        <h1>{{ id ? '编辑' : '新建' }}文章</h1>
        <!-- 表单，@submit.native.prevent="save" 表示在表单提交时调用 save 方法并阻止默认事件 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="article.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <!-- 文章标题输入框 -->
            <el-form-item label="标题">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="article.body"></vue-editor>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
//富文本编辑器库
import { VueEditor } from "vue2-editor";
export default {
    name: "articleCreate",
    props: {
        id: {}
    },
    components: {
        VueEditor
    },
    data() {
        return {
            // 文章信息对象，包含标题
            article: {
                title: "",
                body: "",
                categories: []
            },
            //文章分类
            categories: []
        };
    },
    created() {
        // 如果有id属性，则调用getInfo方法获取文章信息
        this.id && this.getInfo();
        this.getCategories();
    },
    methods: {
        // 获取文章信息
        async getInfo() {
            // 使用this.$来调用Vue实例的方法，通过REST API获取文章信息
            let res = await this.$.get(`rest/articles/${this.id}`);
            // 将获取到的文章信息保存到article对象中
            this.article = res.data;
        },
        //获取文章分类
        async getCategories() {
            let res = await this.$.get(`rest/categories`);
            this.categories = res.data;
        },
        // 保存文章信息，根据id属性选择使用put或post请求
        async save() {
            if (this.id) {
                await this.$.put(`rest/articles/${this.id}`, this.article);
            } else {
                await this.$.post("rest/articles", this.article);
            }
            console.log(`${new Date().toLocaleString()}\n保存文章：${this.article.title}成功`);
            // 保存成功后跳转到文章列表页
            this.$router.push("/articles/list");
        },
        // 富文本编辑器上传图片
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$.post("upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        }
    }
};
</script>