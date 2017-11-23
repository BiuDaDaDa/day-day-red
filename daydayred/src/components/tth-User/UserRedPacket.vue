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
      <div class="tabcon___3QxAV">
        <ul>
          <li class="overdue___1oV2n">
            <div class="imgcon___vSGK4"><b>余额</b><strong><em>￥</em><i>1</i></strong></div>
            <div class="redinfo___3Fh0A">
              <dl>
                <dd class="colorred___uFEKD">全场通用</dd>
                <dd class="secborder___3cZfU">金额：1.0元（可多次使用）</dd>
                <dd>新人注册红包</dd>
                <dd class="little___366o6">有效期至11-16 23:59:59</dd>
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
        if (index === 1) {
          index = 1103
          this.getRecordData(index)
        }
        if (index === 2) {
          index = 1102
          this.getRecordData(index)
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
            console.log(res)
            this.navArr[0].text = `可使用(${res.data.code})`
            this.navArr[1].text = `待派发(${res.data.code})`
            this.itemArr = res.data.data.Item
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

</style>
