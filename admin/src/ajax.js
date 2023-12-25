// 导入 Axios 库
import axios from 'axios'

// 创建一个名为 http 的 Axios 实例，设置基础请求地址 baseURL
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 导出 http 变量，使其可以在其他文件中使用
export default http