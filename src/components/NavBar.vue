<template>
  <div class="navbar">
    <div class="navbar-inner">
      <div class="left">
        <a class="link" v-if="item.backShow&&!isWeixin" @click="routerBack(item.backHref)">
          <i class="f7-icons">chevron_left</i>
          <span>{{item.backInfo}}</span>
        </a>
      </div>
    <div class="center">{{ item.title }}</div>
      <div class="right">
        <a v-if="item.rightShow" @click="_rightClick" :class="{'disable':!rightEnable}">
          <span v-if="item.rightInfo">{{item.rightInfo}}</span>
          <span v-if="item.rightIcon">
            <i :class="['icon iconfont','icon-'+item.rightIcon,'color-'+item.iconColor]"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    props: ['headerInfo','rightClick','rightEnable'],
    computed:{
      item() {
        if(this.headerInfo.backInfo === undefined || this.headerInfo.backInfo === null){
          this.headerInfo.backInfo = this.$t('routerBack');
        }
        return this.headerInfo;
      },
     isWeixin(){
        return 'weixin' === localStorage.getItem('EP_browser');
     }
  },
  methods:{
    routerBack(href){
      if(href&&href.length>1){
        this.$router.push(href);
      }else{
        this.$router.back();
      }
    },
    _rightClick(){
      let me = this;
      if(this.rightClick !== undefined && this.rightClick !== null){
          this.rightClick();
        }
    }
  },
  locales: {
    zh: {
      'routerBack' : '后退',
    },

    en: {
      'routerBack' : 'Back',
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/less/common.less';
  a{
    color:@cdp-main-color;
  }
.navbar .navbar-inner .left{
  width: 20%;
}
.navbar .navbar-inner .right{
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.right .disable{
  pointer-events: none;
  color: #cecece;
}
.right i{
  font-size: 24px;
}
</style>
