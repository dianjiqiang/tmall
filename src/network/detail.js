import {request} from "./request";
export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
export function getRecommend() {
  return request({
    url:'/recommend'
  })
}

export class goodsText {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title  //商品标题  str
    this.desc = itemInfo.desc  //商品描述  str
    this.newPrice = itemInfo.price  //商品新价格 str
    this.oldPrice = itemInfo.oldPrice   //商品老价格 str
    this.discount = itemInfo.discountDesc  //商品打折标识  str
    this.realPrice = itemInfo.lowNowPrice   //商品新价格2  str   购物车使用
    this.columens = columns  //销量。收藏。快递形式   arr
    this.services = services  //商品服务项目  arr
  }
}

export class GoodsShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo       //店铺logo  str src
    this.name = shopInfo.name        //店铺名字   str
    this.fans = shopInfo.cFans        //店铺收藏   str
    this.sells = shopInfo.cSells        //卖了多少  str
    this.score = shopInfo.score        //评分  str
    this.goodsCount = shopInfo.cGoods        //特别好评个数 str
  }
}
