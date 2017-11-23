<template>
  <!--大乐透&双色球:选球--> 
  <div class="selectMoreBall">
    <!--每个号码球-->
    <!--球外层-->
    <div class="ball_Wrap" v-for="(n,index) in numBallArr" :key="index" :class="{redBall:isRedColor, blueBall:!isRedColor}">
      <!--球:根据父级传的值判断渲染什么颜色-->
      <div class="numBall">
        <strong>{{n}}</strong>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Select9ball',
//    最大值 颜色
    props: ['maxNum', 'isRedColor'],
    data () {
      return {
        numBallArr: []
      }
    },
    methods: {
      // 球的数字数组
      changeNum () {
        for (let num = 1; num <= this.maxNum; num++) {
          if (num < 10) {
            num = '0' + num
          }
          this.numBallArr.push(num.toString())
        }
//        console.log(this.numBallArr)
      }
    },
    mounted () {
      this.changeNum()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .selectMoreBall{
    width: 100%;
    padding-left:1.6vmin;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    .ball_Wrap{
      width: 13.73333vmin;
      display: flex;
      align-items: center;
      justify-content: center;
      .numBall{
        width: 9.4vmin;
        height: 9.4vmin;
        border:.53333vmin solid @color-red;
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
    }
    .redBall{
      height:17.06667vmin;
      .numBall{
        border-color: @color-red;
        strong{
          color: @color-red;
        }
      }
    }
    .blueBall{
      height:13.73333vmin;
      .numBall{
        border-color: @color-blue;
        strong{
          color: @color-blue;
        }
      }
    }
  }
</style>
