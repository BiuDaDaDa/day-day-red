<template>
  <div>
    <div class="user-record-body">
      <!--头部-->
      <div class="user-record-head">
        <i @click="goBackClick" class="iconfont icon-jiantou jiantou"></i>
        <span class="record-span">账户明细</span>
        <span @click="recentlyClickA" class="record-span-two">{{look}} <i class="iconfont icon-jiantou2 jiantou2"></i></span>
      </div>
      <!--购彩记录导航栏-->
      <ul class="navBar">
        <li :class="value.red" @click="navTabClick(index)" v-for="(value, index) in navArr" :key="index">{{value.text}}
          <span :class="value.className"></span>
        </li>
      </ul>
      <div v-show="item" v-if="itemArr.length === 0"  class="nodate___1lEuU">
        <div :class="animated">
          <img src="../../assets/tth-documentary/NoDate.png"/>
          <span>暂无数据</span>
        </div>
      </div>
      <div v-show="nodate" v-if="rechargeArr.length !== 0"  class="nodate___1lEuU">
        <div :class="animated">
           <div class="user-recharge" v-for="(value, index) in rechargeArr">
             <div class="recharge-body">
               <div class="float-left recharge-left">
                 <div class="float-left top">{{value.Name}}</div>
                 <br>
                 <div class="float-left time">{{value.Time}}</div>
               </div>
               <div class="float-right recharge-right">
                 <div class="float-right bottom">+{{value.Money}}</div>
                 <br>
                 <div class="float-right have">{{value.StatusDesc}}</div>
               </div>
             </div>
           </div>
          <div class="total">
            <span>合计：<b>充值 <b>{{total}}</b> </b></span>
          </div>
        </div>
      </div>
      <div v-else>
        <div  class="nodate___1lEuU">
          <div :class="animated">
            <img src="../../assets/tth-documentary/NoDate.png"/>
            <span>暂无数据</span>
          </div>
        </div>
      </div>
    </div>
    <DetailMask @itemClick="itemClick" :pass="maskisShow" @maskClicText="maskClicText" @maskClicked="maskClicked"></DetailMask>
  </div>
</template>
<script>
  import {getJsCookie} from '@/common/js/util'
  import DetailMask from '../tth-User/DetailMask'
  import {Indicator} from 'mint-ui'
  export default {
    name: 'UserDetail',
    components: {
      DetailMask
    },
    data () {
      return {
        navArr: [
          {className: 'nav-active', red: 'nav-red', text: '全部'},
          {className: '', red: '', text: '购彩'},
          {className: '', red: '', text: '充值'},
          {className: '', red: '', text: '提款'},
          {className: '', red: '', text: '派奖'},
          {className: '', red: '', text: '奖励'}
        ],
        cookie: '',
        index: null,
        itemArr: [],
        rechargeArr: [],
        animated: '',
        maskisShow: false,
        look: '最近一周',
        total: '',
        nodate: false,
        item: true
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
        if (index === 2) {
          this.nodate = true
          this.item = false
        } else {
          this.nodate = false
          this.item = true
        }
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
        let myUrl = `"TypeID":"${num}","DateID":"1","PageIndex":"1","UserIDGuid":"${this.cookie}","PageSize":"20"`
        let myOtherUrl = encodeURI(myUrl)
        this.$request({
          type: 'get',
          url: '/api/user/Handler.ashx?action=812&params={' + myOtherUrl + '}',
          success: function (res) {
            console.log(res)
            if (res.data.data.item.length === 0) {
              this.itemArr = res.data.data.item
            } else {
              this.rechargeArr = res.data.data.item
              console.log(this.rechargeArr)
              this.total = res.data.data.item[0].Balance + '.00'
            }
            Indicator.close()
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
      // 点击一周现实下拉菜单点自定义事件
      maskClicked (value) {
        this.maskisShow = value
      },
      // 子组件传过来的值
      maskClicText (value) {
        this.look = value
      },
      // 获取子组件接口的数据
      itemClick (value) {
        this.itemArr = value
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
    height: 15vmin;
    line-height: 15vmin;
    background-color: @color-text-red;
  }

  .record-span {
    margin-left: 28vmin;
    font-size: 5.5vmin;
    font-weight: 900;
    color: @color-background-white;
  }

  .record-span-two {
    float: right;
    margin-right: 3%;
    font-size: 3.4vmin;
    color: @color-background-white;
  }

  .jiantou {
    font-size: 4.5vmin;
    margin-left: 5%;
    color: @color-background-white;
    font-weight: 700;
  }
  .jiantou2{
    font-size: 3.5vmin;
    font-weight: 700;
  }

  .navBar {
    width: 100%;
    height: 10vmin;
    background-color: @color-background-white;
  }

  .navBar li {
    position: relative;
    font-size: 4vmin;
    display: inline-block;
    width: 16.6666%;
    color: #333;
    text-align: center;
    line-height: 10vmin;
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
  .nodate___1lEuU span{
    font-size: 5vmin;
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
  .user-recharge{
    height: 18vmin;
    background-color: @color-background-white;
    width: 100%;
    border-top: 0.1vmin solid #e6e6e6;
    border-bottom: 0.1vmin solid #e6e6e6;
  }
  .recharge-body{
    width: 90%;
    margin: 0 auto;
  }
  .recharge-left{

  }
  .top{
    line-height: 10vmin;
  }
  .bottom{
    line-height: 10vmin;
    font-size: 4.5vmin;
  }
  .have{
    color: @color-text-red;
  }
  .time{
    color: @color-text-gray;
  }
  .total{
    background-color: #F2F2F2;
    width: 100%;
    line-height: 8vmin;
    height: 8vmin;
  }
  .total span{
    color: #999999;
   margin-left: -64vmin;
    font-size: 3.5vmin;
  }
  .total span b{
    color: #66666A;
  }
  .total span b b{
    color: @color-text-red;
  }
  .recharge-left:nth-child(1){
    font-size: 4vmin;
  }
  .recharge-right:nth-child(2){
    font-size: 4vmin;
  }
  /*浮动左*/
  .float-left{
    float: left;
  }
  /*浮动右*/
  .float-right{
    float: right;
  }
  /*清除浮动必须加到父级元素上*/
  .clear_float::after{
    content: "";
    display: table;
    clear: both;
  }

</style>
