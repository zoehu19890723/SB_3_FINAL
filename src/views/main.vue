<template>
  <div class="view view-main">
    <div class="pages">
      <div class="page navbar-fixed" :class="footer.show ?'toolbar-fixed' : ''">
        <v-bar v-if="footer.show">
          <bar-item v-for="item in $t('items')" :path="item.path" :label="item.label" :icon="item.icon">
          </bar-item>
        </v-bar>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <LoadingMask></LoadingMask>
  </div>
</template>

<script>
import VBar from '../components/Bar';
import BarItem from '../components/BarItem';
import VHeader from '../components/Header';
import LoadingMask from '../components/LoadingMask';
import $ from 'zepto';
import { mapGetters } from 'vuex';

export default {
  name: 'main',
  created:function(){

    /* Piwik */
    window._paq = window._paq || [];

    (function() {
      //var u="http://114.55.124.205:8000/piwik/";
      var u="https://cdpyun.com/wp-content/plugins/wp-piwik/proxy/"
      _paq.push(['setTrackerUrl', u+'piwik.php']);
      _paq.push(['setSiteId',  localStorage.getItem('EP_user_company')]);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.php'; s.parentNode.insertBefore(g,s);

//      window._paq.push(['setTrackerUrl', u+'piwik.php']);
//      window._paq.push(['setSiteId', localStorage.getItem('EP_user_company')]);
//      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
//      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    })();
    /* End Piwik Code */
    console.log('main.vue created')
    this.$store.dispatch('getAppMenus');

  },
  data(){
    return {
      transitionName: '',
      isIndex:true
    }
  },
  computed:{
    ...mapGetters(['footer'])
},
  // dynamically set transition based on route change
  watch: {
    '$route' (to, from) {
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      window._paq.push(['setUserId', localStorage.getItem('EP_user_email')]);
      window._paq.push(['setCustomDimension', 1, localStorage.getItem('EP_version')]);
      window._paq.push(['setCustomDimension', 3, localStorage.getItem('EP_lang')=='zh'?'zh_CN':'en_US']);
      window._paq.push(['trackPageView']);
      window._paq.push(['trackAllContentImpressions']);
      window._paq.push(['enableLinkTracking']);


      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      toDepth > 2?this.$store.commit('hideFooter'):this.$store.commit('showFooter')

//      let toPath = to.path
//      let fromPath = from.path
//      console.log(`to: ${toPath} from: ${fromPath}`)
//      if (toPath.replace(/[^/]/g, '').length > 1) {
//        this.$router.app.isIndex = false
//      }
//      else {
//        let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
//        this.$router.app.isIndex = depath ? 0 : 1
//      }



    }

    },

/**
 * @description 多语言
 */
locales: {
  en: {
    items: [
      {path: '/home' ,label:'Home',icon:'icon-shouye'},
      {path: '/activity' ,label:'News',icon:'icon-dongtai'},
      {path: '/contact' ,label:'Address book',icon:'icon-tongshi'},
      {path: '/my' ,label:'Me',icon:'icon-wo'}
    ]
  },
  zh: {
    items: [
      {path: '/home' ,label:'首页',icon:'icon-shouye'},
      {path: '/activity' ,label:'动态',icon:'icon-dongtai'},
      {path: '/contact' ,label:'通讯录',icon:'icon-tongshi'},
      {path: '/my' ,label:'我',icon:'icon-wo'}
    ]
  }
},
  components: {
    VBar,
    BarItem,
    VHeader,
    LoadingMask
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
