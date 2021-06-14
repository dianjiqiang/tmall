<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <div id="tab-bar">
    <bottom></bottom>
  </div>
  <Toast :message="message" :isShow="isShow"></Toast>
</template>

<script>
  import Toast from "components/common/toast/Toast";
  import bottom from 'components/content/Bottom.vue'

  export default {
    name:'App',
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    mounted() {
      this.ShowMessage = (message,timer) => {
        this.message = message
        this.isShow = true
        setTimeout(()=>{
          this.isShow = false
        },timer)
      }
    },
    components:{
      bottom,Toast
    },
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
