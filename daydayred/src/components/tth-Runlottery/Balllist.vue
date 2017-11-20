<template>
  <div>
    <div class="bl-nav">
      <div class="bl-nav-left">
        <i class="iconfont icon-jiantou" id="turnback"></i>
      </div>
      <div class="bl-nav-title">
        <p>双色球开奖</p>
      </div>
      <div class="bl-nav-right">
      </div>
    </div>
    <div class="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'balllist',
    data () {
      return {
        ssq: {}
      }
    },
    methods: {
      testData () {
        this.$request({
          type: 'get',
          url: 'api/data/Handler.ashx?action=602&params={"LotteryID":3}',
          headers: {},
          params: {},
          success: function (res) {
            this.ssq = res.data.data
            this.ssq.forEach(function (item) {
              console.log(item['WinNumber'])
            })
          },
          failed: function (err) {
            console.log(err)
          }
        })
      }
    },
    mounted () {
      this.testData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style";
  /*头部*/
  .bl-nav {
    width: 100%;
    height: 12vmin;
    background-color: @color-red;
  }

  .bl-nav > div {
    display: inline-block;
  }

  .bl-nav-left {
    width: 30.6%;
    height: 100%;
    // background-color: green;
    margin-left: 2.8vmin;
    overflow: hidden;
    display: flex;
  }

  .bl-nav-right {
    width: 30.6%;
    height: 100%;
    // background-color: blue;
  }

  .bl-nav-title {
    width: 30.6%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .bl-nav-title p {
    text-align: center;
    font-size: 4.8vmin;
    font-weight: 700;
    color: white;
    line-height: 12vmin;
  }

  /*返回键*/
  #turnback {
    width: 5.86667vmin;
    height: 5.86667vmin;
    color: @color-background-white;
    font-weight: bold;
    font-size: 3.8vmin;
    display: inline-block;
    margin-left: 10px;
    margin-top: 3.7vmin;
  }
</style>
