<template>
<div id="documentary_rank_wrap">
  <router-link to="/documentary">
  <div id="documentary_rank_title">
    <i class="iconfont icon-jiantou"></i>
    彩帝排行
  </div>
  </router-link>
  <div id="documentary_rank_body_wrap">
    <div class="documentary_rank_body" v-for="(god,index,key) in gods">
      <div class="gods_rank">{{god.rank}}</div>
      <img class="gods_avatar" :src="god.avatar">
      <div class="gods_userinfo">
        <div class="gods_name">{{god.nick}}</div>
        <b>命中率:<span>{{god.hitRate}}</span></b>
        <b>盈利率:<span>{{god.profitRate}}</span></b>
      </div>
      <div class="gods_combo">
        <span>{{god.combo}}</span>连红
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'Rank',
    data () {
      return {
        gods: []
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
            console.log(res.data.data.gods[2].avatar)
            this.gods = res.data.data.gods
            for (let i = 0; i < res.data.data.gods.length; i++) {
              if (res.data.data.gods[i].avatar === '') {
                res.data.data.gods[i].avatar = '../../src/assets/tth-documentary/tth-user.png'
              }
            }
          },
          failed: function () {}
        })
      }
    },
    mounted () {
      this.rankingData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  #documentary_rank_title{
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
  #documentary_rank_body_wrap{
    box-sizing: border-box;
    width: 100%;
    background-color: @color-background-white;
    padding: 0 3.2vmin;
  }
  .documentary_rank_body{
    padding: 4vmin 0;
    border-bottom: 1px solid #e6e6e6;
    height: 21.86667vmin;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 1.33333vmin;
    display: flex;
    justify-content: space-between;
  }
  .gods_rank{
    width: 6.4vmin;
    font-size: 4.26667vmin;
    color: #ff5f5f;
    vertical-align: middle;
    margin-right: 1.33333vmin;
    line-height: 13.86667vmin;
    text-align: center;
  }
  .documentary_rank_body img{
    width: 13.06667vmin;
    height: 13.06667vmin;
    border-radius: 50%;
    float: left;
    margin-right: 2.66667vmin;
    vertical-align: middle;
  }
  .gods_combo{
    line-height: 13.86667vmin;
    font-style: normal;
    font-weight: 400;
    color: #999;
    font-size: 3.46667vmin;
  }
  .gods_combo span{
    font-size: 6.4vmin;
    color: #ff5f5f;
  }
  .gods_userinfo{
    box-sizing: border-box;
    width: 55vmin;
    height: 13.06667vmin;
  }
  .gods_name{
    font-size: 4.26667vmin;
    margin: 1.6vmin 0 1.33333vmin;
    font-style: normal;
    font-weight: 400;
  }
  .gods_userinfo b{
    font-style: normal;
    font-weight: 400;
    font-size: 3.3vmin;
    color: #66666B;
    margin-right: 1vmin;
  }
  .gods_userinfo span{
    color: #FF4B6B;
    margin-left: 2vmin;
    font-weight: 900;
  }



</style>
