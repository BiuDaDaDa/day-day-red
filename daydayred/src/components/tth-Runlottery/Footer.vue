<template>
  <div id="footer_wrap">
      <div class="footer_body" v-for="(foot,index,key) in footers" @click="clicked(index)">
        <div class="footer_body_img" :style="{backgroundImage:'url('+ foot.url +')'}">
          <img ref="opc" class="footer_body_img_img" :src="foot.src">
        </div>
        <div ref="clo" class="footer_body_text">{{foot.name}}</div>
      </div>
  </div>
</template>

<script>
  import MtTabbar from '../../../node_modules/mint-ui/packages/tabbar/src/tabbar.vue'
  import MtTabItem from '../../../node_modules/mint-ui/packages/tab-item/src/tab-item.vue'

  export default {
    components: {
      MtTabItem,
      MtTabbar
    },
    name: '',
    data () {
      return {
        footers: [
          {
            name: '首页',
            url: '../../src/assets/tth-footer/home_gray.png',
            src: '../../src/assets/tth-footer/home_red.png',
            to: '/home'
          },
          {
            name: '开奖',
            url: '../../src/assets/tth-footer/runlottery_gray.png',
            src: '../../src/assets/tth-footer/runlottery_red.png',
            to: '/runlottery'
          },
          {
            name: '跟单',
            url: '../../src/assets/tth-footer/documentary_gray.png',
            src: '../../src/assets/tth-footer/documentary_red.png',
            to: '/documentary'
          },
          {
            name: '比分',
            url: '../../src/assets/tth-footer/score_gary.png',
            src: '../../src/assets/tth-footer/score_red.png',
            to: '/home'
          },
          {
            name: '我的',
            url: '../../src/assets/tth-footer/user_gray.png',
            src: '../../src/assets/tth-footer/user_red.png',
            to: '/user'
          }
        ]
      }
    },
    methods: {
      clicked (index) {
        for (let i in this.footers) {
          this.$refs.clo[i].style.color = '#B8B8B8'
          this.$refs.opc[i].style.opacity = 0
        }
        this.$router.push(this.footers[index].to)
      }
    },
    mounted () {
      this.$refs.clo[1].style.color = 'red'
      this.$refs.opc[1].style.opacity = 1
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  #footer_wrap{
    width: 100%;
    position: fixed;
    z-index: 1000;
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
    font-size: 3.5vmin;
    margin: 1.06667vmin 0 0;
    color: #B8B8B8;
  }
  .footer_body_img{
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
    opacity: 0;
  }


</style>
