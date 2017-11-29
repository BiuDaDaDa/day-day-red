<template>
  <!--邀请好友送红包-->
<div class="invitation_wrap">
  <!--头部-->
  <homeHeader :headerTitle="'邀请好友送红包'"></homeHeader>
  <img src="../../assets/tth-home/invitation1.png" />
  <img src="../../assets/tth-home/invitation2.png" />
  <img src="../../assets/tth-home/invitation3.png" />
  <!--我的邀请-->
  <div class="invitation_myInviter">
    <div class="invitation_myInviter_info">
      <span class="info_top">共奖励<strong>{{}}0</strong>元</span>
      <span class="info_down">我已累计邀请了<b>{{}}0</b>位好友</span>
    </div>
    <img src="../../assets/tth-home/invitation4.png" />
  </div>
  <!--邀请达人-->
  <div class="invitation_topUser">
    <ul>
      <li v-for="topUser in invitationArr">
        <span class="topUser_name">{{topUser.Name}}</span>
        <span class="topUser_getMoney">获得{{topUser.Money}}元</span>
      </li>
    </ul>
    <img src="../../assets/tth-home/invitation5.png" />
  </div>
  <img src="../../assets/tth-home/invitation6.png" />

</div>
</template>

<script>
  import homeHeader from '../tth-home/home-header.vue'
  export default {
    name: 'Invitation',
    data () {
      return {
        invitationArr: []
      }
    },
    components: {
      homeHeader
    },
    methods: {
      fecthInvitationData () {
        this.$request({
          type: 'get',
          url: '/api/hd/Handler.ashx?action=1106&params={}',
          success: function (res) {
            this.invitationArr = res.data.data
            console.log(res.data)
          },
          failed: function (err) {
            console.log('未找到邀请好友数据:' + err)
          }
        })
      }
    },
    mounted () {
      this.fecthInvitationData()
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";
  .invitation_wrap{
    width: 100%;
    img{
      display: block;
      width: 100%;
    }
    /*我的邀请*/
    .invitation_myInviter{
      width: 100%;
      position: relative;
      .invitation_myInviter_info{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        text-align: center;
        span{
          display: block;
          width: 100%;
          color: white;
        }
        .info_top{
          font-size: 5.6vmin;
          margin-bottom: 3.73333vmin;
          strong{
            font-size: 8vmin;
            color: #ffd302;
            font-weight: 400;
          }
        }
        .info_down{
          font-size: 4.8vmin;
          b{
            color: #ffd302;
            font-weight: 400;
          }
        }
      }
    }
    /*邀请达人*/
    .invitation_topUser{
      width: 100%;
      position: relative;
      img{
        width: 100%;
      }
      ul{
        position: absolute;
        top:0;
        left:50%;
        margin-left: -40vmin;
        width: 80vmin;
        color: #fff;
        height: 50.66667vmin;
        overflow: scroll;
        list-style: none;
        li{
          font-size: 3.73333vmin;
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1.6vmin;
        }
      }
    }
  }
</style>
