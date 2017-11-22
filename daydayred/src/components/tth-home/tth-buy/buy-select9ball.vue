<template>
  <!--排列3/福彩3d:选球-->
  <div class="Select9ball_wrap">
    <!--标签-->
    <div class="Select9ball_left">
      <span class="Select9balll_left_text">{{numText}}</span>
      <span class="Select9ball_left_jiantou"></span>
    </div>
    <!--号码选择-->
    <div class="Select9ball_right">
      <!--每个号码球-->
      <div v-for="(n,index) in numBallArr" :key="index">
        <div class="numBall" :class="{numBallActive:false}">
          <strong>{{n}}</strong>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Select9ball',
    props: ['numText'],
    data () {
      return {
        numBallArr: []
      }
    },
    methods: {
      // 球的数字数组
      changeNum () {
        for (let num = 0; num <= 9; num++) {
          this.numBallArr.push(num)
        }
      }
    },
    mounted () {
      this.changeNum()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .Select9ball_wrap {
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 2.66667vmin;
    padding-left: 3.2vmin;
    margin-bottom: 2.66667vmin;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    /*标签*/
    .Select9ball_left {
      display: flex;
      align-items: center;
      .Select9balll_left_text {
        width: 10.66667vmin;
        height: 4.8888vmin;
        color: @color-red;
        border-top: .26667vmin solid @color-red;
        border-left: .26667vmin solid @color-red;
        border-bottom: .26667vmin solid @color-red;
        font-size: 1.86667vmin;
        line-height: 1.5;
        text-align: center;
      }
      .Select9ball_left_jiantou {
        position: relative;
        left: -1.9vmin;
        width: 3.46667vmin;
        height: 3.46667vmin;
        border-bottom: .26667vmin solid @color-red;
        border-right: .26667vmin solid @color-red;
        transform: rotate(-45deg);
      }
    }
    /*号码*/
    .Select9ball_right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .numBall {
        margin: 1.5vmin;
        width: 9.4vmin;
        height: 9.4vmin;
        border: .53333vmin solid @color-red;
        border-radius: 50%;
        background-color: #f6f8f7;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        strong {
          font-size: 4.8vmin;
          font-weight: 700;
          color: @color-red;
        }
      }
      /*点击以后*/
      .numBallActive {
        background-color: @color-red;
        strong {
          color: white;
        }
      }
    }
  }
</style>
