<template>
  <router-link class="f7-tab-link" :to="path">
      <i class="icon iconfont" :class="icon" style="font-size: 25px;">
        <span v-show="icon=='icon-dongtai'" class="badge color-red" style="height: 12px;min-width: 12px;top:0;border: solid 1px white;"></span>
      </i>
      <span class="tabbar-label" v-text="label"></span>
  </router-link>
</template>

<script>
  import api from '../api'
  import Vue from 'vue'

  export default {
    props: {
      path: '',
      icon: '',
      label: ''
    },
    computed: {
      iconClass () {
        return `icon-${this.icon}`
      }
    },

    methods:{

    }
  }
</script>
<style lang="less" scope>
  @import '../assets/less/common.less';
  .tabbar a.router-link-active {
    color: @cdp-main-color;
  }
  .tabbar a{
    color:@cdp-gray-color;
  }
  .tabbar-labels a.link, .tabbar-labels a.tab-link{
    padding: 2px 0;
  }
  .tabbar-labels a.link, .tabbar-labels a.f7-tab-link{
    padding: 2px 0;
    height: 100%;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
  }
  .tabbar a.link, .tabbar a.f7-tab-link{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: visible;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
</style>
