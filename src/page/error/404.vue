<template>
  <div class="nothingness">
    您访问的页面不存在,{{ index }}秒后跳转到 <router-link to="/">首页</router-link> 
  </div>
</template>

<script>
export default {
  name: 'nothingness',
  data(){
      return {
          index:5,
      }
  },
  mounted(){
      setInterval(()=>{
          this.index--
          if(this.index == 0){
              window.location.href = '/'
          }
          
      },1000)
  }
}
</script>

<style scoped>
    
</style>
