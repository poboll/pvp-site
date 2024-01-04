<template>
    <div class="item-container">
        <h1>{{ id ? '编辑' : '新建' }}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="`${$.defaults.baseURL}/upload`" :show-file-list="false"
                    :on-success="uploadSuccess">
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
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
            model: {
                // name: "",
                // icon: ""
            }
        };
    },
    created() {
        // &&代表满足前面的条件之后才执行后面的函数
        this.id && this.getmodel();
    },
    methods: {
        // 获取物品信息
        async getmodel() {
            let res = await this.$.get(`rest/items/${this.id}`);
            this.model = res.data;
        },
        async save() {
            try {
                if (this.id) {
                    await this.$.put(`rest/items/${this.id}`, this.model);
                } else {
                    await this.$.post("rest/items", this.model);
                }
                const editTime = new Date();
                console.log(`${editTime.toLocaleString()}\n保存成功，物品名称：${this.model.name}`);
                // 保存成功后跳转到物品列表
                this.$router.push("/items/list");
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
        //图片上传完成
        uploadSuccess(res) {
            this.$set(this.model, 'icon', res.url)
            // this.model.icon = res.url;// 触发 VUE 无法赋值 => 显式赋值
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
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>