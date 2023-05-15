import axios from "axios"

const instance = axios.create({
    timeout:5000,
    baseURL:"http://geek.itheima.net/v1_0/"
})
//配置拦截器
instance.interceptors.request.use(config=>{
    //对config做点什么
    return config
},error=>{
    //对错误做点儿什么
    return Promise.reject(error)
})
//配置响应拦截器
instance.interceptors.response.use(response=>{
    //对响应做点儿什么
    return response.data
},err=>{
     return Promise.reject(err)
})
export default instance 