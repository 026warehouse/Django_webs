import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      meta:{
        title:'火材'
      },
      name: 'index',
      component: (resolve)=>require(['../page/index.vue'],resolve),
      beforeEnter:(to,from,next)=>{
        window.document.title = to.meta.title
        next()
      },
    },
    {
      path: '/user/login',
      meta:{
        title:'登录'
      },
      name: 'login',
      component: (resolve)=>require(['../page/login.vue'],resolve),
      beforeEnter:(to,from,next)=>{
        window.document.title = to.meta.title
        next()
      },
    },
    {
      path: '/user/register',
      meta:{
        title:'注册'
      },
      name: 'register',
      component: (resolve)=>require(['../page/register.vue'],resolve),
      beforeEnter:(to,from,next)=>{
        window.document.title = to.meta.title
        next()
      },
    },
    {
      path: '*',
      meta:{
        title:'404'
      },
      name: '404',
      component: (resolve)=>require(['../page/error/404.vue'],resolve),
      beforeEnter:(to,from,next)=>{
        window.document.title = to.meta.title
        next()
      },
    },
  ]
})
