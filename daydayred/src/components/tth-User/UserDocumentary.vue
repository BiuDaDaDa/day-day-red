<template>
  <div class="user-documentary-body">
    <!--我的跟单头部-->
    <div class="user-documentary-head">
      <i @click="goBackClick" class="iconfont icon-jiantou jiantou"></i>
      <span class="record-span">我的跟单</span>
    </div>
    <!--我的跟单导航栏-->
    <div class="navbar-body">
      <div :class="mydocumentary" @click="Documentary"><span>我的跟单</span></div>
      <div :class="myattention" @click="Attention"><span>我的关注</span></div>
    </div>
    <!--跟单和关注内容-->
    <div v-if="itemArr.length === 0" v-show="followed" class="nodate___1lEuU">
      <div :class="animated">
        <img src="../../assets/tth-documentary/NoDate.png"/>
        <span>暂无跟单记录</span>
        <button @click="followedClick">立即跟单赚钱</button>
      </div>
    </div>
    <!--点击关注内容-->
    <div v-if="plansArr.length === 0" v-show="betted" class="nodate___1lEuU">
      <div :class="animated">
        <img src="../../assets/tth-user/20170622201235.png">
        <span>还没关注彩帝</span>
        <button @click="bettedClick">立即关注</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getJsCookie} from '@/common/js/util'
  export default {
    name: 'UserDocumentary',
    data () {
      return {
        mydocumentary: 'my-documentary active',
        myattention: 'my-attention',
        animated: '',
        followed: true,
        betted: false,
        itemArr: [],
        plansArr: []
      }
    },
    methods: {
      // 点击返回上一页事件
      goBackClick () {
        this.$router.go(-1)
      },
      // 导航栏切换
      Documentary () {
        if (this.myattention === 'my-documentary active') {
          this.mydocumentary = 'my-documentary active'
          this.followed = true
          this.betted = false
          this.myattention = 'my-attention'
        }
        if (this.animated === '') {
          this.animated = 'animated fadeInLeft'
        } else if (this.animated === 'animated fadeInLeft') {
          this.animated = 'animated fadeInRight'
        } else {
          this.animated = 'animated fadeInLeft'
        }
      },
      // 点击关注
      Attention () {
        if (this.mydocumentary === 'my-documentary active') {
          this.myattention = 'my-documentary active'
          this.followed = false
          this.betted = true
          this.mydocumentary = 'my-attention'
        }
        if (this.animated === '') {
          this.animated = 'animated fadeInLeft'
        } else if (this.animated === 'animated fadeInLeft') {
          this.animated = 'animated fadeInRight'
        } else {
          this.animated = 'animated fadeInLeft'
        }
      },
      // 获取接口方法
      getRecordData (url) {
        this.$request({
          type: 'get',
          url: url,
          headers: {
            token: getJsCookie('CP_UserIDGuid')
          },
          success: function (res) {
            if (res.data.data.gods) {
              this.itemArr = res.data.data.gods
            }
            if (res.data.data.plans) {
              this.plansArr = res.data.data.plans
            }
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      // 点击立即跟单赚钱
      followedClick () {
        this.$router.push({path: '/documentary'})
      },
      // 点击立即关注
      bettedClick () {
        this.$router.push({path: '/rank'})
      }
    },
    mounted () {
      this.getRecordData('/api/master/master/followed')
      this.getRecordData('/api/master/master/plan/betted?page=1&pageSize=20')
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  .user-documentary-body {
    width: 100%;
    height: 100%;
  }

  .user-documentary-head {
    width: 100%;
    height: 14vmin;
    line-height: 14vmin;
    background-color: @color-text-red;
    display: flex;
  }

  .jiantou {
    font-size: 4.5vmin;
    margin-left: 5%;
    color: @color-background-white;
    font-weight: 700;
  }

  .user-documentary-head span {
    margin-left: 28vmin;
    font-size: 5.5vmin;
    font-weight: 900;
    color: @color-background-white;
  }

  .navbar-body {
    width: 100%;
    height: 12vmin;
    background-color: @color-background-white;
    display: flex;
  }
  .my-documentary {
    width: 28%;
    line-height: 12vmin;
    text-align: center;
    margin-left: 15%;
    color: #333;
    font-size: 4.5vmin;
  }

  .active {
    color: @color-text-red;
    border-bottom: 3px solid @color-text-red;
  }

  .my-attention {
    font-size: 4.5vmin;
    color: #333;
    width: 28%;
    line-height: 12vmin;
    text-align: center;
    margin-left: 15%;
  }
  .nodate___1lEuU{
    background: #f2f2f2;
    text-align: center;
  }
  .nodate___1lEuU span{
    color: #333333;
    font-size: 4.5vmin;
  }
  .nodate___1lEuU  button{
    margin: 15px auto;
    display: block;
    font-size: 4.8vmin;
    width: 36.53333vmin;
    border-radius: .53333vmin;
    height: 10.33333vmin;
    color: #666;
    box-sizing: border-box;
    line-height: 9.33333vmin;
    background: #fff;
    border: 1px solid #d2d2d2;
  }
  .nodate___1lEuU img{
    width: 100%;
    display: block;
    margin: 34.66667vmin 0 13.33333vmin;
  }

</style>
