<template>
  <!--footer最父级-->
  <div id="footer_wrap">
    <!--路由跳转   footer_body: v-for生成的每一页,一共五页-->
    <router-link :to='foot.to' class="footer_body" v-for="foot in footers" :key="foot.id">
      <!--生成一个div,设置一个背景图-->
      <div class="footer_body_img" :style="{backgroundImage:'url('+ foot.url +')'}">
        <!--在生成的div中添加图片,默认透明度为0,改变后透明度为1显示-->
        <img  class="footer_body_img_img" :src="foot.src">
      </div>
      <!--每一页的文字描述-->
      <div class="footer_body_text">{{foot.name}}</div>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
//        生成一个数组用于v-for使用
        footers: [
          {
//            name: 每一页的描述
            name: '首页',
//            url: 背景图片地址
            url: '../../src/assets/tth-footer/home_gray.png',
//            src: 图片地址
            src: '../../src/assets/tth-footer/home_red.png',
//            to: 路由跳转地址
            to: '/home',
//            id: 让在v-for数组中绑定一个id,我也不知道干嘛用,不绑定就报警告
            id: 'one'
          },
          {
            name: '开奖',
            url: '../../src/assets/tth-footer/runlottery_gray.png',
            src: '../../src/assets/tth-footer/runlottery_red.png',
            to: '/runlottery',
            id: 'one'
          },
          {
            name: '跟单',
            url: '../../src/assets/tth-footer/documentary_gray.png',
            src: '../../src/assets/tth-footer/documentary_red.png',
            to: '/documentary',
            id: 'one'
          },
          {
            name: '比分',
            url: '../../src/assets/tth-footer/score_gary.png',
            src: '../../src/assets/tth-footer/score_red.png',
            to: '/score',
            id: 'one'
          },
          {
            name: '我的',
            url: '../../src/assets/tth-footer/user_gray.png',
            src: '../../src/assets/tth-footer/user_red.png',
            to: '/user',
            id: 'one'
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
        console.log(index)
        document.cookie = 'index' + '=' + index
        this.$router.push(this.footers[index].to)
        this.$refs.clo[index].style.color = 'red'
        this.$refs.opc[index].style.opacity = 1
      }
    },
    mounted () {
      this.$refs.clo[4].style.color = 'red'
      this.$refs.opc[4].style.opacity = 1
    }
  }
</script>

<style scoped lang="less">
  @import "../../src/common/css/style.less";
  /*默认样式*/
  #footer_wrap{
    width: 100%;
    position: fixed;
    z-index: 999;
    bottom: 0;
    background-color: white;
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
    margin-top: 1.5vmin;
  }
  .footer_body_img_img{
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  /*路由自动绑定选择样式*/
  .router-link-active img{
    /*改变图片透明度*/
    opacity: 1;
  }
  .router-link-active .footer_body_text{
    /*改变字体颜色*/
    color: red;
  }
</style>
