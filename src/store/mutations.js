export default {
  //goods组件 关于图片加载better-scroll长度
  MonitorGoodsScrollLength(state){
    state.GoodsScrollLength++
  },
  //goods detail 图片长度
  MonitorDetailGoodsScrollLength(state){
    state.DetailGoodsScrollLength++
  },
  //添加购物车数据
  ShopAdd(state,data){
    state.shopCart.push(data)
  },
  //添加购物车中的重复数据(原本的商品数量＋1)
  CountAdd(state,oldProduct){
    oldProduct.count++
  }
}
