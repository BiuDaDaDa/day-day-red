<template>
  <div>
    <div class="user-record-body">
      <!--头部-->
      <div class="user-record-head">
        <i @click="goBackClick" class="iconfont icon-jiantou jiantou"></i>
        <span class="record-span">我的红包</span>
      </div>
      <!--购彩记录导航栏-->
      <ul class="navBar">
        <li :class="value.red" @click="navTabClick(index)" v-for="(value, index) in navArr" :key="index">{{value.text}}
          <span :class="value.className"></span>
        </li>
      </ul>
      <div v-if="itemArr.length === 0" class="nodate___1lEuU">
        <div :class="animated">
          <img src="../../assets/tth-documentary/NoDate.png"/>
          <span>暂无数据</span>
        </div>
      </div>
      <div v-else="" class="tabcon">
        <ul>
          <li>
            <div class="imgcon">
              <b>余额</b>
              <em>￥</em>
              <strong>
              <span>{{itemArr[0].Money}}</span>
              </strong>
            </div>
            <div class="redinfo">
              <dl>
                <dd class="colorred">{{itemArr[0].LimitLottery}}</dd>
                <dd class="secborder">{{itemArr[0].LimitMoneyMsg}}</dd>
                <dd>{{itemArr[0].Name}}</dd>
                <dd class="little">{{itemArr[0].EndTime}}</dd>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {getJsCookie} from '@/common/js/util'
  import {Indicator} from 'mint-ui'
  export default {
    name: 'UserRedPacket',
    data () {
      return {
        navArr: [
          {className: 'nav-active', red: 'nav-red', text: '可使用'},
          {className: '', red: '', text: '待派发'},
          {className: '', red: '', text: '过期/用完'}
        ],
        cookie: '',
        index: null,
        itemArr: [],
        animated: ''
      }
    },
    methods: {
      // 点击返回上一页事件
      goBackClick () {
        this.$router.go(-1)
      },
      // 点击导航栏切换事件
      navTabClick (index) {
        Indicator.open('加载中...')
        this.index = index
        for (let i = 0; i < this.navArr.length; i++) {
          this.navArr[i].className = ''
          this.navArr[i].red = ''
          this.navArr[index].red = 'nav-red'
          this.navArr[index].className = 'nav-active'
        }
        if (index === 0) {
          index = 1101
          this.getRecordData(index)
        }
        if (index === 1) {
          index = 1103
          this.getRecordData(index)
        }
        if (index === 2) {
          index = 1102
          this.getRecordData(index)
          return false
        }
        if (this.itemArr.length !== 0) {
          return false
        }
        if (this.animated === '') {
          this.animated = 'animated fadeInLeft'
        } else if (this.animated === 'animated fadeInLeft') {
          this.animated = 'animated fadeInRight'
        } else {
          this.animated = 'animated fadeInLeft'
        }
      },
      getRecordData (num) {
        this.cookie = getJsCookie('CP_UserIDGuid')
        let myUrl = `"UserCode":"${this.cookie}"`
        let myOtherUrl = encodeURI(myUrl)
        this.$request({
          type: 'get',
          url: '/api/hd/Handler.ashx?action=' + num + '&params={' + myOtherUrl + '}',
          success: function (res) {
            this.navArr[0].text = `可使用(${res.data.code})`
            this.navArr[1].text = `待派发(${res.data.code})`
            this.itemArr = res.data.data.Item
            Indicator.close()
          },
          failed: function (err) {
            console.log(err)
          }
        })
      }
    },
    mounted () {
      this.getRecordData(1101)
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
    width: 33.3333%;
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

  .nodate___1lEuU {
    background: #f2f2f2;
    text-align: center;
  }

  .nodate___1lEuU img {
    width: 100%;
    display: block;
    margin: 34.66667vmin 0 13.33333vmin;
  }

  .animatedCss {
    position: absolute;
    left: 0;
    top: 20%;
  }
  .tabcon{
    box-sizing: border-box;
    width: 100%;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
  }
  .tabcon ul {
    margin: 2.13333vmin auto;
    width: 94%;
    background-color: @color-background-white;
  }
  .tabcon ul li {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 35.33333vmin;
    background: #fff;
    position: relative;
    margin-top: 2.66667vmin;
  }
  .imgcon{
    background-color: #d8d8d8;
    width: 24.26667vmin;
    height: 100%;
    color: @color-background-white;
  }
  .imgcon b{
    display: block;
    line-height: 1;
    font-size: 3.73333vmin;
    margin:6.66667vmin 2.4vmin 2.4vmin;
  }
  .imgcon em {
    letter-spacing:-5px;
    margin-left: 2.5vmin;
    font-style: normal;
    font-weight: 400;
    font-size: 3.46667vmin;
  }
  .imgcon strong{
    line-height: 1;
    font-size: 6.4vmin;
  }
  .imgcon span {
    font-style: normal;
    font-weight: 400;
  }
  .redinfo {
    font-size: 4.26667vmin;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding-top: 3.73333vmin;
  }
  .redinfo dl{
    position: relative;
    padding: 0 4vmin;
  }
  .tabcon ul li .redinfo dl .colorred{
    color: #999;
    font-size: 4.26667vmin;
  }
  .redinfo dd:before {
    content: " ";
    width: 1.33333vmin;
    height: 1.33333vmin;
    border-radius: 50%;
    background: #e6e6e6;
    display: inline-block;
    vertical-align: middle;
    margin-right: 1.33333vmin;
  }
  .redinfo dd:nth-child(1):before {
    background: #999;
  }
  .redinfo dd:nth-child(2):before {
    background: #999;
  }
  .secborder{
    color: #999;
    font-size: 4.26667vmin;
  }
  .tabcon ul li .redinfo dd.secborder {
    border-bottom: 1px dotted #e6e6e6;
    padding-bottom: 2.4vmin;
  }
  .tabcon ul li .redinfo dd {
    position: relative;
    color: #999;
    font-size: 3.46667vmin;
    margin-bottom: 2.66667vmin;
    line-height: 1;
  }
  .tabcon ul li dl:after {
    position: absolute;
    content: " ";
    width: 18.66667vmin;
    height: 12.66667vmin;
    background: url('../../assets/tth-user/20170608100256.png') transparent no-repeat 50%;
    background-size: cover;
    right: 2.66667vmin;
    top: -2.4vmin;
  }
</style>
