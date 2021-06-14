<template>
  <div class="DetailShopRules">
    <table class="tab-detail">
      <tr class="tab-detail-tr" v-for="item in detailShopRules">
        <td v-for="itemtem in item">{{itemtem}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailShopRules",
    props:{
      detailShopRules:Array
    }
  }
</script>

<style scoped>
  .DetailShopRules{
    padding-top: 15px;
    border-top: 5px solid #F2F5F8 ;
    padding-right: 20px;
    padding-left: 20px;
  }
  .tab-detail{
    width: 100%;
    border-collapse: collapse;
  }
  .tab-detail-tr{
    line-height: 30px;
  }
  .tab-detail-tr td{
    border-bottom: 1px solid #D8D8D8;
  }
  .tab-detail-tr :first-child{
    width: 30%;
    color: #333333;
  }
</style>
