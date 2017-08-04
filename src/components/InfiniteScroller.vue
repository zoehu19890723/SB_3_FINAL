<template>
  <div :class="['list-panel',className]" @scroll="_onscroll">
    <slot></slot>
    <div class="infinite-scroll-preloader" v-if="showLoader">
      <div class="preloader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'InfiniteScroller',
  props: {
    scrollBottom : null,
    className : ''
  },
  data(){
    return {
      showLoader : false,
    }
  },
  methods:{
    _onscroll(){
      let me = this;
      let el =$('.list-panel.'+this.className);
      let viewH =el.height();
      let contentH =el.get(0).scrollHeight;
      let scrollTop =el.scrollTop();
      if(scrollTop/(contentH - viewH)>= 1 && !me.showLoader){
        me.showLoader = true;
        if(me.scrollBottom !== undefined && me.scrollBottom !== null && typeof me.scrollBottom === 'function'){
          me.scrollBottom();
          me.$nextTick(()=>{
            me.showLoader = false;
          })
        }
      }
    },
  },
  
}
</script>

<style scoped>
  .list-panel{
    height: 100%;
    overflow: auto;
    background-color: white;
  }
</style>
