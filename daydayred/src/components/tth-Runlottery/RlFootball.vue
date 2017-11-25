<template>
  <div class="RlFootball">
    <div class="bl-nav">
      <div class="bl-nav-left">
        <i class="iconfont icon-jiantou" id="turnback" @click="backRl"></i>
      </div>
      <div class="bl-nav-title">
        <h3>竞彩足球开奖</h3>
      </div>
      <div class="bl-nav-right">
      </div>
    </div>
    <header>
      <span @click="backDay">
        <i class="iconfont icon-jiantou"></i>
        <b>上一期</b>
      </span>
      <div @click="chooseTime">
        <span>{{Today[0]}}-{{Today[1]}}-{{Today[2]}} {{WeekDay}}({{ssq.length}})场</span>
        <i class="iconfont icon-jiantou2"></i>
      </div>
      <span @click="goDay">
        <b>下一期</b>
        <i class="iconfont icon-jiantou-copy-copy"></i>
      </span>
    </header>
    <ul>
      <li v-for="(item, index) in ssq"
          @click="toggle(isShow, index)"
      >
        <p>{{item['WKName']}} {{item['MNO']}} {{item['LeagueName']}} {{MatchTime[index][0]}}:{{MatchTime[index][1]}}</p>
        <div>
          <i class="iconfont icon-jiantou2" id="down" ref="turnover"></i>
          <span id="HomeT">{{item['HTeam']}}</span>
          <div id="allRz">
            <p id="Rz">{{item['Rz']}}</p>
            <p id="hRz">半{{item['HRz']}}</p>
          </div>
          <span id="ValueT">{{item['VTeam']}}</span>
        </div>
        <table v-show="isShow" >
          <tr>
            <td>胜平负</td>
            <td>让球胜平负</td>
            <td>比分</td>
            <td>总进球</td>
            <td>半全场</td>
          </tr>
          <tr>
            <td>{{result[item['RZResult']]}}</td>
            <td>({{item['RQ']}}){{concedes[index]}}</td>
            <td>{{item['Rz']}}</td>
            <td>{{allGoals[index]}}</td>
            <td>{{HRz[index]}}{{result[item['RZResult']]}}</td>
          </tr>
        </table>
      </li>
    </ul>
    <div class="ftMask" @click="backList" v-if="isChooseTime">
    </div>
    <!--<div class="timeList">-->
    <!--<div class="listHeader">-->
    <!--<div>取消</div>-->
    <!--<div>选择器次</div>-->
    <!--<div>确定</div>-->
    <!--</div>-->
    <!--<p v-for="item in DateSimple">{{item}}</p>-->
    <!--</div>-->
  </div>
