<template>
  <div>
    <div class="user-record-body">
      <!--头部-->
      <div class="user-record-head">
        <i @click="goBackClick" class="iconfont icon-jiantou jiantou"></i>
        <span class="record-span">购彩记录</span>
        <span @click="recentlyClickA" class="record-span-two">{{look}} <i class="iconfont icon-jiantou2"></i></span>
      </div>
      <!--购彩记录导航栏-->
      <ul class="navBar">
        <li :class="value.red" @click="navTabClick(index)" v-for="(value, index) in navArr" :key="index">{{value.text}}
          <span :class="value.className"></span>
        </li>
      </ul>
      <div v-if="itemArr.length === 0"  class="nodate___1lEuU">
        <div :class="animated">
          <img src="../../assets/tth-documentary/NoDate.png"/>
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <MyMask :pass="maskisShow" @maskClicText="maskClicText" @maskClicked="maskClicked"></MyMask>
  </div>
</template>
<script>
  import {getJsCookie} from '@/common/js/util'
  import MyMask from '../tth-User/Mask'
  export default {
    name: 'UserRecord',
    components: {
      MyMask
    },
    data () {
      return {
        navArr: [
          {className: 'nav-active', red: 'nav-red', text: '全部'},
          {className: '', red: '', text: '待出票'},
          {className: '', red: '', text: '待开奖'},
          {className: '', red: '', text: '已中奖'}
        ],
        cookie: '',
        index: null,
        itemArr: [],
        animated: '',
        maskisShow: false,
        look: '最近一周'
      }
    },
    methods: {
      // 点击返回上一页事件
      goBackClick () {
        this.$router.go(-1)
      },
      // 点击导航栏切换事件
      navTabClick (index) {
        this.index = index
        for (let i = 0; i < this.navArr.length; i++) {
          this.navArr[i].className = ''
          this.navArr[i].red = ''
          this.navArr[index].red = 'nav-red'
          this.navArr[index].className = 'nav-active'
        }
        if (this.animated === '') {
          this.animated = 'animated fadeInLeft'
        } else if (this.animated === 'animated fadeInLeft') {
          this.animated = 'animated fadeInRight'
        } else {
          this.animated = 'animated fadeInLeft'
        }
        this.getRecordData(index)
      },
      getRecordData (num) {
        this.cookie = getJsCookie('CP_UserIDGuid')
        let myUrl = `"SchemeState":"${num}","DateID":"1","tabselected":"${num}","PageIndex":"1","UserIDGuid":"${this.cookie}","PageSize":"20"`
        let myOtherUrl = encodeURI(myUrl)
        this.$request({
          type: 'get',
          url: '/api/user/Handler.ashx?action=803&params={' + myOtherUrl + '}',
          success: function (res) {
            this.itemArr = res.data.data.item
          },
          failed: function (err) {
            console.log(err)
          }
        })
      },
      // 点击最近一周点点击事件
      recentlyClickA () {
        this.maskisShow = true
      },
      maskClicked (value) {
        this.maskisShow = value
      },
      maskClicText (value) {
        this.look = value
      }
    },
    mounted () {
      this.getRecordData(0)
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  .user-record-body {
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
  }

  .user-record-head {
    width: 100%;
    height: 14vmin;
    line-height: 13vmin;
    background-color: @color-text-red;
  }

  .record-span {
    margin-left: 25%;
    font-size: 22px;
    font-weight: 900;
    color: @color-background-white;
  }

  .record-span-two {
    float: right;
    margin-right: 3%;
    font-size: 14px;
    color: @color-background-white;
  }

  .jiantou {
    margin-left: 5%;
    color: @color-background-white;
    font-weight: 700;
  }

  .navBar {
    width: 100%;
    height: 35px;
    background-color: @color-background-white;
  }

  .navBar li {
    position: relative;
    font-size: 4vmin;
    display: inline-block;
    width: 25%;
    color: #333;
    text-align: center;
    line-height: 35px;
  }

  .user-record-body ul .nav-red {
    color: #ff5f5f;
  }

  .nav-active {
    transition: all 1s;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .53333vmin;
    background-color: #ff5f5f;
  }
  .nodate___1lEuU{
    background: #f2f2f2;
    text-align: center;
  }
  .nodate___1lEuU img{
    width: 100%;
    display: block;
    margin: 34.66667vmin 0 13.33333vmin;
  }
  .animatedCss {
    position: absolute;
    left: 0;
    top: 20%;
  }

</style>
