<template>
<!--  导航  -->
  <NavBar class="nav-bar"><template v-slot:center><h3>购物车({{$store.state.shopCart.length}})</h3></template></NavBar>
<!--  商品列表  -->
  <CartList></CartList>
<!--  底部汇总  -->
  <BottomBar></BottomBar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./child/CartList";
  import BottomBar from "./child/BottomBar";
  export default {
    name: "ShopCart",
    components:{
      NavBar,CartList,BottomBar
    }
  }
</script>

<style scoped>
  .nav-bar{
    width: 100%;
    background-color: var(--color-tint);
    color:white;
    font-size: 16px;
    /*font-weight: 700;*/
    position: fixed;
    z-index: 9;
  }
</style>
