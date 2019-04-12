import request from '@/untils/request2'

// 登录
export function login(data){
    return request({
        url:'user/login',
        method:'post',
        data,
    })
}

// 得到用户info
export function getInfo(token){
    return request({
        url:'/user/info',
        method:'get',
        params:{token},
    })
}

// 退出
export function logout(){
    return request({
        url:'/user/logout',
        method:'post',
    })
}

