<template>
  <div id="Detail">
    <NavBarDetail class="nav-bar-detail" @titlesTypeClick="titlesTypeClick" :DetailPositionIndex="DetailPositionIndex"></NavBarDetail>
    <div class="revl">
      <Scroll class="content" ref="DetailScroll" @ScrollRoll="ScrollRoll">
        <detail-swiper @SwiperImgLoad="SwiperImgLoad" :Proxy="goodsImg"></detail-swiper>
        <DetailNaseInfo :goods="goodsText"></DetailNaseInfo>
        <DetailShopInfo :shop="shopInfo"></DetailShopInfo>
        <DetailShopImg :detailShopImage="detailShopImage" @detailShopImgItemLoad="ShopImgItemLoad"></DetailShopImg>
        <DetailShopRules ref="DetailRules" :detailShopRules="detailShopRules"></DetailShopRules>
        <DetailShopParameter :detailShopParameter="detailShopParameter"></DetailShopParameter>
        <DetailCommentInfo ref="DetailComment" :commentInfo="commentInfo"></DetailCommentInfo>
        <GoodsList ref="DetailGoods" :goods="detailRecommendShop"></GoodsList>
      </Scroll>
      <back-top v-show="BackTopShow" @click="BackClick"></back-top>
    </div>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
<!--    <Toast :message="toastMessage" :isShow="toastShow"></Toast>-->
  </div>
</template>

