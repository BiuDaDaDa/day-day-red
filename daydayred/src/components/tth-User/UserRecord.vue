<template>
  <div>
    <div class="user-record-body">
      <!--头部-->
      <div class="user-record-head">
        <i @click="goBackClick" class="iconfont icon-jiantou jiantou"></i>
        <span class="record-span">购彩记录</span>
        <span class="record-span-two">最近一周 <i class="iconfont icon-jiantou2"></i></span>
      </div>
      <!--购彩记录导航栏-->
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">全部</mt-tab-item>
          <mt-tab-item id="2">待出票</mt-tab-item>
          <mt-tab-item id="3">待开奖</mt-tab-item>
          <mt-tab-item id="4">已中奖</mt-tab-item>
        </mt-navbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserRecord',
    data () {
      return {
        selected: ''
      }
    },
    methods: {
      // 点击返回上一页事件
      goBackClick () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  .user-record-body {
    width: 100%;
    height: 180vmin;
    background-color: #F2F2F2;
  }
  #1{

  }

  .user-record-head {
    width: 100%;
    height: 14vmin;
    line-height: 15vmin;
    background-color: @color-text-red;
  }

  .record-span {
    margin-left: 25%;
    font-size: 22px;
    font-weight: 900;
    color: @color-background-white;
  }

  .record-span-two {
    margin-left: 15%;
    font-size: 14px;
    color: @color-background-white;
  }

  .jiantou {
    margin-left: 5%;
    color: @color-background-white;
    font-weight: 700;
  }
  .am-tabs {
    overflow: hidden;
  }

</style>
