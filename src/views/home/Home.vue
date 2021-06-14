<template>
  <div class="home">
    <nav-bar class="home-nav"><template v-slot:center><h3>购物街</h3></template></nav-bar>
    <TabControl v-show="isTabFixed" @tabControlClick="tabControlClick" class="load-tab-control"  ref="TabControl1" :titles="['流行','新款','精选']"></TabControl>
    <scroll class="home-content" ref="HomeContent" :pullUpLoad="true" @PullingUpRoll="PullingUpRoll" @ScrollRoll="ScrollRoll" >
      <HomeSwiper @HomeSwiperImgLoad="HomeSwiperImgLoad" :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl @tabControlClick="tabControlClick" ref="TabControl2" :titles="['流行','新款','精选']"></TabControl>
      <GoodsList :goods="showType"></GoodsList>
    </scroll>
    <back-top v-show="BackTopShow" @click="BackClick"></back-top>
  </div>
</template>
<script>
  import {getHomeMultidata,getHomeGoods} from "network/home.js"

  import HomeSwiper from "views/home/childComps/HomeSwiper.vue"
  import RecommendView from "views/home/childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backtop/BackTop";
  // import Util from "common/util/index"

  export default {
    name: "Home",
    data(){
      return {
        banners:null,        //保存轮播图的数据
        recommends:null,    //轮播图下面的小图片列表
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },          //衣服的一些数据
        HomeControlThisPosition:0,
        typeArr:'pop',        //判断当前显示的是哪种类型的衣服
        BackTopShow:false,   //判断是否显示回到顶部图片
        tabOffsetUp:null,   //判断吸顶元素距离
        isTabFixed:false,    //判断是否吸顶
      }
    },
    mounted() {
      //请求单个数据
      this.getHomeMultidata()
      //请求多个数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed:{
      showType(){
        return this.goods[this.typeArr].list
      },
      MonitorGoodsScrollLength(){
        return this.$store.state.GoodsScrollLength
      },
      refresh(){
        return this.debounce(300)
      }
    },
    methods:{
      //网络请求相关的方法
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].page = page
          this.goods[type].list.push(...res.data.list)
        })
      },
      //事件监听相关的方法
      tabControlClick(type){
        // this.goods[this.typeArr].position = this.HomeControlThisPosition
        switch (type+1) {
          case 1: this.typeArr ='pop'; break
          case 2: this.typeArr ='new'; break
          case 3: this.typeArr ='sell';
        }
        // this.$refs.HomeContent.BScroll.scrollTo(0,this.goods[this.typeArr].position)
        this.$refs.TabControl1.todos = type
        this.$refs.TabControl2.todos = type
      },
      //返回顶部
      BackClick() {
        this.$refs.HomeContent.BScroll.scrollTo(0,0,500)
      },
      //判断当前滚动条位置 滚动条改变 触发该函数
      ScrollRoll(position){
        this.HomeControlThisPosition = position
        //判断是否显示回到顶部按钮
        position < -this.tabOffsetUp ?  this.BackTopShow = true : this.BackTopShow = false
        //判断是否吸顶
        position < -this.tabOffsetUp ?  this.isTabFixed = true : this.isTabFixed = false
        // //记录吸顶前位置
        // if (position > -this.tabOffsetUp){
        //   this.goods.pop.position = position+1
        //   this.goods.new.position = position+1
        //   this.goods.sell.position = position+1
        // }
      },
      PullingUpRoll(){
        // alert("到底部上拉了")
        this.getHomeGoods(this.typeArr)
        this.$refs.HomeContent.BScroll.finishPullUp()
      },
      //封装的防止抖动的函数
      debounce(delay) {
        let timer = null
        return (...args)=>{   // 返回的这个函数是带参数的 args 可以传递任意参数
          if (timer){
            clearTimeout(timer)
          }
          timer = setTimeout(()=>{
            // 这个方法和call类似  第一个参数this是调用这个方法的this值
            // 第二个参数是接收的数组对象
            // console.log('---')
            this.$refs.HomeContent.refresh()
          },delay)
        }
      },
      //吸顶效果
      HomeSwiperImgLoad(){
        this.tabOffsetUp=this.$refs.TabControl2.$el.offsetTop
      }
    },
    watch:{
      MonitorGoodsScrollLength(){
        this.refresh()
      }
    },
    components:{
      HomeSwiper,RecommendView,FeatureView,NavBar,TabControl,GoodsList,Scroll,BackTop
    }
  }
</script>

<style scoped>
  .home-nav{
    background: var(--color-tint);
    color:white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .load-tab-control{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .home-content{
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
  .home-nav{
    font-size: 16px;
  }
</style>