<script>
  import NavBarDetail from "./child/NavBarDetail";
  import DetailSwiper from "./child/DetailSwiper";
  import DetailNaseInfo from "./child/DetailNaseInfo";
  import DetailShopInfo from "./child/DetailShopInfo";
  import DetailShopImg from "./child/DetailShopImg";
  import DetailShopRules from "./child/DetailShopRules";
  import DetailShopParameter from "./child/DetailShopParameter";
  import DetailCommentInfo from "./child/DetailCommentInfo";
  import DetailBottomBar from "./child/DetailBottomBar";

  import {getDetail,getRecommend,goodsText,GoodsShopInfo} from "network/detail"
  import debounce from "common/util/index"

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from "components/common/toast/Toast";
  export default {
    name: "Detail",
    data(){
      return {
        iId : null,
        goodsImg: null,
        goodsText:{},
        shopInfo: {},
        detailShopImage:[],
        detailShopRules:[],
        detailShopParameter:[],
        tabOffsetUp:500,
        BackTopShow:false,   //判断是否显示回到顶部图片
        commentInfo : [],   //评论信息
        detailRecommendShop : [],   //商品推荐信息
        parameterPosition:0,    //保存参数的位置信息
        commentPosition : 0,  //保存评论的位置信息
        recommendPosition : 0, //保存推荐的位置信息
        DetailPositionIndex:0, //发送给子组件的父组件当前的位置 默认是0 商品
        toastMessage:'',
        toastShow:false
      }
    },
    mounted(){
      //获取ID
      this.iId = this.$route.params.iid
      //根据ID请求数据
      getDetail(this.iId).then((res)=>{
        const data = res.result
        // console.log(data)
        const itemInfo = data.itemInfo
        const shopInfo = data.shopInfo
        //轮播图数据
        this.goodsImg = res.result.itemInfo.topImages

        //商品信息
        this.goodsText = new goodsText(itemInfo,data.columns,shopInfo.services) //封装思想
        // this.goodsText.title = res.result.itemInfo.title  //商品标题  str
        // this.goodsText.desc = res.result.itemInfo.desc  //商品描述  str
        // this.goodsText.newPrice = res.result.itemInfo.price  //商品新价格 str
        // this.goodsText.oldPrice = res.result.itemInfo.oldPrice  //商品老价格 str
        // this.goodsText.discount = res.result.itemInfo.discountDesc  //商品打折标识  str
        // this.goodsText.columens = res.result.columns  //销量。收藏。快递形式   arr
        // this.goodsText.services = res.result.shopInfo.services  //商品服务项目  arr
        // this.goodsText.realPrice = res.result.itemInfo.lowNowPrice  //商品新价格2  str

        //店铺信息  result.shopInfo
        this.shopInfo = new GoodsShopInfo(shopInfo)
        // this.shopInfo.logo = res.result.shopInfo.shopLogo   //店铺logo  str src
        // this.shopInfo.name = res.result.shopInfo.name        //店铺名字   str
        // this.shopInfo.fans = res.result.shopInfo.cFans        //店铺收藏   str
        // this.shopInfo.sells = res.result.shopInfo.cSells        //卖了多少  str
        // this.shopInfo.score = res.result.shopInfo.score        //评分  str
        // this.shopInfo.goodsCount = res.result.shopInfo.cGoods        //特别好评个数 str

        //下方展示的图片数据
        this.detailShopImage = data.detailInfo.detailImage[0].list

        //下方获取产品尺码
        this.detailShopRules = data.itemParams.rule.tables[0]
        // console.log(this.detailShopRules)
        //下方获取产品参数
        this.detailShopParameter = data.itemParams.info.set
        // console.log(this.detailShopParameter)

        //下方获取评论信息
        this.commentInfo = data.rate.list[0]   //获取到的评论信息是一个数组 一个元素对应一个对象 一个评论记录 接口只有这个记录 所以没办法做更多的子页面了

      })
      //请求详情页中的推荐数据
      getRecommend().then(getRecommendREQ => {
        this.detailRecommendShop = getRecommendREQ.data.list
      })
    },
    watch:{
      changeIndex(){
        this.$refs.DetailScroll.refresh()
      }
    },
    computed:{
      changeIndex(){
        return this.$store.state.DetailGoodsScrollLength
      }
    },
    methods:{
      SwiperImgLoad(){
        // console.log('大图片加载完成')
        this.$refs.DetailScroll.BScroll.refresh()
      },
      ShopImgItemLoad(){
        this.$refs.DetailScroll.refresh()

        //数据请求过来等待图片加载完毕后请求对应数据的位置保存下来
        this.parameterPosition = this.$refs.DetailRules.$el.offsetTop
        this.commentPosition = this.$refs.DetailComment.$el.offsetTop
        this.recommendPosition = this.$refs.DetailGoods.$el.offsetTop
      },
      BackClick() {
        this.$refs.DetailScroll.BScroll.scrollTo(0,0,500)
      },
      ScrollRoll(position){
        // console.log(position)
        //判断是否显示回到顶部按钮
        position < -this.tabOffsetUp ?  this.BackTopShow = true : this.BackTopShow = false
        //判断是否走到了对应的位置
        position > -this.parameterPosition ? this.DetailPositionIndex=0 : position > -this.commentPosition ? this.DetailPositionIndex=1:position > -this.recommendPosition ? this.DetailPositionIndex=2 : this.DetailPositionIndex=3
      },
      titlesTypeClick(index){
        // if (index === this.DetailPositionIndex) return
        if (index === 0){
          this.$refs.DetailScroll.BScroll.scrollTo(0,0,500)
        }
        else if (index === 1){
          this.$refs.DetailScroll.BScroll.scrollTo(0,-this.parameterPosition,500)
        }
        else if (index === 2){
          this.$refs.DetailScroll.BScroll.scrollTo(0,-this.commentPosition,500)
        }
        else {
          this.$refs.DetailScroll.BScroll.scrollTo(0,-this.recommendPosition,500)
        }
      },
      //添加购物车
      addToCart(){
        const product = {} //购物车那边需要接收的数据
        product.id = this.iId   //商品的id
        product.image = this.goodsImg[0]    //商品图片
        product.title = this.goodsText.title    //商品标题
        product.desc = this.goodsText.desc    //商品描述
        product.price = this.goodsText.realPrice    //商品新价格
        this.$store.dispatch('AddShopCart',product).then(res => {
          // this.toastMessage = res
          // this.toastShow = true
          // setTimeout(()=>{
          //   this.toastShow = false
          // },3000)
          this.$root.ShowMessage(res,2000)
        });
      }
    },
    components:{
      NavBarDetail,DetailSwiper,DetailNaseInfo,DetailShopInfo,Scroll,DetailShopImg,DetailShopRules,DetailShopParameter,BackTop,DetailCommentInfo,GoodsList,DetailBottomBar
      // ,Toast
    }
  }
</script>

<style scoped>
  .content{
    position: absolute;
    top: 45px;
    bottom: 49px;
    overflow: hidden;
  }
</style>
