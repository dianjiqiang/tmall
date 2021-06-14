<template>
  <div>
    <Swiper>
      <SwiperItem class="swiper-item-show" v-for="item in Proxy">
        <img :src="item" alt="轮播图" @load="detailSwiperImgLoad">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index.js"
  export default {
    name: "DetailSwiper",
    data(){
      return {
        isLoad : false
      }
    },
    props:{
      Proxy:{
        type:Array,
        default(){
          return []
        }
      },
    },
    methods:{
      detailSwiperImgLoad(){
        if (!this.isLoad){
          this.isLoad = !this.isLoad
          this.$emit('SwiperImgLoad')
        }
      }
    },
    components:{
      Swiper,SwiperItem
    }
  }
</script>

<style scoped>
  .swiper-item-show{
    position: relative;
    /*width: 100%;*/
    /*height: 0;*/
    padding-top: 100%;
  }
  .swiper-item-show img{
    position: absolute;
    left: 0;
    top: -20px;
    width: 100%;
    display: flex;
  }
</style>
