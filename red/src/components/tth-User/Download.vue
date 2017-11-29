<template>
  <div>
    <div id="main">
      <div>
        <img src="http://common-1253410441.costj.myqcloud.com/coverimg/20170804202410.png" alt="">
        <a href="###" id="download" @click="downloadClick">
          <img src="http://common-1253410441.costj.myqcloud.com/coverimg/20170804202411.png" alt="">
        </a>
        <img src="http://common-1253410441.costj.myqcloud.com/coverimg/20170804202412.png" alt="">
        <img src="http://common-1253410441.costj.myqcloud.com/coverimg/20170804202413.png" alt="">
        <img src="http://common-1253410441.costj.myqcloud.com/coverimg/20170804202414.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Download',
    methods: {
      downloadClick () {
        alert('ios版本正在开发中')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  #main img{
    width: 100%;
    height: 100%;
  }
  #download img{
    margin-top: -5px;
  }
</style>
