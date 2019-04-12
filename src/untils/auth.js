import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 获取token  导出
export function getToken(){
    return Cookies.get(TokenKey)
}

// 设置token 导出
export function setToken(token){
    // 键-值
    return Cookies.set(TokenKey,token)
}

// 移除token 导出
export function removeToken(){
    return Cookies.remove(TokenKey)
}