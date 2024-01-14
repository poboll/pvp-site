<template>
    <div class="item-container">
        <!-- 根据id属性决定是编辑还是新建物品 -->
        <h1>{{ id ? '编辑' : '新建' }}物品</h1>
        <!-- 表单，@submit.native.prevent="save" 表示在表单提交时调用 save 方法并阻止默认事件 -->
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- 物品名称输入框 -->
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <!-- 物品图标上传组件 -->
            <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="`${$.defaults.baseURL}/upload`" :show-file-list="false"
                    :on-success="uploadSuccess">
                    <!-- 根据是否有图标来显示图标或上传图标的提示 -->
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "itemCreate",
    props: {
        id: {}
    },
    data() {
        return {
            // 物品信息
            model: {
                // name: "",
                // icon: ""
            }
        };
    },
    created() {
        // 如果有id属性，则调用getmodel方法获取物品信息
        this.id && this.getmodel();
    },
    methods: {
        // 获取物品信息
        async getmodel() {
            // 使用REST API获取物品信息
            let res = await this.$.get(`rest/items/${this.id}`);
            // 将获取到的物品信息保存到model变量中
            this.model = res.data;
        },
        // 保存物品信息
        async save() {
            try {
                if (this.id) {
                    // 如果有id属性，则使用put请求更新物品信息
                    await this.$.put(`rest/items/${this.id}`, this.model);
                } else {
                    // 如果没有id属性，则使用post请求创建新物品
                    await this.$.post("rest/items", this.model);
                }
                // 获取当前时间
                const editTime = new Date();
                // 打印保存成功信息
                console.log(`${editTime.toLocaleString()}\n保存物品：${this.model.name}成功`);
                // 保存成功后跳转到物品列表页
                this.$router.push("/items/list");
                // 弹出保存成功的消息
                this.$message({
                    type: 'success',
                    message: '保存成功'
                });
            } catch (error) {
                // 处理保存失败的情况，例如弹出错误消息
                console.error('保存失败', error);
                this.$message({
                    type: 'error',
                    message: '保存失败'
                });
            }
        },
        // 图片上传成功的回调函数
        uploadSuccess(res) {
            // 使用this.$set来触发响应式更新，将上传成功的图标链接保存到model中
            this.$set(this.model, 'icon', res.url)
        }
    }
};
</script>