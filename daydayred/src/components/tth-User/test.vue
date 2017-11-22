<template>
  <div class="am-tabs am-tabs-top tabs-fix">
    <div role="tablist" class="am-tabs-bar" tabindex="0">
      <div class="am-tabs-ink-bar am-tabs-ink-bar-animated"
           style="display: block; transform: translate3d(0px, 0px, 0px); width: 94px;"></div>
      <div role="tab" aria-disabled="false" aria-selected="true" class="am-tabs-tab-active am-tabs-tab">全部</div>
      <div role="tab" aria-disabled="false" aria-selected="false" class=" am-tabs-tab">待出票</div>
      <div role="tab" aria-disabled="false" aria-selected="false" class=" am-tabs-tab">待开奖</div>
      <div role="tab" aria-disabled="false" aria-selected="false" class=" am-tabs-tab">已中奖</div>
    </div>
    <div class="am-tabs-content am-tabs-content-animated" style="transform: translateX(0%) translateZ(100px);">
      <div role="tabpanel" aria-hidden="false" class="am-tabs-tabpane am-tabs-tabpane-active">
        <div class="tabcon___3QxAV">
          <div class="nodate___1lEuU"><img src="//common-1253410441.file.myqcloud.com/coverimg/20170622203327.png"
                                           alt="没有数据"><span>暂无数据</span></div>
        </div>
      </div>
      <div role="tabpanel" aria-hidden="true" class="am-tabs-tabpane am-tabs-tabpane-inactive"></div>
      <div role="tabpanel" aria-hidden="true" class="am-tabs-tabpane am-tabs-tabpane-inactive"></div>
      <div role="tabpanel" aria-hidden="true" class="am-tabs-tabpane am-tabs-tabpane-inactive"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: ''
  }
</script>

<style scoped lang="less">

</style>
