<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:Array
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    font-size: 12px;
    padding-top: 15px;
    padding-bottom: 30px;
    border-bottom: 8px solid #eeeeee;
  }
  .recommend-item{
    flex: 1;
    text-align: center;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
