// 导入 Axios 库
import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个名为 http 的 Axios 实例，设置基础请求地址 baseURL
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 全局拦截器
http.interceptors.response.use((res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const { code } = res.data

    if (code === 0) {
        const { msg } = res.data
        if (msg) {
            Message.error(msg)
            // Vue.prototype.$message({
            //     type: 'error',
            //     message: msg
            // })
        }
    }

    return res;
}, (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(err);
});

// 导出 http 变量，使其可以在其他文件中使用
export default http