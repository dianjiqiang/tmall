<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:3
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        BScroll: null,
      };
    },
    mounted() {
      this.BScroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad, //开启上拉加载更多
        click:true,
      })
      if (this.probeType === 2 || this.probeType=== 3){
        this.BScroll.on('scroll',position=>{
          // console.log(document.documentElement.scrollTop);
          // console.log(position.y)
          this.$emit('ScrollRoll',position.y)
        })
      }
      if (this.pullUpLoad === true){
        this.BScroll.on('pullingUp',()=>{
          // alert("滚动到底部上拉了")
          this.$emit('PullingUpRoll')
        })
      }
    },
    methods:{
      refresh(){
        // console.log('刷新了')
        this.BScroll.refresh()
      }
    }
  }
</script>

<style scoped>
</style>
