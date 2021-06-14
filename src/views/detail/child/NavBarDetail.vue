<template>
  <div id="detail">
    <NavBar>
      <template v-slot:left>
        <img class="back-img" src="~assets/img/common/back.svg" alt="返回"
          @click="ClickBack">
      </template>
      <template v-slot:center>
        <div class="title">
          <div class="title-item" :class="{active: index === DetailPositionIndex}" v-for="(item,index) in titlesType" @click="titlesTypeClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "NavBarDetail",
    data(){
      return {
        titlesType:['商品','参数','评论','推荐'],
      }
    },
    props:{
      DetailPositionIndex:{
        type:Number,
        default: 0
      }
    },
    methods:{
      titlesTypeClick(index){
        this.$emit('titlesTypeClick',index)
      },
      ClickBack(){
        this.$router.back()
      }
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .back-img{
    position: relative;
    top: 3.5px;
    left: 5px;
    height: 15px;
    width: 15px;
  }
  .title {
    display: flex;
  }
  .title div{
    flex: 1;
    /*display: inline-block;*/
    font-size: 13px;
  }
  .active{
    color : var(--color-high-text)
  }
</style>
