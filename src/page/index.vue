<template>
  <div class="index">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <left-content></left-content>
        </div>
      </el-col>
      <el-col :span="21"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import leftContent from './indexContents/leftContent'
export default {
  name: 'index',
  data(){
      return {

      }
  },
  mounted(){
    // 在首页检测是否有登录的用户 也就是判断有没有token 没有就跳转到登录页面
    // if(this.$store.getters.token == undefined){
    //   this.$router.push({path:"/user/login"})
    // }
    // console.log( (this.$store.getters.token))
  },
  components:{
    leftContent,
  }
}
</script>

<style>
  .index .el-row .el-col{
    /* height: 50px;
    background: #000;
    border:1px solid #fff; */
  }
</style>
