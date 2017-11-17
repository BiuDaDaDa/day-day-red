<template>
  <div id="documengtary_wrap">
    <!-- title:彩帝跟单 -->
    <div id="documengtary_title">
      <h3>彩帝跟单</h3>
    </div>
    <!-- join:申请加入 -->
    <div id="documengtary_join">
      <img src="../../assets/tth-documentary/20171012095335.png" alt="">
    </div>
    <!-- ranking:彩帝排行 -->
    <div id="documengtary_ranking_wrap">
      <!-- title -->
      <h6>
        <span>彩帝排行</span>
        <i class="iconfont icon-arrow-right "></i>
      </h6>
      <!-- body  -->
      <div id="documengtary_ranking_body-wrap">
        <div class="documengtary_ranking_body" v-for="(god,index,key) in halfgods">
          <div class="documengtary_ranking_body_avatar"><img :src="god.avatar"></div>
          <div class="documengtary_ranking_body_username">{{(god.nick).split('',5).join('')}}</div>
          <div class="documengtary_ranking_body_grade">近{{(god.hitState).split('').length}}中{{parseInt((god.hitState.split('').length) * parseInt(god.hitRate) / 100)}}</div>
        </div>
      </div>
    </div>
    <!-- recommend:彩帝推荐 -->
    <div id="documengtary_recommend_wrap">
      <div id="documengtary_recommend_title">
        <div>彩帝推荐</div>
      </div>
      <div class="documengtary_recommend_body" v-for="(plan, index, key) in plans">
        <div class="documengtary_recommend_body_title">
          <img :src="plan.avatar">
          <span class="documengtary_recommend_body_title_user">
            <strong class="user_username">{{plan.nick}}</strong>
            <div class="user_userranking">
              近{{(plan.hitState).split('').length}}中{{counts[index]}}
            </div>
          </span>
          <span class="documengtary_recommend_body_title_time">
            {{plan.followedBet.deadline}}截止
          </span>
        </div>
        <div class="documengtary_recommend_body_body">
          {{plan.nick}}
        </div>
        <div class="documengtary_recommend_body_footer_wrap">
          <div class="documengtary_recommend_body_footer_counts">
            <span>场次数</span>
            <strong>{{plan.matchCounts}}</strong>
          </div>
          <p></p>
          <div class="documengtary_recommend_body_footer_way">
            <span>过关方式</span>
            <strong>{{plan.parlay}}</strong>
          </div>
          <p></p>
          <div class="documengtary_recommend_body_footer_bet">
            <span>彩帝投注</span>
            <strong>{{plan.bet}}</strong>
          </div>
          <p></p>
          <div class="documengtary_recommend_body_footer_money">
            <span>已跟投金额</span>
            <strong class="colorred">{{plan.followedBet.views}}</strong>
          </div>
        </div>
      </div>
    </div>
    <!-- 背景图片 -->
    <img id="documengtary_bgimg" src="../../assets/tth-documentary/20170622203327.png" alt="">
    <!-- 暂无彩帝数据 -->
    <div id="documengtary_no">暂无彩帝数据</div>
  </div>
</template>

