<template>
  <div id="documentary_patiuclars_wrap">
    <!--<router-link to="/documentary">-->
    <div id="documentary_particulars_title" @click="returnGo">
      <i class="iconfont icon-jiantou"></i>
      彩帝详情
    </div>
    <!--</router-link>-->
    <div id="documentary_particulars_user">
      <div id="user_avatar">
        <img :src="titledata.avatar">
      </div>
      <div id="user_nick">
        <div>{{titledata.nick}}</div>
        <span>粉丝数: {{titledata.fans}}</span>
      </div>
      <div class="user_attention" @click="unattentionClick" v-show="unattention === false">
        +关注
      </div>
      <div class="user_attention" @click="unattentionClick" v-show="unattention === true">
        √已关注
      </div>
    </div>
    <div id="recommend_and_grade">
      <div id="recommend" :class="red" @click="redClick">推荐</div>
      <div id="grade" :class="black" @click="blackClick">战绩</div>
    </div>
    <div id="recommend_wrap" v-if="rDisplay">
      <div id="recommend_title">
        <div>{{all}}(<span>{{Num}}</span>)</div>
        <div @click="filtrateClick">筛选<i class="icon-jiantou2 iconfont"></i></div>
        <div id="filtrate" v-if="fDisplay">
          <div id="triangle"></div>
          <p @click="allclick">全部推荐</p>
          <span></span>
          <p @click="wonclick">中奖推荐</p>
        </div>
      </div>
      <div class="recommend_body" v-for="(plan,index,key) in plans" v-if="plan.state.split('').length <= four" @click="deity(index)">
        <div class="recommend_body_title">{{plan.date}}</div>
        <div class="recommend_body_body">
          <div class="recommend_body_body_title">
            已跟投<span>{{plan.followedBet.amount}}元</span>
          </div>
          <div class="recommend_body_body_body">
            <div>场次数<p>{{plan.matchCounts}}场</p></div>
            <div>过关方式<p>{{plan.parlay}}</p></div>
            <div>彩帝投注<p>{{plan.bet}}</p></div>
            <img :src="wonbgimg" v-if="plan.state === 'won'">
            <img :src="lostbgimg" v-if="plan.state === 'lost'">
          </div>
          <div class="recommend_body_body_footer">
            <b>截止 {{plan.followedBet.deadline}}</b>
            <span v-if="plan.state != 'begin'">已截止</span>
            <strong class="redstrong1" v-if="plan.state === 'begin'">立即跟单</strong>
          </div>
        </div>
      </div>
    </div>
    <div id="grade_wrap" v-if="gDisplay">
      <div id="grade_newTime">最近更新: {{gradedata.latestUpdate}}</div>
      <div id="grade_percent">
        <div><strong>{{gradedata.hitRate}}</strong><span>命中率</span></div>
        <p></p>
        <div><strong>{{gradedata.profitRate}}</strong><span>盈利率</span></div>
        <p></p>
        <div><strong>{{gradedata.winAmount}}</strong><span>推荐中奖</span></div>
      </div>
      <div id="grade_recent">
        <div id="grade_recent_title">近期状况</div>
        <div id="grade_recent_body">
          <div id="grade_recent_body_profit">
            <span>近7天盈利率</span>
            <b>{{gradedata.profitRate7d}}</b>
          </div>
          <div id="grade_recent_body_hit">
            <span>近7命中率</span>
            <b>{{gradedata.hitRate7d}}</b>
          </div>
          <div id="grade_recent_body_grade">
            <span>近7天战绩</span>
            <b>{{gradedata.orderCounts7d}}单<strong>{{gradedata.hit7d}}红</strong>{{gradedata.unHit7d}}黑</b>
          </div>
          <div class="grade_recent_body_state">
            <span>近{{hitstates1.length}}场状态</span>
            <b v-for="(hitstate,index,key) in hitstates1" :class="[{red1:hitstate === '红'},{black1:hitstate === '黑'}]">{{hitstate}}</b>
          </div>
        </div>
      </div>
      <div id="grade_all">
        <div id="grade_all_title">战绩总预览</div>
        <div id="grade_all_body">
          <div id="grade_all_body_red">
            <span>最长连红</span>
            <b>{{gradedata.hit7d}}连红</b>
          </div>
          <div id="grade_all_body_black">
            <span>最长连黑</span>
            <b>{{gradedata.unHit7d}}连黑</b>
          </div>
          <div id="grade_all_body_people">
            <span>总跟单人数</span>
            <b>{{gradedata.followedBetViews}}人</b>
          </div>
          <div id="grade_all_body_money">
            <span>总跟单金额</span>
            <b>{{gradedata.followedBetAmount}}元</b>
          </div>
          <div id="grade_all_body_moneys">
            <span>总推荐中奖</span>
            <b>{{gradedata.winAmount}}元</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getJsCookie} from '@/common/js/util'
  import {Indicator} from 'mint-ui'
  export default {
    name: 'Particulars',
    data () {
      return {
        titledata: {},
        gradedata: {},
        red: 'red',
        black: '',
        all: '全部推荐',
        plans: [],
        wonbgimg: '../../src/assets/tth-documentary/won.png',
        lostbgimg: '../../src/assets/tth-documentary/lost.png',
        hitstates1: [],
        rDisplay: true,
        gDisplay: false,
        fDisplay: false,
        four: 5,
        Num: '',
        login: getJsCookie('CP_UserIDGuid'),
        unattention: false,
        allorhit: 'all'
      }
    },
    methods: {
      titleData () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.godsrankUid}/info`,
          headers: {},
          params: {},
          success: function (res) {
//            console.log(res.data.data.avatar)
            this.titledata = res.data.data
            if (this.titledata.avatar === '') {
              this.titledata.avatar = '../../src/assets/tth-documentary/tth-user.png'
            }
            Indicator.close()
          },
          failed: function () {}
        })
      },
      recommendData () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.godsrankUid}/plan/recommend?filter=${this.allorhit}&page=1&pageSize=100`,
          headers: {},
          params: {},
          success: function (res) {
//            console.log(res.data.data.plans[0].hitState.split('').length)
            this.plans = res.data.data.plans
            this.allNum = res.data.data.plans.length
            this.Num = res.data.data.plans.length
            this.wonNums = res.data.data.plans[0].hitState.split('')
            let num = 0
            for (let i = 0; i < this.wonNums.length; i++) {
              num += parseInt(this.wonNums[i])
            }
            this.wonNum = num
//            Indicator.close()
          },
          failed: function () {}
        })
      },
      gradeData () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.godsrankUid}/record`,
          headers: {},
          params: {},
          success: function (res) {
//            console.log(res.data.data)
            this.gradedata = res.data.data
            this.hitstates = res.data.data.hitState
            this.hitstates1 = []
            for (let i = 0; i < this.hitstates.length; i++) {
              if (this.hitstates[i] === '1') {
                this.hitstates1.push('红')
              } else if (this.hitstates[i] === '0') {
                this.hitstates1.push('黑')
              }
            }
            Indicator.close()
//            console.log(this.hitstates1)
          },
          failed: function () {}
        })
      },
      redClick () {
        this.red = 'red'
        this.black = ''
        this.rDisplay = true
        this.gDisplay = false
      },
      blackClick () {
        this.red = ''
        this.black = 'red'
        this.rDisplay = false
        this.gDisplay = true
      },
      filtrateClick () {
        this.fDisplay = !this.fDisplay
      },
      allclick () {
        this.four = 5
        this.fDisplay = !this.fDisplay
        this.all = '全部推荐'
        this.Num = this.allNum
        this.allorhit = 'all'
      },
      wonclick (res) {
        this.four = 3
        this.fDisplay = !this.fDisplay
        this.all = '中奖推荐'
        this.Num = this.wonNum
        this.allorhit = 'hit'
//        console.log(this.allorhit)
      },
      deity (index) {
        let masterSchemeId = this.plans[index].masterSchemeId
        let uId = this.plans[index].uid
        this.$router.push('/deity/' + uId + '/' + masterSchemeId)
//        console.log(masterSchemeId)
//        console.log(uId)
      },
      unattentionClick () {
        if (this.login === null) {
          this.$router.push({path: '/login'})
        } else {
          this.unattention = !this.unattention
        }
      },
      returnGo () {
        this.$router.go(-1)
      }
    },
    watch: {
      allorhit () {
        this.recommendData()
      }
    },
    mounted () {
      Indicator.open('加载中')
      this.titleData()
      this.recommendData()
      this.gradeData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  #documentary_particulars_title{
    box-sizing: border-box;
    height: 12vmin;
    background-color: #ff5f5f;
    color: #fff;
    font-size: 5.8vmin;
    text-align: center;
    line-height: 12vmin;
    font-weight: 900;
    position: relative;
  }
  .icon-jiantou{
    float: left;
    margin-top: -.5vmin;
    font-size: 4vmin;
    position: absolute;
    left: 5vmin;
    color: white;
    font-weight: 900;
  }
  #documentary_particulars_user{
    padding: 4vmin 3.2vmin;
    background: #ff5f5f;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  #user_avatar{
    width: 13.06667vmin;
    height: 13.06667vmin;
    display: inline-block;
    border-radius: 50%;
    margin-right: 2.13333vmin;
  }
  #user_avatar img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  #user_nick{
    color: white;
    width: 61vmin;
    padding-top: 3vmin;
  }
  #user_nick div{
    font-size: 4.8vmin;
    display: block;
    font-weight: 400;
  }
  #user_nick span{
    font-weight: 400;
    font-size: 3.73333vmin;
  }
  .user_attention{
    background: #fff;
    padding: 0 2.66667vmin;
    height: 6.66667vmin;
    line-height: 6.66667vmin;
    text-align: center;
    border-radius: .53333vmin;
    margin-top: 2.93333vmin;
    color: #ff5f5f;
    box-sizing: border-box;
    font-size: 3vmin;
  }
  #recommend_and_grade{
    height: 11.46667vmin;
    line-height: 11.46667vmin;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 20vmin;
  }
  #recommend_and_grade div{
    box-sizing: border-box;
    width: 20vmin;
    text-align: center;
    font-size: 4vmin;
  }
  .red{
    color: red;
    border-bottom: .4vmin solid red ;
  }
  #recommend_wrap{
    width: 100%;
    box-sizing: border-box;
    background-color: #F2F2F2;
  }
  #recommend_title{
    display: flex;
    justify-content: space-between;
    height: 8.26667vmin;
    line-height: 8.26667vmin;
    font-size: 3.73333vmin;
    color: #999999;
    padding: 0 2vmin;
    position: relative;
  }
  #filtrate{
    position: absolute;
    width: 25.33333vmin;
    height: 24vmin;
    display: flex;
    box-sizing: border-box;
    padding: 1.73333vmin;
    right: 4vmin;
    z-index: 1;
    background: #fff;
    flex-direction: column;
    border-radius: .53333vmin;
    box-shadow: 0 0.8vmin 2.66667vmin 0 #dedede;
    top: 7.6vmin;
  }
  #triangle{
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 1.46667vmin solid transparent;
    border-right: 1.46667vmin solid transparent;
    border-bottom: 1.33333vmin solid #fff;
    right: 3.2vmin;
    top: -1.2vmin;
  }
  #filtrate p{
    font-size: 3.73333vmin;
    flex: 1;
    text-align: center;
    line-height: 10.66667vmin;
    color: #999999;
  }
  #filtrate span{
    border-bottom: .2vmin solid #E6E6E6;
  }
  #recommend_title span{
    color: red;
  }
  #recommend_title i{
    color: #92A1FF;
    font-size: 5vmin;
    height: 1.86667vmin;;
  }
  .recommend_body{
    padding: 3.46667vmin 3.2vmin;
    background: #fff;
    margin-bottom: 2.4vmin;
  }
  .recommend_body_title{
    font-size: 4vmin;
    line-height: 1;
    display: block;
    margin-bottom: 3.46667vmin;
  }
  .recommend_body_body{
    padding-left: 6.66667vmin;
    position: relative;
  }
  .recommend_body_body_title{
    font-size: 3.73333vmin;
    margin-bottom: 3.73333vmin;
  }
  .recommend_body_body_title span{
    color: red;
  }
  .recommend_body_body_body{
    width: 100%;
    box-sizing: border-box;
    border-bottom: .4vmin solid red;
    display: flex;
    justify-content: space-between;
    padding: 0 5vmin;
    font-size: 3.73333vmin;
    text-align: center;
    color: #999;
  }
  .recommend_body_body_body p{
    color: black;
    margin-top: 1.6vmin;
    margin-bottom: 4vmin;
  }
  .recommend_body_body img{
    position: absolute;
    width: 18.66667vmin;
    height: 12.66667vmin;
    left: 58%;
    top: 90%;
    margin-left: -6.13333vmin;
    margin-top: -20.33333vmin;
  }
  .recommend_body_body_footer{
    margin-top: 4vmin;
    text-align: right;
  }
  .redstrong1{
    border:.1vmin solid red;
    color: red;
    font-size: 4.26667vmin;
    width: 22.66667vmin;
    height: 8vmin;
    line-height: 8vmin;
    text-align: center;
    display: inline-block;
  }
  .recommend_body_body_footer b{
    font-size: 3.73333vmin;
    color: #999;
    vertical-align: middle;
    display: inline-block;
    margin-right: 6.66667vmin;
  }
  .recommend_body_body_footer span{
    border: .1vmin solid #e6e6e6;
    color: #aaa;
    font-size: 4.26667vmin;
    width: 22.66667vmin;
    height: 8vmin;
    line-height: 8vmin;
    text-align: center;
    display: inline-block;
  }
  #grade_wrap{
    background-color: #F2F2F2;
  }
  #grade_newTime{
    line-height: 6.66667vmin;
    height: 6.66667vmin;
    padding: 0 1.6vmin;
    color: #999;
    font-size: 3.2vmin;
  }
  #grade_percent{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: #fff;
    height: 18.13333vmin;
    padding: 4vmin 2.66667vmin;
  }
  #grade_percent div{
    width: 28vmin;
    text-align: center;
  }
  #grade_percent p {
    border-left: .3vmin solid #E6E6E6;
    height: 7vmin;
    margin-top: 1.5vmin;
  }
  #grade_percent strong{
    width: 100%;
    display: block;
    font-size: 4.8vmin;
    color: #ff5f5f;
    line-height: 1;
    margin-bottom: 1.86667vmin;
    text-align: center;
  }
  #grade_percent span{
    width: 100%;
    font-size: 3.2vmin;
    line-height: 1;
    color: #999;
    text-align: center;
  }
  #grade_recent{
    background: #fff;
    padding: 4vmin;
    box-sizing: border-box;
    margin-top: 2.4vmin;
  }
  #grade_recent_title{
    text-align: center;
    border-bottom: .4vmin solid #ff5f5f;
    padding-bottom: 1.86667vmin;
    font-size: 3.73333vmin;
  }
  #grade_recent_body div{
    padding-left: 1.86667vmin;
    font-size: 3.73333vmin;
    margin-top: 3.46667vmin;
    line-height: 1;
  }
  #grade_recent_body span{
    width: 33.33333vmin;
    color: #999;
    display: inline-block;
  }
  #grade_recent_body_grade strong{
    color: red;
  }
  .red1{
    background-color: red;
    color: white;
    border-radius: 50%;
    display: inline-block;
    width: 3.73333vmin;
    height: 3.73333vmin;
    font-size: 2.93333vmin;
    line-height: 3.73333vmin;
    text-align: center;
    margin-right: 1.33333vmin;
  }
  .black1 {
    background-color: black;
    color: white;
    border-radius: 50%;
    display: inline-block;
    width: 3.73333vmin;
    height: 3.73333vmin;
    font-size: 2.93333vmin;
    line-height: 3.73333vmin;
    text-align: center;
    margin-right: 1.33333vmin;
  }
  #grade_all{
    background: #fff;
    padding: 4vmin;
    box-sizing: border-box;
    margin-top: 2.4vmin;
  }
  #grade_all_title{
    text-align: center;
    border-bottom: .4vmin solid #ff5f5f;
    padding-bottom: 1.86667vmin;
    font-size: 3.73333vmin;
  }
  #grade_all_body div{
    padding-left: 1.86667vmin;
    font-size: 3.73333vmin;
    margin-top: 3.46667vmin;
    line-height: 1;
  }
  #grade_all_body span{
    width: 33.33333vmin;
    color: #999;
    display: inline-block;
  }




</style>
