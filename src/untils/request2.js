import axios from 'axios'

import { MessageBox, Message } from 'element-ui'

import { getToken } from '@/untils/auth'

import store from '@/store'

// create an axios instance
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,// api 的 base_url
    withCredentials:true,// 跨域请求时发送 cookies
    timeout:5000,
})

//  request interexpectors
service.interceptors.request.use(config=>{
    // 判断用户的token是否存在
    if(store.getters.token){
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['X-Token'] = getToken()
    }
    return config
},error=>{
    return Promise().reject(error)
})

//  response interexpextors
service.interceptors.response.use(response=>{
     /**
   * If you want to get information such as headers or status
   * Please return  response => response
  */
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  const res = response.data
  if(res.code !== 20000){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        if(res.code === 50008 || res.code === 50012 || res.code === 500014){
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                 store.dispatch('user/resetToken').then(()=>{
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                 })
            })
        }
        return Promise.reject('error')
    }else{
        return res
    }
},error=>{
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service
