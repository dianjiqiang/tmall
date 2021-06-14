<template>
  <swiper>
    <swiper-item class="swiper-item-show" v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="HomeSwiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index.js"
  export default {
    name: "HomeSwiper",
    data(){
      return {isLoad:false}
    },
    props:{
      banners:Array
    },
    components:{
      Swiper,SwiperItem
    },
    methods:{
      HomeSwiperImgLoad(){
        if (!this.isLoad){
          this.$emit('HomeSwiperImgLoad')
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-item-show{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 50%;
  }
  .swiper-item-show img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>
