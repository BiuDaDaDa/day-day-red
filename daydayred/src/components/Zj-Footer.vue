<template>
  <div id="footer_wrap">
    <div class="footer_body" @click="home">
      <div class="footer_body_img" id="img_one">
        <img class="footer_body_img_img" src="../../src/assets/tth-footer/home_red.png" :style="home_opacity">
      </div>
      <div class="footer_body_text" :style="home_color">首页</div>
    </div>
    <div class="footer_body" @click="runlottery">
      <div class="footer_body_img" id="img_two">
        <img class="footer_body_img_img" src="../../src/assets/tth-footer/runlottery_red.png" :style="runlottery_opacity">
      </div>
      <div class="footer_body_text" :style="runlottery_color">开奖</div>
    </div>
    <div class="footer_body" @click="documentary">
      <div class="footer_body_img" id="img_three">
        <img class="footer_body_img_img" src="../../src/assets/tth-footer/documentary_red.png" :style="documentary_opacity">
      </div>
      <div class="footer_body_text" :style="documentary_color">跟单</div>
    </div>
    <div class="footer_body" @click="score">
      <div class="footer_body_img" id="img_four">
        <img class="footer_body_img_img" src="../../src/assets/tth-footer/score_red.png" :style="score_opacity">
      </div>
      <div class="footer_body_text" :style="score_color">比分</div>
    </div>
    <div class="footer_body" @click="user">
      <div class="footer_body_img" id="img_five">
        <img class="footer_body_img_img" src="../../src/assets/tth-footer/user_red.png" :style="user_opacity">
      </div>
      <div class="footer_body_text" :style="user_color">我的</div>
    </div>
  </div>
</template>

<script>
  import MtTabbar from '../../node_modules/mint-ui/packages/tabbar/src/tabbar.vue'
  import MtTabItem from '../../node_modules/mint-ui/packages/tab-item/src/tab-item.vue'

  export default {
    components: {
      MtTabItem,
      MtTabbar
    },
    name: '',
    data () {
      return {
        home_color: {
          color: 'red'
        },
        runlottery_color: {
          color: '#9D9D9D'
        },
        documentary_color: {
          color: '#9D9D9D'
        },
        score_color: {
          color: '#9D9D9D'
        },
        user_color: {
          color: '#9D9D9D'
        },
        home_opacity: {
          opacity: 1
        },
        runlottery_opacity: {
          opacity: 0
        },
        score_opacity: {
          opacity: 0
        },
        documentary_opacity: {
          opacity: 0
        },
        user_opacity: {
          opacity: 0
        }
      }
    },
    methods: {
      home () {
        this.home_color.color = 'red'
        this.runlottery_color.color = '#9D9D9D'
        this.documentary_color.color = '#9D9D9D'
        this.score_color.color = '#9D9D9D'
        this.user_color.color = '#9D9D9D'
        this.home_opacity.opacity = 1
        this.runlottery_opacity.opacity = 0
        this.score_opacity.opacity = 0
        this.documentary_opacity.opacity = 0
        this.user_opacity.opacity = 0
      },
      runlottery () {
        this.home_color.color = '#9D9D9D'
        this.runlottery_color.color = 'red'
        this.documentary_color.color = '#9D9D9D'
        this.score_color.color = '#9D9D9D'
        this.user_color.color = '#9D9D9D'
        this.home_opacity.opacity = 0
        this.runlottery_opacity.opacity = 1
        this.score_opacity.opacity = 0
        this.documentary_opacity.opacity = 0
        this.user_opacity.opacity = 0
      },
      documentary () {
        this.home_color.color = '#9D9D9D'
        this.runlottery_color.color = '#9D9D9D'
        this.documentary_color.color = 'red'
        this.score_color.color = '#9D9D9D'
        this.user_color.color = '#9D9D9D'
        this.home_opacity.opacity = 0
        this.runlottery_opacity.opacity = 0
        this.documentary_opacity.opacity = 1
        this.score_opacity.opacity = 0
        this.user_opacity.opacity = 0
      },
      score () {
        this.home_color.color = '#9D9D9D'
        this.runlottery_color.color = '#9D9D9D'
        this.documentary_color.color = '#9D9D9D'
        this.score_color.color = 'red'
        this.user_color.color = '#9D9D9D'
        this.home_opacity.opacity = 0
        this.runlottery_opacity.opacity = 0
        this.documentary_opacity.opacity = 0
        this.score_opacity.opacity = 1
        this.user_opacity.opacity = 0
      },
      user () {
        this.home_color.color = '#9D9D9D'
        this.runlottery_color.color = '#9D9D9D'
        this.documentary_color.color = '#9D9D9D'
        this.score_color.color = '#9D9D9D'
        this.user_color.color = 'red'
        this.home_opacity.opacity = 0
        this.runlottery_opacity.opacity = 0
        this.documentary_opacity.opacity = 0
        this.score_opacity.opacity = 0
        this.user_opacity.opacity = 1
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../common/css/style.less";
  #footer_wrap{
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: @color-background-white;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 13.33333vmin;
    border-top: 1px solid #eee;
  }
  .footer_body{
    width: 39vmin;
  }
  .footer_body_text{
    width: 100%;
    text-align: center;
    /*color: #9D9D9D;*/
    font-size: 3.5vmin;
    margin: 1.06667vmin 0 0;
  }
  .footer_body_img{
    /*border: 1px solid blue;*/
    box-sizing: border-box;
    width: 5.86667vmin;
    height: 5.86667vmin;
    margin: 0 auto;
    background-size: 100% 100%;
    margin-top: 1vmin;
  }
  .footer_body_img_img{
    width: 100%;
    height: 100%;
  }
  #img_one{
    background-image: url("../../src/assets/tth-footer/home_gray.png");
  }
  #img_two{
    background-image: url("../../src/assets/tth-footer/runlottery_gray.png");
  }
  #img_three{
    background-image: url("../../src/assets/tth-footer/documentart_gray.png");
  }
  #img_four{
    background-image: url("../../src/assets/tth-footer/score_gary.png");
  }
  #img_five{
    background-image: url("../../src/assets/tth-footer/user_gray.png");
  }


</style>
