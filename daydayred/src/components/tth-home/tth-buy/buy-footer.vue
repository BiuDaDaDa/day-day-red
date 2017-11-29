<template>
  <!--购买彩票底部-->
<div class="buyFooter_wrap">
  <!--垃圾箱-->
  <div class="buyFooter_trash" @click="clearNum">
    <i class="iconfont icon-lajixiang"></i>
    <span>清空</span>
  </div>
  <!--购买总数金额-->
  <div class="buyFooter_count">
    <span>共计<b>{{countZhu}}</b>注,<b>{{countMoney}}</b>元</span>
  </div>
  <!--确定-->
  <input @click="toShoppingCar" class="buyFooter_buyBtn" type="button" value="确定">
</div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'BuyFooter',
    props: ['countMoney', 'countZhu'],
    methods: {
      clearNum () {
        this.$emit('clearAllNum')
      },
      toShoppingCar () {
        if (this.countZhu > 0) {
          this.$emit('toShopCar')
        } else {
          Toast({
            message: '请选择',
            position: 'middle',
            duration: 1000
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";
  .buyFooter_wrap{
    width: 100%;
    height: 13.33333vmin;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #e6e6e6;
    background-color:#f7f7f7;
    color: #8f9090;
    z-index: 30;
    /*垃圾桶*/
    .buyFooter_trash{
      width: 13.33333vmin;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon-lajixiang{
        font-size: 5.86667vmin;
        margin-bottom:.86667vmin ;
      }
      span{
        font-size: 2.66667vmin;
      }
    }
    /*确定*/
    .buyFooter_buyBtn{
      border: none;
      text-align: center;
      background: @color-red;
      color: #FFFFFF;
      font-size: 4.8vmin;
      width: 31.46667vmin;
      border-radius:4px ;
      height: 100%;
    }
    /*购买金额*/
    .buyFooter_count{
      width:56.46667vmin;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: 4vmin;
      font-size: 4vmin;
      b{
        color: @color-red;
      }
    }
  }
</style>
