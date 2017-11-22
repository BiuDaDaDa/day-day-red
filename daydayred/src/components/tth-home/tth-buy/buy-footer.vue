<template>
  <!--购买彩票底部-->
<div class="buyFooter_wrap">
  <!--垃圾箱-->
  <div class="buyFooter_trash">
    <i class="iconfont icon-lajixiang"></i>
    <span>清空</span>
  </div>
  <!--购买总数金额-->
  <div class="buyFooter_count">
    <span>共计<b>{{}}</b>注,<b>{{}}</b>元</span>
  </div>
  <!--确定-->
  <input class="buyFooter_buyBtn" type="button" value="确定">
</div>
</template>

<script>
  export default {
    name: 'BuyFooter'
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
