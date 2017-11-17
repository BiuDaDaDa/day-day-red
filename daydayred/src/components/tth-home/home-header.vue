<template>
  <div class="header_wrap">
    <div class="header_back">
      <i class="iconfont icon-jiantou"></i>
    </div>
    <h3>{{headerTitle}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'homeHeader',
    props: ['headerTitle']
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  .header_wrap{
    width: 100%;
    height: 12vmin;
    color: @color-background-white;
    background-color: @color-red;
    display: flex;
    align-items: center;
    position: relative;
    /*justify-content: center;*/
    h3{
      margin: 0 auto;
      font-size: 1.5em;
      display: inline-block;
      font-weight: bold;
    }
    .header_back{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 126px;
      display: flex;
      align-items: center;
      padding-left: 5vmin;
      .icon-jiantou{
        font-size: 3.8vmin;
      }
    }
  }
</style>
