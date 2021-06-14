<template>
  <div class="cart-list">
    <Scroll ref="CartScroll" class="content">
      <div>
        <CartListItem :itemInfo="item" v-for="(item,index) in cartList" :key="index"/>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    data(){
      return {
        cartList : null
      }
    },
    mounted() {
      this.cartList = this.$store.state.shopCart
    },
    activated() {
      this.$refs.CartScroll.refresh()
    },
    components:{
      Scroll,CartListItem
    }
  }
</script>

<style scoped>
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>
