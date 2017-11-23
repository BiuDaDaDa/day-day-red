<template>
<div id="deityWrap">
  <div id="deity_title" @click="returnP">
    <i class="iconfont icon-jiantou"></i>
    神单详情
  </div>
  <div id="deity_user">
    <img id="user_avatar" :src="userData.avatar">
    <div id="user_body">
      <div id="body_nick">{{userData.nick}}</div>
      <span>命中率 : <strong>{{userData.hitRate}}</strong></span>
      <span>盈利率 : <strong>{{userData.profitRate}}</strong></span>
    </div>
    <div id="user_attention">
      +关注
    </div>
  </div>
  <div id="deity_content">
    <h6 id="content_title">推荐内容</h6>
    <div id="content_title2">
      <div id="title2_buy">彩帝购买: <span>{{title2Data.masterAmount}}元</span></div>
      <div id="title2_abort">{{title2Data.deadline}}截止</div>
    </div>
    <div id="content_body">
      <div id="body_title">
        <div>编号</div>
        <div>主队VS客队</div>
        <div>彩帝投注</div>
        <div v-if="content.state !== 'begin'">彩果</div>
      </div>
      <div class="body_body" v-for="(contentData,index,key) in contentDatas">
        <div class="number">{{contentData.date}}{{contentData.no}}</div>
        <div>
          <p>{{contentData.homeName}}</p>
          <p>VS</p>
          <p>{{contentData.visitingName}}</p>
        </div>
        <div class="number">登录查看</div>
        <div class="number" v-if="content.state !== 'begin'">{{contentData.result}}</div>
      </div>
      <div id="body_footer">
        过关方式: {{content.parlay}}
      </div>
      <img src="../../assets/tth-documentary/won.png" v-if="content.state === 'won'">
      <img src="../../assets/tth-documentary/lost.png" v-if="content.state === 'lost'">
    </div>
    <div id="content_footer" v-if="content.reason != ''">
      <div>推荐理由:</div>
      <p>{{content.reason}}</p>
    </div>
  </div>
  <div id="deity_condition">
    <h6 id="condition_title">跟投情况</h6>
    <span v-if="content.state !== 'won'">跟投<b>{{title2Data.views}}</b>人, 累计<b>{{title2Data.amount}}</b>元</span>
    <span v-if="content.state === 'won'">跟投<b>{{title2Data.views}}</b>人, 累计<b>{{title2Data.amount}}</b>元, 中奖 <b>{{title2Data.winAmount}}</b>元</span>
  </div>
  <div id="deity_footer" v-if="content.state === 'begin'">
    <div>投</div>
    <input type="text" v-model:value="num">
    <div>倍</div>
    <div id="common">共<span>{{num*2}}</span>元</div>
    <button>立即跟单</button>
  </div>
  <div id="deity_footer1" v-if="content.state !== 'begin'">方案已截止投注</div>
