<template>
  <div id="score-wrap">
    <!--1：0 头部-->
    <div id="score-title-wrap">
      <div id="score-title-body">
        <div :class="whiteBall" @click="football">足球</div>
        <div :class="redBall" @click="basketball">篮球</div>
      </div>
    </div>
    <!--1：0 tab切换部分-->
      <ul class="navBar">
        <li :class="value.red" @click="navTabClick(index)" v-for="(value, index) in navArr" :key="index">{{value.text}}
          <span :class="value.className"></span>
        </li>
      </ul>
    <!--上一期 下一期部分-->
    <div class="scoreContent">
      <!--点击场次显示点下来列表-->
      <div class="mask-body" v-show="slotsShow">
        <div class="mask">
          <div class="am-picker-popup-body">
            <div class="mask-head">
              <div @click="confirm" class="confirm">确定</div>
              <div @click="cancel" class="cancel">取消</div>
            </div>
            <mt-picker  :slots="slots"  @change="onValuesChange"></mt-picker>
          </div>
        </div>
      </div>
      <div class="pagination">
        <div class="arrowAlign">
          <i class="iconfont icon-jiantou jiantou"></i>
          <span>上一期</span>
        </div>
        <div class="paginationContent">
          <div >
            <div @click="ScreeningClick">{{scores.issue}}{{scores.date}}（{{scores.counts}}场）<i class="iconfont icon-jiantouxia jiantouxia"></i></div>
          </div>
        </div>
        <div class="arrowAlign-up">
          <span>下一期</span>
          <i class="iconfont icon-arrow-right arrow"></i>
        </div>
      </div>
      <div :class="animated" class="am-list-view-scrollview">
        <div class="am-list-body">
          <div class="list-view-section-body" v-for="(value,index) in scores.scores">
            <div class="battleBox">
              <i class="iconfont icon-wujiaoxing wujiaoxing"></i>
              <div class="battleInfo">
                {{value.no}}&nbsp;{{value.league}}&nbsp;{{value.begin}}
              </div>
              <div class="teamInfo">
                <div class="teamAlign">
                  {{value.homeName}}
                </div>
                <div class="vs_football">
                  <div v-if="value.score !== '--'"><span style="color: rgb(154, 199, 67);">{{value.score}}</span></div>
                  <div v-if="value.score === '--'"><span>VS</span></div>
                  <div v-if="value.score !== '--'"><span style="color: rgb(255, 95, 95);">进行中{{value.step}}'</span></div>
                  <div v-if="value.score === '--'"><span>未开始</span></div>
                </div>
                <div class="teamAlign-up">
                  {{value.visitingName}}
                </div>
              </div>
            </div>
            <div style="background-color: rgb(204, 204, 204); height: 1px;"></div>
          </div>
        </div>
        <div class="am-list-footer">
          <div style="padding: 30px; text-align: center;">已显示全部内容</div>
        </div>
      </div>
      <!--已显示全部内容-->
    </div>
    <ScoreFooter></ScoreFooter>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  import ScoreFooter from '@/components/Footer'
  export default {
    components: {
      ScoreFooter
    },
    name: 'Score',
    data () {
      return {
        whiteBall: 'score-title-body-whiteball',
        redBall: 'score-title-body-redball',
        navArr: [
          {className: 'nav-active', red: 'nav-red', text: '即时比分'},
          {className: '', red: '', text: '完场比分'},
          {className: '', red: '', text: '我的比分'}
        ],
        index: null,
        scores: [],
        slots: [
          {
            values: []
          }
        ],
        animated: '',
        value: null,
        slotsShow: false
      }
    },
    methods: {
      // 点击导航栏切换事件
      navTabClick (index) {
        Indicator.open('加载中...')
        this.index = index
        for (let i = 0; i < this.navArr.length; i++) {
          this.navArr[i].className = ''
          this.navArr[i].red = ''
          this.navArr[index].red = 'nav-red'
          this.navArr[index].className = 'nav-active'
        }
        if (this.animated === '') {
          this.animated = 'animated fadeInLeft'
        } else if (this.animated === 'animated fadeInLeft') {
          this.animated = 'animated fadeInRight'
        } else {
          this.animated = 'animated fadeInLeft'
        }
        switch (index) {
          case 0:
            this.getScoreData('/api/master/score/instant?lotteryId=1&page=1&pageSize=20')
            break
          case 1:
            this.getScoreData('/api/master/score/ending?lotteryId=1&page=1&pageSize=20')
            break
          case 2:
            this.getScoreData('/api/master/score/follow?lotteryId=1&page=1&pageSize=20')
            break
        }
      },
      // 点击足球事件
      football () {
        this.whiteBall = 'score-title-body-whiteball'
        this.redBall = 'score-title-body-redball'
        this.getScoreData('/api/master/score/instant?lotteryId=1&page=1&pageSize=20')
      },
      // 点击篮球事件
      basketball () {
        this.whiteBall = 'score-title-body-redball'
        this.redBall = 'score-title-body-whiteball'
        this.getScoreData('/api/master/score/instant?lotteryId=2&page=1&pageSize=20')
      },
      // 加载封装函数
      getScoreData (url) {
        this.$request({
          type: 'get',
          headers: {
            deviceCode: 'd5fa17e7-3074-4183-b40d-db9678b12a5e'
          },
          url: url,
          success: function (res) {
            console.log(res)
            if (res.status === 200) {
              this.slots[0].values = res.data.data.issues
              this.scores = res.data.data
            }
            Indicator.close()
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      // 点击星期几场次
      ScreeningClick () {
        this.slotsShow = true
      },
      // 下拉菜单事件
      onValuesChange (picker, values) {
        let value = values[0]
        if (value !== undefined) {
          this.value = value
        }
      },
      // 点击取消下拉菜单的事件
      cancel () {
        this.slotsShow = false
      },
      // 点击确定下拉菜单的事件
      confirm () {
        this.scores.issue = this.value
        this.slotsShow = false
      }
    },
    mounted () {
      this.getScoreData('/api/master/score/instant?lotteryId=1&page=1&pageSize=20')
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  #score-wrap {
    width: 100%;
    height: 100%;
  }
  #score-title-wrap{
    height: 12vmin;
    background-color: #ff5f5f;
    border: 1vmin solid #ff5f5f;
    box-sizing: border-box;
  }
  #score-title-body{
    width: 58.66667vmin;
    height: 8vmin;
    line-height: 8vmin;
    border-radius: 1.06667vmin;
    border: .26667vmin solid #fff;
    font-size: 3.73333vmin;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin: 1vmin 20vmin;
  }
  #score-title-body div{
    width: 50%;
    text-align: center;
  }
  .score-title-body-whiteball{
    background-color: #fff;
    color: #ff5f5f;
  }
  .score-title-body-redball{
    background-color: #ff5f5f;
    color: #fff;
    border-radius: 1.06667vmin;
   }
  .navBar {
    width: 100%;
    height: 9.9vmin;
    background-color: @color-background-white;
  }
  .navBar li {
    position: relative;
    font-size: 4vmin;
    display: inline-block;
    width: 33.3333%;
    color: #333;
    text-align: center;
    line-height: 10vmin;
  }
  .user-record-body ul .nav-red {
    color: #ff5f5f;
  }
  .nav-active {
    transition: all 1s;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .53333vmin;
    background-color: #ff5f5f;
  }
  .scoreContent{
    width: 100%;
    height: 100%;
    background-color: @color-background-white;
  }
  .pagination{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 11.2vmin;
    line-height: 11.2vmin;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-content: center;
    align-content: center;
    font-size: 3.46667vmin;
    box-sizing: border-box;
    padding: 0 2.66667vmin;
  }
  .arrowAlign{
    width: 20vmin;
    color: #666;
  }
  .arrowAlign-up{
    width: 16vmin;
    color: #666;
  }
  .jiantou{
    font-size: 4vmin;
  }
  .paginationContent{
    color: #333;
    width: 48vmin;
  }
  .jiantouxia{
   line-height: 2vmin;
  }
  .mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.65);
  }
  .mask-body{
    width: 100%;
    height: 100%;
  }
  .am-picker-popup-body{
    position: absolute;
    bottom: 0;
    width: 100%;
    height:75vmin;
    background-color: #ffffff;
    animation-name: diagonal-slide;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
  }
  @keyframes diagonal-slide {
    0% {
      left: 0;
      bottom: -200px;
    }
    100%{
      left: 0;
      bottom: 0;
    }
  }
  .mask-head{
    border-bottom: 0.3vmin solid #eeeeee;
    width: 100%;
    height: 10vmin;
    margin: 4vmin auto;
  }
  .confirm{
    padding-right: 4vmin;
    float: right;
    font-size: 4.5vmin;
    color: @color-text-red;
  }
  .cancel{
    padding-left: 4vmin;
    float: left;
    font-size: 4.5vmin;
    color: @color-text-red;
  }
  .am-list-body {
    position: relative;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  .battleBox{
    height: 26.66667vmin;
    padding: 0 2.66667vmin;
    position: relative;
  }
  .wujiaoxing{
    color: #e5e5e5;
    position: absolute;
    top: 10vmin;
    z-index: 999;
    font-size: 7vmin;
    font-weight: 100;
  }
  .battleInfo{
    font-size: 3.46667vmin;
    color: #999;
    margin-top: 5.33333vmin;
  }
  .teamInfo{
    position: relative;
    margin-top: 6.4vmin;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-content: center;
    align-content: center;
  }
  .teamAlign{
    text-align: right;
    font-size: 4.26667vmin;
    color: #333;
    width: 7em;
  }
  .teamAlign-up{
    text-align: left;
    font-size: 4.26667vmin;
    color: #333;
    width: 7em;
  }
  .vs_football{
    font-size: 4.53333vmin;
    color: #999;
    text-align: center;
    margin: 0 2.66667vmin;
    position: relative;
    top: -1.33333vmin;
  }
  .vs_football div:last-child{
    margin-top: 1.33333vmin;
    font-size: 2.66667vmin;
    color: #ccc;
  }
  .am-list-footer {
    margin-bottom: 10vmin;
    padding: 2.66667vmin 4vmin 4vmin;
    font-size: 3.73333vmin;
    color: #a1afb4;
  }
</style>