<script>
  export default {
    name: 'Documentary',
    data () {
      return {
        halfgods: [],
        plans: [],
        counts: []
      }
    },
    methods: {
      rankingData () {
        this.$request({
          type: 'get',
          url: 'api/master/master/rank',
          headers: {},
          params: {},
          success: function (res) {
//            console.log(parseInt((res.data.data.gods[2].hitState.split('').length) * parseInt(res.data.data.gods[1].hitRate) / 100))
            this.halfgods = (res.data.data.gods).slice(0, 5)
            for (let i = 0; i < (res.data.data.gods).length; i++) {
              if (res.data.data.gods[i].avatar === '') {
                res.data.data.gods[i].avatar = '../../src/assets/tth-documentary/tth-user.png'
              }
            }
          },
          failed: function () {}
        })
      },
      recommendData () {
        this.$request({
          type: 'get',
          url: 'api/master/master/plan/recommend',
          headers: {},
          params: {},
          success: function (res) {
            console.log(res.data.data.plans[1].nick)
            this.plans = res.data.data.plans
            let count = 0
            let counts = []
            for (let i = 0; i < res.data.data.plans.length; i++) {
              let str = res.data.data.plans[i].hitState
              let num1 = '1'
              let regex = new RegExp(num1, 'g')
              let result = str.match(regex)
              count = !result ? 0 : result.length
              counts.push(count)
              if (res.data.data.plans[i].avatar === '') {
                res.data.data.plans[i].avatar = '../../src/assets/tth-documentary/tth-user.png'
              }
            }
            this.counts = counts
          },
          failed: function () {}
        })
      }
    },
    mounted () {
      this.rankingData()
      this.recommendData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  #documengtary_wrap{
    width: 100%;
    height: 100%;
    background-color: @color-background-gray;
  }
  /* 彩帝跟单 */
  #documengtary_title{
    height: 12vmin;
    background-color: #ff5f5f;
    color: #fff;
    font-size: 4.8vmin;
  }
  h3{
    font-size: 1.17em;
    font-weight: bold;
    text-align: center;
    line-height: 12vmin;
  }

  /* 申请加入 */
  #documengtary_join{
    width: 100%;
    margin-bottom: 2.66667vmin;
  }
  #documengtary_join img{
    width: 100%;
  }

  /* 彩帝排行 */
  #documengtary_ranking_wrap{
    width: 100%;
    background: @color-background-white;
    padding: 4vmin 3.2vmin;
    margin-bottom: 2.66667vmin;
    box-sizing: border-box;
  }
  /* title */
  #documengtary_ranking_wrap h6{
    display: flex;
    line-height: 1;
    height: 4.26667vmin;
    font-size: 4.26667vmin;
    border-left: .8vmin solid #ff5f5f;
    padding-left: 1.6vmin;
    margin-bottom: 4vmin;
  }
  #documengtary_ranking_wrap h6 span{
    width: 85vmin;
    font-weight: bold;
    color: @color-text-black;
  }
  .icon-arrow-right{
    color: #CFCFCF;
    font-size: 4vmin;
    margin-top: .2vmin;
  }
  /* body */
  #documengtary_ranking_body-wrap{
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .documengtary_ranking_body{
    width: 21.33333vmin;
  }
  .documengtary_ranking_body_avatar{
    width: 13.06667vmin;
    height: 13.06667vmin;
    margin: 0 auto;
  }
  .documengtary_ranking_body_avatar img{
    width: 13.06667vmin;
    height: 13.06667vmin;
    border-radius: 50%;
  }
  .documengtary_ranking_body_username{
    margin-top: 1.06667vmin;
    font-size: 3.2vmin;
    height: 3.2vmin;
    color: #666;
    line-height: 1;
    font-weight: 400;
    text-align: center;
  }
  .documengtary_ranking_body_grade{
    height: 4vmin;
    background: #ff5f5f;
    color: #fff;
    border-radius: 4vmin;
    margin: 1.33333vmin 1.33333vmin 0;
    text-align: center;
    font-weight: 400;
    font-size: 3vmin;
    line-height: 1.3;
  }

  /* 彩帝推荐 */
  #documengtary_recommend_wrap{
    width: 100%;
    box-sizing: border-box;
  }
  /* title */
  #documengtary_recommend_title{
    width: 100%;
    padding-left: 2.6vmin;
    background-color: @color-background-white;
    border: 1px solid white;
    box-sizing: border-box;
  }
  #documengtary_recommend_title div{
    border-left: .8vmin solid #ff5f5f;
    padding-left: 1.6vmin;
    font-weight: bold;
    color: @color-text-black;
    margin-top: 4vmin;
    font-size: 4.26667vmin;
    margin-bottom: 1vmin;
  }
  /* body */
  .documengtary_recommend_body{
    width: 100%;
    box-sizing: border-box;
    padding: 4vmin 3.2vmin;
    background: #fff;
    margin-bottom: 2.66667vmin;
  }
  .documengtary_recommend_body_title{
    box-sizing: border-box;
  }
  .documengtary_recommend_body_title img{
    width: 13.06667vmin;
    height: 13.06667vmin;
    border-radius: 50%;
    margin-right: 2.13333vmin;
  }
  .documengtary_recommend_body_title span{
    display: inline-block;
    line-height: 1;
    padding: 1.86667vmin 0;
    vertical-align: top;
    text-align: left;
  }
  .documengtary_recommend_body_title strong{
    font-size: 4.26667vmin;
    vertical-align: middle;
    margin-bottom: 1.6vmin;
  }
  .user_userranking{
    color: #ff5f5f;
    font-size: 3.8vmin;
    margin-top: 1vmin;
  }
  .documengtary_recommend_body_title_time{
    padding: 1.86667vmin 0;
    font-size: 3.73333vmin;
    color: #999;
    font-weight: 400;
    vertical-align: middle;
    margin-top: 1vmin;
    float: right;
  }
  .documengtary_recommend_body_body{
    font-weight: 700;
    padding-left: 4.4vmin;
    display: block;
    margin-top: 3.33333vmin;
    font-size: 4vmin;
  }
  .documengtary_recommend_body_footer_wrap{
    box-sizing: border-box;
    width: 100%;
    margin-top: 5vmin;
    display: flex;
    justify-content: space-between;
  }
  .documengtary_recommend_body_footer_wrap div{
    width: 23%;
  }
  .documengtary_recommend_body_footer_wrap span{
    color: #999;
    display: block;
    line-height: 1;
    margin-bottom: 1.33333vmin;
    font-size: 3.73333vmin;
    text-align: center;
  }
  .documengtary_recommend_body_footer_wrap strong{
    display: inline-block;
    width: 100%;
    line-height: 1;
    font-weight: 400;
    text-align: center;
    font-size: 3.73333vmin;
  }
  .colorred{
    color: red;
  }
  .documengtary_recommend_body_footer_wrap p{
    height: 6vmin;
    border-left: .3vmin solid #EDEDED;
    margin-top: 1.5vmin;
  }





  /* 背景图 */
  #documengtary_bgimg{
    width: 100%;
    display: block;
    margin: 34.66667vmin 0 13.33333vmin;
  }
  /* 暂无彩帝数据 */
  #documengtary_no{
    width: 100%;
    text-align: center;
    font-size: 4.26667vmin;
    color: @color-text-black;
    margin-bottom: 5vmin;
  }
</style>
