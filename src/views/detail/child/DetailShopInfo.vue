<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-shop">
      <div class="shop-middle">
        <div class="shop-middle-item shop-middle-left">
          <div class="info-sells">
            <div class="sells-count">
              {{sellCountFilter}}
            </div>
            <div class="sells-text">总销量</div>
          </div>
          <div class="info-goods">{{shop.goodsCount}}
            <div class="goods-text">全部宝贝</div>
          </div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better"><span :style="{background:(item.isBetter ? '#f13e3a':'#5ea732')}">{{item.isBetter?'高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      sellCountFilter(){
        if(this.shop.sells<10000){
          return this.shop.sells
        }
        let sells = this.shop.sells
        const w = parseInt(sells/10000)
        sells = sells-w*10000
        const q = parseInt(sells/1000)
        return w+'.'+q+'万'
      }
    }
  }
</script>

<style scoped>
  .shop-info{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .shop-top{
    line-height: 45px;
    display: flex;
    align-items: center;
  }
  .shop-top img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }
  .shop-top .title{
    margin-left: 10px;
    vertical-align: center;
  }
  .shop-shop{
    display: flex;
  }
  .shop-middle{
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .shop-middle-item{
    flex: 1;
  }
  .shop-middle-left{
    display: flex;
    justify-content: space-evenly;
    color:#333;
    text-align: center;
  }
  .sells-count,.info-goods {
    font-size: 18px;
  }
  .info-goods{
    padding-left: 30px;
  }
  .sells-text,.goods-text{
    margin-top: 10px;
    font-size: 12px;
  }
  .shop-middle-right{
    font-size: 13px;
    color: #333;
  }
  .shop-middle-right table{
    width: 120px;
    margin-left: 30%;
  }
  .shop-middle-right table td {
    padding: 5px 0;
  }
  .shop-middle-right .score{
    color: #5ea732;
  }
  .shop-middle-right .score-better{
    color: #f13e3a;
  }
  .shop-middle-right .better span{
    background: #5ea732;
    color: #fff;
    text-align: center;
  }
  .shop-middle-right .better-more span{
    background: #f13e3a;
  }
  .shop-bottom{
    top: 10px;
    position: relative;
    text-align: center;
    padding-bottom: 16px;
  }
  .enter-shop{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    right: 0;
    margin: auto;
    line-height: 24px;
    font-size: 16px;
    width: 150px;
    border-radius: 15px;
    background: var(--color-high-text);
  }
</style>
