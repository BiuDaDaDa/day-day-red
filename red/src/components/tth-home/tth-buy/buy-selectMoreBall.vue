<template>
  <!--大乐透&双色球:选球--> 
  <div class="selectMoreBall">
    <!--每个号码球-->
    <!--球外层-->
    <div class="ball_Wrap" v-for="(n,index) in numBallArr" :key="index"
         :class="{redBall:isRedColor, blueBall:!isRedColor}">
      <!--球:根据父级传的值判断渲染什么颜色-->
      <div ref="ball" class="numBall" @click="selectBall(index)">
        <strong ref="ballText">{{n}}</strong>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Select9ball',
    // 最大值 颜色
    props: ['maxNum', 'isRedColor', 'numText', 'clearAll', 'randomNums', 'randomTimes'],
    data () {
      return {
        numBallArr: [],
        selectNum: '',
        selectArr: []
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
      },
      // 选中球
      selectBall (index) {
        // 选择不为被选中状态的球
        if (this.selectArr.indexOf(index) === -1) {
          // 选中的样式变化
          if (this.isRedColor) {
            this.$refs.ball[index].style.backgroundColor = '#ff5f5f'
            this.$refs.ballText[index].style.color = 'white'
          } else {
            this.$refs.ball[index].style.backgroundColor = '#6b8dff'
            this.$refs.ballText[index].style.color = 'white'
          }
          // 值放入数组
          this.selectArr.push(index)
        } else {
          // 已经在数组中的值样式变回原来样式
          if (this.isRedColor) {
            this.$refs.ball[index].style.backgroundColor = '#f6f8f7'
            this.$refs.ballText[index].style.color = '#ff5f5f'
          } else {
            this.$refs.ball[index].style.backgroundColor = '#f6f8f7'
            this.$refs.ballText[index].style.color = '#6b8dff'
          }
          // 删除
          let numIndex = this.selectArr.indexOf(index)
          this.selectArr.splice(numIndex, 1)
        }
//        console.log(this.selectArr)
        this.$emit('returnNum', this.selectArr)
      },
      clearBall () {
        if (this.isRedColor) {
          for (let i = 0; i < this.numBallArr.length; i++) {
            this.$refs.ball[i].style.backgroundColor = '#f6f8f7'
            this.$refs.ballText[i].style.color = '#ff5f5f'
          }
        } else {
          for (let i = 0; i < this.numBallArr.length; i++) {
            this.$refs.ball[i].style.backgroundColor = '#f6f8f7'
            this.$refs.ballText[i].style.color = '#6b8dff'
          }
        }
        this.selectArr = []
//        console.log(this.selectArr)
      },
      randomSelect () {
        this.selectArr = []
        // 清样式
        this.clearBall()
        // 循环随机一个下标
        if (this.isRedColor) {
          let randomRedArr = []
//          console.log('红色随机次数:' + this.randomTimes)
          for (let i = 0; i < this.randomTimes; i++) {
            let numIndex = Math.floor(Math.random() * (this.maxNum))
//            console.log('红色:随机数' + numIndex)
            // 如果数不重复
            if (randomRedArr.indexOf(numIndex) === -1) {
              randomRedArr.push(numIndex)
              this.$refs.ball[numIndex].style.backgroundColor = '#ff5f5f'
              this.$refs.ballText[numIndex].style.color = 'white'
              this.selectArr.push(numIndex)
            } else {
              i--
            }
          }
        } else {
          let randomBlueArr = []
          for (let i = 0; i < 7 - this.randomTimes; i++) {
            let numIndex = Math.floor(Math.random() * (this.maxNum))
//            console.log(numIndex)
            // 如果数不重复
            if (randomBlueArr.indexOf(numIndex) === -1) {
              randomBlueArr.push(numIndex)
              this.$refs.ball[numIndex].style.backgroundColor = '#6b8dff'
              this.$refs.ballText[numIndex].style.color = 'white'
              this.selectArr.push(numIndex)
            } else {
              i--
            }
          }
        }
        this.$emit('returnNum', this.selectArr)
      }
    },
    mounted () {
      this.changeNum()
    },
    watch: {
      clearAll: function () {
        this.clearBall()
      },
      randomNums: function () {
        this.randomSelect()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../common/css/style.less";

  .selectMoreBall {
    /*width: 100%;*/
    padding-left: 1.6vmin;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
    .ball_Wrap {
      width: 13.73333vmin;
      display: flex;
      align-items: center;
      justify-content: center;
      .numBall {
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
    }
    .redBall {
      height: 17.06667vmin;
      .numBall {
        border-color: @color-red;
        strong {
          color: @color-red;
        }
      }
    }
    .blueBall {
      height: 13.73333vmin;
      .numBall {
        border-color: @color-blue;
        strong {
          color: @color-blue;
        }
      }
    }
  }
</style>
