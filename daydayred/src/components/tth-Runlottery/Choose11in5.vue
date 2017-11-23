<template>
  <div>
    <div class="bl-nav">
      <div class="bl-nav-left">
        <i class="iconfont icon-jiantou" id="turnback" @click="backRl"></i>
      </div>
      <div class="bl-nav-title">
        <p>11选5开奖</p>
      </div>
      <div class="bl-nav-right">
      </div>
    </div>
    <ul id="all-number">
      <li v-for="(item, index) in ssq" :class="{'active':!index}" class="hehe">
        <span>第{{item['Name']}}期 {{EndTime[index]}}</span>
        <div>
          <p id="getMoney">
            <strong v-for="everyNumber in WinNumber[index]">{{everyNumber}}</strong>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Test from './test'
  export default {
    name: 'balllist',
    data () {
      return {
        ssq: {},
        getNumbers: [],
        getWeekDay: '',
        getMTime: '',
        WinNumber: [],
        EndTime: []
      }
    },
    methods: {
      testData () {
        let that = this
        this.$request({
          type: 'get',
          url: 'api/data/Handler.ashx?action=602&params={%22LotteryID%22:7}',
          headers: {},
          params: {},
          success: function (res) {
            this.ssq = res.data.data
            this.ssq.forEach(function (e, index) {
              that.WinNumber[index] = Test.cutFc3D(e['WinNumber'])
              that.EndTime[index] = Test.cutTime(e['EndTime'])
            })
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      backRl () {
        this.$router.push({path: '/runlottery'})
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
    font-size: 5.2vmin;
    font-weight: bold;
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
  /*中奖号码列表*/
  ul li{
    height: 17.86667vmin;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    padding: 4vmin 3.73333vmin 4vmin 4.53333vmin;
  }
  ul li span{
    display: block;
    color: @color-text-gray;
    line-height: 1;
    font-size: 3.46667vmin;
    margin-bottom: .8vmin;
  }
  ul li p{
    line-height: 1.5;
  }
  ul li p>strong{
    font-size: 4.8vmin;
    font-weight: 400;
    margin-right: 2.4vmin;
    color: #ff5f5f;
  }
  li i{
    width: 6.66667vmin;
    height: 6.66667vmin;
    float: right;
    color: @color-text-gray;
    margin-top: -5.13333vmin;
  }
  // 当天号码
  .active{
    padding: 4vmin;
    padding-bottom: 2.66667vmin;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    height: 26.5vmin;
  }
  .active>span{
    color: #000;
  }
  .active>div p{
    margin:3.46667vmin 0;
  }
  .active strong {
    width: 8.26667vmin;
    height: 8.26667vmin;
    line-height: 8.26667vmin;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    display: inline-block;
    font-size: 4vmin;
    font-weight: 700;
    margin-right: 1.6vmin;
    box-sizing: border-box;
    background: #ff5f5f;
    font-family: -apple-system,BlinkMacSystemFont,PingFang SC,Helvetica
    Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif;
  }
  .active i{
    margin-top: -10vmin;
  }
</style>
