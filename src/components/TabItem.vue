<template>
  <div style="height: -webkit-calc(100% - 5px);">
    <div class="content-block  tab-myleave">
      <div class="buttons-row">
        <a href="#tab1" :class="['tab-link button',currentIndex === 0 ? 'active' : '']" @click="clickTab(0)"><i class="WeStar_iconfont">&#xe626;</i>{{$t('approval-pending')}}</a>
        <a href="#tab2" :class="['tab-link button',currentIndex === 1 ? 'active' : '']" @click="clickTab(1)"><i class="WeStar_iconfont">&#xe601;</i>{{$t('approval-end')}}</a>
      </div>
    </div>
    <div class="tabs-animated-wrap tab-content">
      <div :class="['tabs','default'+currentIndex]">
        <div id="tab1" class="tab tab-overflow-auto">
          <slot name="tab1"></slot>
        </div>
        <div id="tab2" class="tab tab-overflow-auto">
          <slot name="tab2"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    initalIndex : {
      type : Number,
      default : 0
    }
  },
  data(){
    return {
      dataIndex : 0,
      changed : false
    }
  },
  computed:{
    currentIndex(){
      if(this.changed === false){
        return this.initalIndex;
      }else{
        return this.dataIndex;
      }
    }
  },
  methods:{
    clickTab(index){
      this.changed = true;
      this.dataIndex = index;
    }
  },
  locales: {
    zh: {
      'approval-end' : '已审批',
      'approval-pending' : '待审批',
    },

    en: {
      'approval-end' : 'Completed',
      'approval-pending' : 'Pending',
    }
  }
}
</script>
<style scoped>
  .tabs.default1{
    transform: translate3d(-100%, 0px, 0px);
  }
  .tabs.default0{
    transform: translate3d(0%, 0px, 0px);
  }
</style>
