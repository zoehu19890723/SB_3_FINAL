import 'babel-polyfill';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Framework7Vue from './assets/js/framework7-vue';
import { sync } from 'vuex-router-sync';
import store from './vuex/store';
import cookie from 'vue-cookie';
import App from './App';
import AwesomeSwiper from 'vue-awesome-swiper';
import VueLazyload from 'vue-lazyload'
import router from './router';
import './assets/css/iconfont.css';
import './assets/css/style.css';
import {appVersion} from './config'
import api from './api';
import { saveCookie } from './utils/authService';
import VueScroller from 'vue-scroller'
import {assetsPublicPath} from './config';
import './assets/less/cdp-theme.less'


Vue.use(VueScroller)
Vue.use(Framework7Vue);
Vue.use(VueI18n);
sync(store, router);
Vue.use(cookie);
Vue.use(AwesomeSwiper);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: assetsPublicPath + '/static/img/imgerror.png',
  loading: assetsPublicPath + '/static/img/imgerror.png',
  attempt: 1
})


// star 判断各个终端
var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      localDev:u.indexOf('LocalDev') > -1, //是否本地开发
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
if(browser.versions.localDev){
  localStorage.setItem('EP_browser','localDev')
} else if(browser.versions.weixin){
  localStorage.setItem('EP_browser','weixin')
}else if (browser.versions.android) {
 localStorage.setItem('EP_browser','android')
}
else if (browser.versions.ios) {
  localStorage.setItem('EP_browser','ios')
}
else {

}

//end 判断各个终端

let param = localStorage.getItem('EP_APP_search');
if (param !== '' && param !== null && param.length > 1) {
    let paramArr = location.search.substr(1).split('&');
    let paramObj = {};
    paramArr.forEach(function(item, index) {
        if (item.indexOf('=') > -1) {
            let key = item.split('=')[0];
            let value = item.split('=')[1];
            paramObj[key] = value;
        }
    });
    if(paramObj.username !== undefined && paramObj.username !== null){
      localStorage.setItem('EP_user_login_name',paramObj.username.replace(/%40/g, '@'));
    }
    if(paramObj.access_token !== undefined && paramObj.access_token !== null){
      localStorage.setItem('EP_access_idp_token',paramObj.access_token);
    }
}


if(localStorage.getItem('EP_lang')&&localStorage.getItem('EP_lang')!=''){
  Vue.config.lang  = localStorage.getItem('EP_lang')
}else{
  if(navigator.language.substr(0,2)=='zh'){
    Vue.config.lang = 'zh'
    localStorage.setItem('EP_lang','zh')
  }else{
    Vue.config.lang = 'en'
    localStorage.setItem('EP_lang','en')
  }
}

localStorage.setItem('EP_version',appVersion);

//Vue.http.options.root = process.env.NODE_ENV === 'development' ? '' : '/EP-Portal/'
//Vue.http.options.emulateJSON = true;
// 创建 Vue 实例
let btnArray = {
  zh : {
    sure : '确定',
    cancel : '取消'
  },
  en : {
    sure : 'OK',
    cancel : 'Cancel'
  }
}

let lan = localStorage.getItem('EP_lang') || 'zh';
let epApp = new Vue({
  el: '#app',
  framework7: {
    root: 'body',//Should be same as app el
    modalButtonOk: btnArray[lan].sure,
    modalButtonCancel: btnArray[lan].cancel
  },
  // Custom App Methods
  methods: {
    onF7Init: function () {
      console.log('f7-init');
    }
  },
  router,
  store,
  render: h => h(App)
})

window.epApp = epApp;



