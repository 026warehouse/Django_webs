'use strict'

import axios from 'axios'
import qs from 'qs'

// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
// 跨域请求
axios.defaults.crossDomain = true;

// 上一次开始请求时间
let lastStartTime = 0
// 基准时间差
const BASETIME = 1800

// 请求前的拦截器
axios.interceptors.reuqest.use(config=>{
    // 判断localStorage中是否存在api_token
    if(localStorage.getItem('api_token')){
        //  存在将api_token写入 request header
        config.headers.apiToken = `${localStorage.getItem('api_token')}`
    }
    return config
},error=>{
    return Promise.reject(error)
})

// 数据返回前拦截器
axios.interceptors.response.use(response=>{
    return response
},error=>{
    return Promise.reject(error.response)
})

// 状态检查
function checkStatus(response){
    // 如果http状态码正常，则直接返回数据
    if(response && (response.status == 200 || response.status == 304 || response.status == 200)){
        // 原生关闭加载框
        // hideWaitingDialog();
		console.log('响应状态值 =>'+response.status);
		console.log('响应状态内容 =>'+response.statusText);
    }

    return {
        status:404,
        msg:'网络异常，请稍后重试'
    }
}

// 代码审核
function checkCode(res){
    if(res.status == -404){
        // 原生关闭加载框
        //  hideWaitingDialog();
    	// 原生错误显示 404 页面
        //  showLoadFailedPage(String(res.status));
        alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        // alert(res.data.error_msg)
    }
    return res
}

// 请求方式的配置
export default{
    post(url,data){ // post
        /**
         * 原生接入
         */
        data = Object.assign({
            currUserAccount: getUserInfo.userAccount,
            currPasswd: getUserInfo.password
        },data)

        //  data = Object.assign({
        //      currUserAccount: '13569868969',
        //      currPasswd: '59e1e64e797dc21ce8646e19bfa6ebea'
        //  },data)

        // 获取当前请求的时间   时间戳
        const startTime = new Date().getTime()

        /**
		 * 解决多个请求会弹出多个加载框的问题
		 * 1.如果是第一次请求，弹出加载框
		 * 2.如果不是第一次请求，用当前时间减去上一次请求时间，然后与基准时间差进行比较，如果时间差大于等于基准时间差，则弹框
        */
       if(lastStartTime == 0){
           lastStartTime = startTime
           alert('加载中...')
           // showWaitingDialog('加载中...');
       }else{
           if(startTime - lastStartTime > BASETIME){
            console.log('startTime:'+startTime);
            console.log('lastStartTime:'+lastStartTime);
            console.log(startTime - lastStartTime);
            // showToast(String(startTime - lastStartTime));
            //  showWaitingDialog('加载中...');
            alert('加载中...')
            lastStartTime = startTime;
           }
       }

       return axios({
           method:'post',
           baseURL:'http:127.0.0.1:8080',  
           url,
           data:qs.stringify(data),
           dataType:'json',
           contentType:'application/x-www-form-urlencoded;charset=UTF-8',
           timeout:5000,
           // `headers` 是即将被发送的自定义请求头
            // headers: {
                // 'X-Requested-With': 'XMLHttpRequest',
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
            // }
       }).then((response)=>{
           return checkStatus(response)
       }).then((res)=>{
           return checkCode(res)
       })
    },
    get(url,data){
        
    }
}