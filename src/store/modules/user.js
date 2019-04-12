import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/untils/auth'

const state = {
    token:getToken(),
    name:'',
    avatar:'',
    introduction: '',
    roles: [],
}

const mutations = {
    SET_TOKEN : (state,token)=>{
        state.token = token
    },
    SET_INTRODUCTION : (state,introduction)=>{
        state.introduction = introduction
    },
    SET_NAME : (state,name)=>{
        state.name = name
    },
    SET_ROLES : (state,roles)=>{
        state.roles = roles
    }
}

const actions = {
    //  user login
    login({commit},userinfo){
        // 结构表单中传过来的数据
        const { username,password } = userinfo
        return new Promise((resolve,reject)=>{
            // 请求  用一个对象把表单里的数据发给axios     发送:  用户表单内容 -> vuex actions -> api 指定路径请求 传 data->  封装好的request(axios || ajax) -> 后台响应数据 -> vuex actions 回调接受数据 -> 前端页面跳转 
            login({username:username.trim(),password:password.trim()}).then(()=>{
                // 数据返回 data
                const { data } = response
                // 把 token 设置到 state中
                commit('SET_TOKEN',data.token)
                // 给cookie 设置token
                setToken(data.token)
                resolve()
            }).catch(error=>{
                reject(error)
            })
        })
    },
    // get user info
    getInfo({commit,state}){
        return new Promise((resolve,reject)=>{
            getInfo(state.token).then((response)=>{
                // 结构出数据
                const { data } = response

                // 数据为空请重新登录
                if(!data){
                    reject('Verification failed, please Login again.')
                }

                // 结构出 data中的数据
                const { name,roles,avatar,introduction } = data
                // 把数据添加到 state中
                commit('SET_NAME',name)
                commit('SET_AVATAR',avatar)
                commit('SET_ROLES',roles)
                commit('SET_INTRODUCTION',introduction)

                // 到处数据
                resolve(data)
            }).catch((error)=>{
                reject(error)
            })
        })
    },
    // user logout
    logout({commit,state}){
        return new Promise((resolve,reject)=>{
            logout(state.token).then(()=>{
                // 消除state 里面的相关数据
                commit('SET_TOKEN','')
                commit('SET_ROLES',[])

                // 移除token
                removeToken()

                // 退出后 跳转到登录页面 或者首页
                window.location.href = '/'

                resolve()
            }).catch(error=>{
                reject(error)
            })
        })
    }
}


export default {
    namespaced : true,
    state,
    mutations,
    actions,
}