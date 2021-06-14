<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div @click="allChecked" class="check-content">
        <CheckButtom class="check-button" :class="{selectState:isTrue}"></CheckButtom>
        <span>全选</span>
      </div>
      <div class="he-ji">
        合计:￥{{totalPrice}}
      </div>
      <div class="qu-jie-suan">
        <div class="qu-jie-suan-item">
          去结算({{shopClickLength}})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButtom from "components/content/checkButton/CheckButtom";

  export default {
    name: "BottomBar",
    data(){
      return {
        isTrue:false
      }
    },
    methods:{
      allChecked(){
        if (this.shopClickLength === this.$store.state.shopCart.length){
          this.isTrue = false
          this.$store.state.shopCart.map(item => item.isChecked = !item.isChecked)
        }else{
          this.isTrue = true
          this.$store.state.shopCart.map(item => item.isChecked = true)
        }
      }
    },
    computed:{
      totalPrice(){
        return this.$store.state.shopCart
          .filter(item => item.isChecked)
          .reduce((preValue,item) => preValue + item.price * item.count,0)
          .toFixed(2)
      },
      shopClickLength(){
        return this.$store.state.shopCart.filter(item => item.isChecked).length
      }
    },
    watch:{
      shopClickLength(){
        this.shopClickLength === this.$store.state.shopCart.length ? this.isTrue = true : this.isTrue = false
      }
    },
    components:{
      CheckButtom
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    z-index: 10;
    height: 40px;
    background-color: #eeeeee;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    line-height: 40px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    background-color: white;
    margin-left: 5px;
  }
  .he-ji{
    margin-left: 10px;
  }
  .qu-jie-suan{
    flex: 1;
    /*width: 120px;*/
    text-align: center;
    color: #ffffff;
  }
  .qu-jie-suan-item{
    float: right;
    width: 120px;
    background-color: var(--color-tint);
  }
  .selectState{
    background-color: red;
    border-color: red;
  }
</style>
