<template>
  <div id="score-wrap">
    <div id="score-title-wrap">
      <div id="score-title-body">
        <div :class="this.whiteBall" @click="football">足球</div>
        <div :class="this.redBall" @click="basketball">篮球</div>
      </div>
    </div>
    <score-footer></score-footer>
  </div>
</template>

<script>
  import ScoreFooter from '../../components/tth-score/Footer.vue'
  export default {
    name: 'Score',
    components: {
      ScoreFooter
    },
    data () {
      return {
        whiteBall: 'score-title-body-whiteball',
        redBall: 'score-title-body-redball'
      }
    },
    methods: {
      Data () {
        this.$request({
          type: 'get',
          url: '',
          headers: {},
          params: {},
          success: function () {},
          failed: function () {}
        })
      },
      football () {
        this.whiteBall = 'score-title-body-whiteball'
        this.redBall = 'score-title-body-redball'
      },
      basketball () {
        this.whiteBall = 'score-title-body-redball'
        this.redBall = 'score-title-body-whiteball'
      }
    },
    mounted () {
      this.Data()
    }
  }
</script>

<style scoped lang="less">
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


</style>
