<template>
  <div class="DetailShopParameter">
    <table class="tab-detail">
      <tr class="tab-detail-tr" v-for="item in detailShopParameter">
<!--        <td v-for="itemtem in item">{{itemtem}}</td>-->
        <td>{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailShopParameter",
    props:{
      detailShopParameter:Array
    }
  }
</script>

<style scoped>
  .DetailShopParameter{
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    border-bottom: 5px solid #f2f5f8;
  }
  .tab-detail{
    width: 100%;
    border-collapse: collapse;
  }
  .tab-detail-tr{
    line-height: 30px;
  }
  .tab-detail:first-child{
    border-top: 3px solid #f2f5f8;
  }
  .tab-detail-tr td{
    border-bottom: 1px solid #D8D8D8;
    color: #FF5778;
  }
  .tab-detail-tr :first-child{
    width: 30%;
    color: #333333;
  }
</style>
