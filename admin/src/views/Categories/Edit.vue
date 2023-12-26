<template>
    <div>
        <!-- 标题：新建分类 -->
        <h1>新建分类</h1>

        <!-- 表单 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- 表单项：名称 -->
            <el-form-item label="名称">
                <!-- 使用 v-model 双向绑定输入框的值与数据模型中的 name 属性 -->
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <!-- 表单项：保存按钮 -->
            <el-form-item>
                <!-- 提交按钮，点击触发 save 方法 -->
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
export default {
    name: "Create", // 组件名称
    data() {
        return {
            // 表单数据模型
            model: {
                name: "" // 初始值为空字符串
            }
        };
    },
    methods: {
        // 保存表单数据的方法
        async save() {
            try {
                // 发送 post 请求创建新分类
                let res = await this.$http.post('categories', this.model);
                console.log(res);
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
        }
    }
};
</script>
  
<style scoped lang="scss"></style>