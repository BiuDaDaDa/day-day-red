<template>
  <div id="week_wrap">
    <div id="week_title">
      <div id="week_title_title">一周红人</div>
      <div id="week_title_option">
        <div :class="selected1" @click="selectedClicked1">命中率</div>
        <div :class="selected2" @click="selectedClicked2">盈利率</div>
        <div :class="selected3" @click="selectedClicked3">连红</div>
      </div>
    </div>
    <div id="week_body">
      <div class="week_body_body" v-for="(god,index) in gods" @click="week_router(index)">
        <img class="week_body_body_avatar" :src="god.avatar">
        <div class="week_body_body_nick">{{(god.nick).split('',5).join('')}}</div>
        <div class="week_body_body_hitRate" v-show="num === 1">命中率: {{god.hitRate}}</div>
        <div class="week_body_body_profitRate" v-show="num === 2">盈利率: {{god.profitRate}}</div>
        <div class="week_body_body_hitRate" v-show="num === 3">连红: {{god.combo}}</div>
        <div class="redball" v-if="god.recommend > 0">{{god.recommend}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewDocumentaryrank',
    data () {
      return {
        selected1: 'selected',
        selected2: 'unselected',
        selected3: 'unselected',
        num: 1,
        gods: []
      }
    },
    methods: {
      rankData () {
        this.$request({
          type: 'get',
          url: `api/master/master/rank/${this.num}`,
          headers: {},
          params: {},
          success: function (res) {
            this.gods = res.data.data.gods
//            console.log(res.data.data.gods)
            for (let i = 0; i < this.gods.length; i++) {
              if (this.gods[i].avatar === '') {
                this.gods[i].avatar = '../../src/assets/tth-documentary/tth-user.png'
              }
            }
          },
          failed: function () {}
        })
      },
      selectedClicked1 () {
        this.selected1 = 'selected'
        this.selected2 = 'unselected'
        this.selected3 = 'unselected'
        this.num = 1
        this.kind = '命中率:'
      },
      selectedClicked2 () {
        this.selected1 = 'unselected'
        this.selected2 = 'selected'
        this.selected3 = 'unselected'
        this.num = 2
        this.kind = '盈利率:'
      },
      selectedClicked3 () {
        this.selected1 = 'unselected'
        this.selected2 = 'unselected'
        this.selected3 = 'selected'
        this.num = 3
        this.kind = '连红:'
      },
      week_router (index) {
        let uid = this.gods[index].uid
        this.$router.push('/particulars/' + uid)
      }
    },
    watch: {
      num () {
        this.rankData()
      }
    },
    mounted () {
      this.rankData()
    }
  }
</script>

<style scoped lang="less">
 #week_wrap{
   width: 100%;
   background: #fff;
   padding: 4vmin 3.2vmin;
   margin-bottom: 2.66667vmin;
   box-sizing: border-box;
 }
 #week_title{
   display: flex;
   justify-content: space-between;
   line-height: 1;
   height: 4.26667vmin;
   font-size: 4.26667vmin;
   border-left: .8vmin solid #ff5f5f;
   padding-left: 1.6vmin;
   margin-bottom: 4vmin;
 }
  #week_title_option{
    display: flex;
    justify-content: space-between;
    width: 45vmin;
  }
  #week_title_option div{
    height: 4.53333vmin;
    line-height: 4.53333vmin;
    color: #5c2101;
    font-size: 2.93333vmin;
    width: 13.33333vmin;
    text-align: center;
    margin-left: 1.06667vmin;
    border-radius: 1.06667vmin;
    font-weight: 900;
  }
  .selected{
    background-color: #FFB400;
  }
 .unselected{
   background-color: #ffd987;
 }
  #week_body{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
 .week_body_body{
   width: 25%;
   position: relative;
 }
  .week_body_body_avatar{
    width: 13vmin;
    height: 13vmin;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }
  .week_body_body_nick{
    width: 100%;
    text-align: center;
    margin-top: 1.06667vmin;
    font-size: 3.2vmin;
    height: 3.2vmin;
    color: #666;
    display: block;
    font-weight: 400;
  }
  .week_body_body_hitRate{
    background: #ff5f5f;
    color: #fff;
    margin: 1.33333vmin 1.33333vmin 0;
    text-align: center;
    width: 21.33333vmin;
    height: 4.26667vmin;
    line-height: 4.26667vmin;
    border-radius: 2.13333vmin;
    font-size: 2.13333vmin;
    box-sizing: border-box;
  }
 .week_body_body_profitRate{
   background: #ff5f5f;
   color: #fff;
   margin: 1.33333vmin 1.33333vmin 0;
   text-align: center;
   width: 21.33333vmin;
   height: 4.26667vmin;
   line-height: 4.26667vmin;
   border-radius: 2.13333vmin;
   font-size: 2.13333vmin;
   box-sizing: border-box;
 }
 .week_body_body_combo{
   background: #ff5f5f;
   color: #fff;
   margin: 1.33333vmin 1.33333vmin 0;
   text-align: center;
   width: 21.33333vmin;
   height: 4.26667vmin;
   line-height: 4.26667vmin;
   border-radius: 2.13333vmin;
   font-size: 2.13333vmin;
   box-sizing: border-box;
 }
 .redball{
   position: absolute;
   width: 4vmin;
   height: 4vmin;
   line-height: 4vmin;
   text-align: center;
   background: #ff5f5f;
   font-size: 3.2vmin;
   color: #fff;
   border-radius: 50%;
   display: block;
   top: -1vmin;
   right: 4.9vmin;
   font-weight: 400;
 }



</style>
