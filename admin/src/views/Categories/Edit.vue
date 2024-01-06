<template>
    <div>
        <!-- 根据是否有id属性决定是编辑还是新建分类 -->
        <h1>{{ id ? '编辑' : '新建' }}分类</h1>

        <!-- 表单 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- 下拉菜单：子分类 -->
            <el-form-item label="上级分类">
                <!-- 做 id 关联 -->
                <el-select v-model="model.parent">
                    <!-- 添加虚拟的上级分类，表示 "无上级分类" -->
                    <el-option :label="'无上级分类'" :value="null"></el-option>
                    <!-- 渲染真实的上级分类 -->
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 表单项：名称 -->
            <el-form-item label="名称">
                <!-- 使用 v-model 双向绑定输入框的值与数据模型中的 name 属性 -->
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <!-- 表单项：保存按钮 -->
            <el-form-item>
                <!-- 取消按钮，点击触发 cancel 方法 -->
                <el-button @click="cancel">取消</el-button>
                <!-- 提交按钮，点击触发 save 方法 -->
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "categoryCreate", // 组件名称
    // 路由解耦
    props: {
        id: {}
    },
    data() {
        return {
            // 表单数据模型
            model: {
                // 初始值
                parent: null,
                name: ''
            },
            parents: [],
        };
    },
    created() {
        this.getParents()
        //&&代表满足前面的条件之后才执行后面的函数
        this.id && this.getModel();
    },
    methods: {
        //初始化上级分类
        async getParents() {
            let res = await this.$.get(`rest/categories`);//`/parent-options`
            this.parents = res.data;
        },
        //获取分类信息
        async getModel() {
            let res = await this.$.get(`rest/categories/${this.id}`);
            this.model = res.data;
        },
        // 保存表单数据的方法
        async save() {
            try {
                let res;
                if (this.id) {
                    res = await this.$.put(`rest/categories/${this.id}`, this.model);
                } else {
                    // 发送 post 请求创建新分类
                    res = await this.$.post('rest/categories', this.model);
                }
                const editTime = new Date();
                console.log(`${editTime.toLocaleString()}\n保存成功，分类名称：${this.model.name}`);
                // 保存成功后跳转到分类列表
                this.$router.push('/categories/list');
                // 弹出保存成功的消息
                this.$message({
                    type: 'success',
                    message: '保存成功'
                });
            } catch (error) {
                console.error('保存失败', error);
                // 处理保存失败的情况，例如弹出错误消息
                this.$message({
                    type: 'error',
                    message: '保存失败'
                });
            }
        },
        // 取消操作的方法
        cancel() {
            // 跳转回分类列表页
            this.$router.push('/categories/list');
        }
    }
};
</script>

<style></style>