</template>
<script>
  import Test from './test'
  import { Toast, Indicator } from 'mint-ui'

  export default {
    name: 'rlfootball',
    data () {
      return {
        ssq: {},
        MatchTime: [],
        result: ['负', '平', 's', '胜'],
        allGoals: [],
        HRz: [],
        concedes: [],
        Today: [],
        WeekDay: '',
        // id拼接字符
        IssueName: '20171125',
        isShowInfo: true,
        // 蒙版v-if值
        isChooseTime: false,
        // 头部第一个li
        isShow: true
      }
    },
    methods: {
      testData () {
        let that = this
        this.$request({
          type: 'get',
          url: 'api/data/Handler.ashx?action=606&params={' + 'IssueName' + ':' + this.IssueName + '}',
          headers: {},
          params: {},
          success: function (res) {
            this.ssq = res.data.data
            this.ssq.forEach(function (e, index) {
              // 修改比赛时间
              that.MatchTime[index] = Test.cutMatchTime(e['MatchTime'])
              // 计算总进球数
              that.allGoals[index] = Test.allGoal(e['Rz'])
              // 修改半场比分
              that.HRz[index] = Test.halfResult(e['HRz'])
              // 让球计算胜负
              that.concedes[index] = Test.concede(e['Rz'], e['RQ'])
            })
            // 今天的比赛时间
            that.Today = Test.cutMatchTime2(this.ssq[0]['IssueName'])
            that.WeekDay = this.ssq[0]['WKName']
            // 第一个样式
            Indicator.close()
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      backDay () {
        // 上一期
        if (this.IssueName < 20171115) {
          this.IssueName = 20171115
          Toast({
            message: '已到最前一期',
            duration: 1500
          })
        } else {
          this.IssueName--
          this.testData()
          Indicator.open('加载中...')
        }
      },
      goDay () {
        // 下一期
        if (this.IssueName > 20171124) {
          this.IssueName = 20171124
          Toast({
            message: '已到最后一期',
            duration: 1500
          })
        } else {
          this.IssueName++
          this.testData()
          Indicator.open('加载中...')
        }
      },
      // 返回键路由跳转
      backRl () {
        this.$router.push({path: '/runlottery'})
      },
      // 比赛详情表格点击关闭和打开
      toggle (e, isShow, index) {
        console.log(isShow, index)
        e.target.isShow = false
      },
      chooseTime () {
        this.isChooseTime = true
      },
      backList () {
        this.isChooseTime = false
      }
    },
    mounted () {
      this.testData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style";

  .RlFootball {
    max-width: 607px;
    margin: 0 auto;
    position: relative;
  }

  /*头部*/
  .bl-nav {
    width: 100%;
    height: 12vmin;
    background-color: @color-red;
    display: flex;
    justify-content: space-between;
  }

  .bl-nav > div {
    display: inline-block;
  }

  .bl-nav-left {
    width: 30.6%;
    height: 100%;
    overflow: hidden;
  }

  .bl-nav-left i {
    padding-left: 4vmin;
  }

  .bl-nav-title {
    // width: 34.6%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .bl-nav-title h3 {
    text-align: center;
    font-size: 5.5vmin;
    font-weight: 700;
    color: white;
    line-height: 12vmin;
  }

  .bl-nav-right {
    width: 30.6%;
    height: 100%;
    // background-color: blue;
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

  /*日期header*/
  header {
    font-size: 3.46667vmin;
    display: flex;
    height: 10.66667vmin;
    line-height: 10.66667vmin;
    vertical-align: middle;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    color: @color-text-gray;
    justify-content: space-between;
  }

  header div {
    display: inline-block;
    color: @color-text-black;
  }

  /*li详情*/
  li {
    border-radius: .8vmin;
    background: #fff;
    padding: 3.33333vmin 4.8vmin;
    border-bottom: 1px solid #e6e6e6;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC,
    Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
    display: block;
  }

  li > p {
    color: #999;
    font-size: 3.46667vmin;
    margin-bottom: 4.53333vmin;
  }

  #HomeT, #ValueT {
    display: inline-block;
    width: 24.2vmin;
    padding-bottom: 8vmin;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    vertical-align: middle;
    font-size: 4.8vmin;
  }

  #HomeT {
    text-align: right;
  }

  li > div {
    display: inline-block;
    justify-content: center;
    height: 12vmin;
  }

  #allRz {
    display: inline-block;
    margin: 0 6vmin;
  }

  #Rz {
    text-align: center;
    font-size: 5.86667vmin;
    font-weight: 500;
    color: #ff5f5f;
    line-height: 1;
    display: block;
    margin-bottom: 1.33333vmin;
  }

  #hRz {
    font-weight: 400;
    font-size: 3.46667vmin;
    line-height: 1;
    color: @color-text-gray;
    display: block;
  }

  #down {
    vertical-align: middle;
    color: #6b8dff;
    margin-bottom: 8.33333vmin;
    display: inline-block;
    margin-right: 8.66667vmin;
  }

  #up {
    transform: rotate(-180deg);
    vertical-align: middle;
    color: #6b8dff;
    margin-bottom: 8.33333vmin;
    display: inline-block;
    margin-right: 8.66667vmin;
  }

  /*设置单独样式 li*/

  /*图表*/
  td {
    width: 19.3333vmin;
    height: 6.4vmin;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #F2F2F2;
    font-size: 1.86667vmin;
    line-height: 1.5;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC,
    Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
  }

  table tr:first-child {
    color: @color-text-gray;
  }

  /*蒙版*/
  .ftMask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.7;
  }

  /*.timeList{
    background-color: white;
  }
  .timeList p{
    text-align: center;
    font-size: 4.26667vmin;
  }
  .timeList div{
    display: flex;
    justify-content: space-between;
  }
  .listHeader div{
    color: #ff5f5f;
    font-size: 4.26667vmin;
    padding: 2.66667vmin 4vmin;
    height: 11.2vmin;
    box-sizing: border-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .listHeader div:nth-child(2){
    color: #000;
  }*/
</style>
