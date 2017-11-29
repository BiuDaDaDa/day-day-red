<template>
  <!--活动-->
<div class="activities_wrap">
  <!--标题-->
  <homeHeader :headerTitle="'活动中心'"></homeHeader>
  <!--活动-->
  <div class="activities_content">
    <div class="activities_content_info" v-for="(activityInfo,index) in activitiesArr" :key="index" @click="toActivitiesPage(activityInfo.id)">
      <!--大图-->
      <img class="activities_content_info_img" :src=" activityInfo.cover" alt="">
      <!--活动状况-->
      <div class="activities_content_info_expired">
        <strong>已结束</strong>
      </div>
    </div>
  </div>
</div>
</template>

<script>
 import homeHeader from '../tth-home/home-header.vue'
 export default {
   name: 'Activities',
   components: {
     homeHeader
   },
   data () {
     return {
       activitiesArr: []
     }
   },
   methods: {
     fecthActivitiesData () {
       this.$request({
         type: 'get',
         url: '/api/news/activity',
         success: function (res) {
           this.activitiesArr = res.data.data.newses
//           console.log()
         },
         failed: function (err) {
           console.log('未找到活动数据:' + err)
         }
       })
     },
     toActivitiesPage (index) {
       if (index === 59) {
         this.$router.push({ path: '/invitation' })
       } else if (index === 58) {
         this.$router.push({ path: '/recharge' })
       }
     }
   },
   mounted () {
     this.fecthActivitiesData()
   }
 }
</script>

<style scoped lang="less">
  @import "../../common/css/style.less";

  .activities_wrap{
    width: 100%;
    height: 736px;
    margin: 0 auto 0 0;
    background-color: @color-background-gray;
    /*头部*/
    .activities_nameBar{
      width: 100%;
      height: 12vmin;
      color: @color-background-white;
      background-color: @color-red;
      display: flex;
      align-items: center;
      position: relative;
      /*justify-content: center;*/
      h3{
        margin: 0 auto;
        font-size: 1.5em;
        display: inline-block;
        font-weight: bold;
      }
      .activities_nameBar_back{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 126px;
        display: flex;
        align-items: center;
        padding-left: 5vmin;
        .icon-jiantou{
          font-size: 3.8vmin;
        }
      }
    }
    /*活动内容*/
    .activities_content{
      box-sizing: border-box;
      width: 100%;
      background-color: #FFFFFF;
      padding: 2.66667vmin;
      /*每个活动*/
      .activities_content_info{
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: .8vmin;
        margin-top:2.66667vmin ;
        width: 100%;
        /*大图*/
        .activities_content_info_img{
          width: 100%;
          filter: grayscale(100%);
        }
        /*小图*/
        .activities_content_info_expired{
          width: 11.6vmin;
          height: 8vmin;
          position: absolute;
          top: 0;
          right: 1.33333vmin;
          background-image: url("../../assets/tth-home/tagbackground.png");
          background-size: cover;
          display: flex;
          justify-content: center;
          strong{
            display: inline-block;
            margin: 15% auto ;
            color: white;
            font-size: 3.2vmin;
            font-weight: 400;
            font-style: italic;
          }
        }
      }
    }
  }
  </style>