</div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        userData: {},
        title2Data: {},
        contentDatas: [],
        content: {},
        num: ''
      }
    },
    methods: {
      deityUserData () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.uId}/info`,
          success: function (res) {
//            console.log(res.data.data)
            this.userData = res.data.data
            if (this.userData.avatar === '') {
              this.userData.avatar = '../../src/assets/tth-documentary/tth-user.png'
            }
          },
          failed: function () {
          }
        })
      },
      deityTitle2Data () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.uId}/plan/${this.$route.params.masterSchemeId}/info`,
          success: function (res) {
//            console.log(res.data.data.followedBet)
            this.title2Data = res.data.data.followedBet
          },
          failed: function () {
          }
        })
      },
      deityContentData () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.uId}/plan/${this.$route.params.masterSchemeId}/info`,
          success: function (res) {
//            console.log(res.data.data.matches)
            this.contentDatas = res.data.data.matches
          },
          failed: function () {
          }
        })
      },
      deityData () {
        this.$request({
          type: 'get',
          url: `/api/master/master/${this.$route.params.uId}/plan/${this.$route.params.masterSchemeId}/info`,
          success: function (res) {
//            console.log(res.data.data.state)
            this.content = res.data.data
          },
          failed: function () {
          }
        })
      },
      returnP () {
        this.$router.push('/documentary')
      }
    },
    mounted () {
      this.deityUserData()
      this.deityTitle2Data()
      this.deityContentData()
      this.deityData()
    }
  }
</script>

<style scoped lang="less">
  #deityWrap{
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
  }
  #deity_title{
    box-sizing: border-box;
    height: 12vmin;
    background-color: #ff5f5f;
    color: #fff;
    font-size: 5.8vmin;
    text-align: center;
    line-height: 12vmin;
    font-weight: 900;
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
  #deity_user{
    height: 21.86667vmin;
    background: #fff;
    box-sizing: border-box;
    padding: 4vmin 3.2vmin;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.86667vmin;
  }
  #user_avatar{
    width: 13.06667vmin;
    height: 13.06667vmin;
    border-radius: 50%;
    display: inline-block;
    margin-right: 2.4vmin;
  }
  #body_nick{
    font-size: 4.26667vmin;
    display: block;
    margin: 1.33333vmin 0 2.4vmin;
  }
  #user_body{
    width: 66vmin;
  }
  #user_body span{
    font-size: 3.6vmin;
    color: #999999;
  }
  #user_body strong{
    color: red;
  }
  #user_attention{
    padding: 0 1.33333vmin;
    height: 6.66667vmin;
    line-height: 6.66667vmin;
    text-align: center;
    border: 1px solid #ff5f5f;
    border-radius: .8vmin;
    background: #fff;
    color: #ff5f5f;
    margin-top: 3.46667vmin;
    font-size: 3vmin;
  }
  #deity_content{
    background: #fff;
    padding: 3.2vmin 4vmin;
  }
  #content_title{
    height: 4.26667vmin;
    line-height: 1;
    font-size: 4.26667vmin;
    border-left: .8vmin solid #ff5f5f;
    padding-left: 2.66667vmin;
    margin-bottom: 4vmin;
  }
  #content_title2{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4vmin;
  }
  #content_title2 div{
    font-size: 3.7vmin;
    color: #999999;
  }
  #content_title2 span{
    color: red;
  }
  #content_body{
    width: 100%;
    border: 1px solid #e6e6e6;
    position: relative;
  }
  #content_body img{
    position: absolute;
    width: 23.46667vmin;
    height: 16.26667vmin;
    left: 50%;
    top: 50%;
    margin-left: -8.13333vmin;
    margin-top: -11.73333vmin;
  }
  #body_title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: .1vmin solid red;
  }
  #body_title div{
    text-align: center;
    padding: 2.53333vmin 0;
    font-size: 3.46667vmin;
    color: #999;
    width: 31vmin;
  }
  .body_body{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: .1vmin solid #E6E6E6;
    font-size: 3.46667vmin;
    box-sizing: border-box;

  }
  .body_body div{
    width: 31vmin;
    text-align: center;
  }
  .number{
    padding: 5.53333vmin 0;
  }
  .body_body p{
    margin: 1vmin 0;
  }
  #body_footer{
    text-align: left;
    padding: 3vmin 1.33333vmin;
    font-size: 3.46667vmin;
  }
  #content_footer{
    margin-top: 3.46667vmin;
    font-size: 3.73333vmin;
  }
  #content_footer div{
    color: #999;
    margin-bottom: 2.66667vmin;
  }
  #deity_condition{
    background: #fff;
    padding: 4vmin 3.2vmin;
    margin-top: 2.4vmin;
    box-sizing: border-box;
    border-bottom: 1vmin solid white;
    margin-bottom: 35.7vmin;
  }
  #condition_title{
    height: 4.26667vmin;
    line-height: 1;
    font-size: 4.26667vmin;
    border-left: .8vmin solid #ff5f5f;
    padding-left: 2.66667vmin;
    margin-bottom: 4vmin;
  }
  #deity_condition span{
    font-size: 3.7vmin;
    color: #A39999;
  }
  #deity_condition b{
    color: red;
  }
  #deity_footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    height: 13.33333vmin;
    line-height: 13.33333vmin;
    border-top: 1px solid #e6e6e6;
    background: #fcfcfc;
    overflow: hidden;
    padding-left: 3.73333vmin;
    font-size: 3.73333vmin;
    color: #999;
  }
  #deity_footer div{
    float: left;
  }
  #deity_footer input{
    float: left;
    width: 18.66667vmin;
    height: 7.46667vmin;
    border-radius: 1.06667vmin;
    border: 1px solid #9f9f9f;
    display: inline-block;
    background: #f6f8f7;
    margin: 2vmin 1.33333vmin;
    text-align: center;
    outline: none;
  }
  #deity_footer span{
    color: red;
  }
  #common{
    margin-left: 10vmin;
  }
  #deity_footer button{
    vertical-align: middle;
    width: 28.26667vmin;
    background: #ff5f5f;
    height: 13.33333vmin;
    border: none;
    float: right;
    font-size: 4.8vmin;
    color: #fff;
    outline: none;
  }
  #deity_footer1{
    height: 13.33333vmin;
    line-height: 13.33333vmin;
    background: #e6e6e6;
    text-align: center;
    color: #999;
    font-size: 4.26667vmin;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
  }







</style>
