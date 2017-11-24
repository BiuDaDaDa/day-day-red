<template>
  <div class="Balllist">
    <div class="bl-nav">
      <div class="bl-nav-left">
        <i class="iconfont icon-jiantou" id="turnback" @click="backRl"></i>
      </div>
      <div class="bl-nav-title">
        <p>双色球开奖</p>
      </div>
      <div class="bl-nav-right">
      </div>
    </div>
    <ul id="all-number">
      <li v-for="(item, index) in ssq" :class="{'active':!index}" class="hehe" @click="test">
        <span>第{{item['Name']}}期 {{EndTime[index]}}</span>
        <div>
        <p id="getMoney">
          <strong v-for="everyNumber in WinNumber[index]">{{everyNumber}}</strong>
        </p>
          <div v-if="!index" id="final-money">
            <div>
              <span>{{item['Amount']}}<b>注</b>{{item['Money']}}<b>元</b></span>
              <p>一等奖</p>
            </div>
            <div>
              <span>{{item['TotalMoney']}} <b>元</b></span>
              <p>奖池</p>
            </div>
          </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
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
          url: 'api/data/Handler.ashx?action=602&params={%22LotteryID%22:3}',
          headers: {},
          params: {},
          success: function (res) {
            this.ssq = res.data.data
            this.ssq.forEach(function (e, index) {
              that.WinNumber[index] = Test.cutNumber(e['WinNumber'])
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
      },
      test () {
        this.$router.push({path: '/balllistnext'})
      }
    },
    mounted () {
      this.testData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style";
  .Balllist{
    background-color:@color-background-white;
    max-width: 607px;
    margin:0 auto;
  }
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
    overflow: hidden;
    display: flex;
  }
  .bl-nav-left i{
    padding-left: 4vmin;
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
    font-size: 5.4vmin;
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
  ul li p>strong:last-child{
    color: #6b8dff;
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
    height: 36.5vmin;
  }
  .active>span{
    color: #000;
  }
  .active>div p:first-child{
    margin:3.46667vmin 0;
  }
  .active i{
    margin-top: -20vmin;
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
  .active strong:last-child{
    color: @color-background-white;
    background: @color-blue;
  }
  #final-money{
    width: 100%;
    height: 16vmin;
    margin-top: 2vmin;
  }
  #final-money>div{
    width: 46%;
    height:100%;
    display: inline-block;
    overflow: hidden;
  }
  #final-money>div:first-child{
    margin-left: 4vmin;
  }
  #final-money>div p{
    font-size: 4vmin;
    text-align: center;
    color: @color-text-gray;
  }
  #final-money>div span{
    font-size: 4vmin;
    text-align: center;
    color: #ff5f5f;
  }
  #final-money>div b{
    color: @color-text-gray;
  }
</style>
