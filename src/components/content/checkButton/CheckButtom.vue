<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="" @click="checkPro">
  </div>
</template>

<script>
  export default {
    name: "CheckButtom",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      checkPro(){
        this.$emit('CheckOpt')
      }
    }
  }
</script>

<style scoped>
  .check-button{
    /*background-color: red;*/
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .checked{
    border-color: red;
    background-color: red;
  }
</style>
