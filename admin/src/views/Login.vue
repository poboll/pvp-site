<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="info.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="info.password">></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            info: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        // 登录
        async login() {
            let { username, password } = this.info;
            if (!username || !password) {
                this.$message("请填写完整");
                return;
            }
            this.$.post("login", this.info).then(res => {
                const { code } = res.data;
                if (code === 1) {
                    const { token } = res.data;
                    // 当前token写入浏览器localStorage永久存储 | 暂时存储sessionStorage
                    localStorage.token = token;
                    // 跳转到首页
                    this.$router.push("/");
                    // 弹出提示框
                    this.$message({
                        type: 'success',
                        message: '登录成功'
                    })
                }
            });
        }
    }
};
</script>
<style>
.login-container .login-card {
    margin: 6rem auto;
    width: 35rem;
}
</style>