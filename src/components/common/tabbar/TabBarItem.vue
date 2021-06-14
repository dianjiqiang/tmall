<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!ItemFlag" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="'color:' + ItemColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,
      color: {
        type:String,
        default:'red'
      }
    },
    data() {
      return {}
    },
    computed:{
      ItemFlag(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      ItemColor(){
        return this.ItemFlag ? this.color : ''
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  /*.active{*/
  /*  color: red;*/
  /*}*/
</style>
