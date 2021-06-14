<template>
  <div class="detail-shop-img">
    <div class="item-img" v-for="item in detailShopImage">
      <img :src="item" alt="" @load="detailShopImgItemLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopImg",
    data(){
      return {
        count: 1,
      }
    },
    props:{
      detailShopImage:Array,
    },
    methods:{
      detailShopImgItemLoad(){
        if (this.count === this.detailShopImage.length){
          this.$emit('detailShopImgItemLoad')
        }
        this.count++
      }
    }
  }
</script>

<style scoped>
  .detail-shop-img{
    padding-bottom:10px ;
  }
  .detail-shop-img img {
    width: 100%;
    height: 100%;
  }
</style>
