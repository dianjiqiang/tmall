export default {
  AddShopCart(context,data){
    return new Promise((res,rej)=>{
      //查找之前的数组是否有该商品
      const oldProduct = context.state.shopCart.find(item => item.id === data.id)
      if (oldProduct){
        context.commit('CountAdd',oldProduct)
        res('商品数量+1')
      }else{
        data.count = 1
        data.isChecked = false
        context.commit('ShopAdd',data)
        res('添加购物车成功')
      }
      // console.log(state.shopCart)
    })
  }
}
