<template>
  <div class="tab-control">
    <div  class="tab-control-item"
          :class="{active:index === todos}"
          @click="TabItemClick(index)"
          v-for="(item,index) in titles"
          :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles: Array
    },
    data(){
      return {
        todos : 0
      }
    },
    methods:{
      TabItemClick(key){
        this.todos = key
        this.$emit('tabControlClick',key)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 16px;
    background: #ffffff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
    width: 30px;
  }
  .active span{
    padding-bottom: 5px;
    border-bottom: 2px red solid;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
