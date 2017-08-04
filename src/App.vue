<template>
  <div class="views">
    <router-view></router-view>
  </div>
</template>

<script>
import { isLogin } from './utils/authService'
import {APP_ENV_NOW} from './config'
import api from './api'

export default {
  name: 'app',
  created:function(){
     var self = this;
//    if(isLogin()){
//      this.$router.push('/main')
//    }else{
//      this.$router.push('/login')
//    };
    document.addEventListener('deviceready', self.onDeviceReady, false);

    var epToken = localStorage.getItem('EP_token');
    if(epToken==null||epToken=='') {
      this.$router.push('/login')
    }else{
      this.$router.push('/home')
    }
  },

  methods: {
    onDeviceReady:function(){
      var self = this;

      document.addEventListener("backbutton", self.onBackKeyDown, false);
      document.addEventListener("resume", self.checkExpiredToken, false);
      document.addEventListener("offline", self.onOffline, false);
      document.addEventListener("online", self.onOnline, false);

    },
    onBackKeyDown:function(){
      var self = this;
      window.plugins.toast.showShortCenter(self.$t('alert.backToast'));
      document.removeEventListener("backbutton", self.onBackKeyDown, false); //注销返回键
      document.addEventListener("backbutton", self.exitApp, false);//绑定退出事件
      //3秒后重新注册
      var intervalID = window.setInterval(
        function() {
          window.clearInterval(intervalID);
          document.removeEventListener("backbutton", self.exitApp, false); // 注销返回
          document.addEventListener("backbutton", self.onBackKeyDown, false); //返回键
        },
        3000
      );
    },
    exitApp:function(){
      navigator.app.clearCache()
      navigator.app.clearHistory()
      navigator.app.exitApp();
    },
    onOffline:function(){
      f7.addNotification({
        title: self.$t('alert.networkTitle'),
        message: self.$t('alert.networkToast'),
        media: '<i class="icon iconfont icon-gth-full" style="color: red !important"></i>'
      });
    },
    onOnline:function(){

    },
    checkExpiredToken:function(){
      var self = this;

      if(navigator.onLine){

        self.appUpdate();

        self.$store.dispatch('postCheckToken').then((res) =>{
            if(res!=200||res!="200"){
              localStorage.removeItem('EP_token');
              localStorage.removeItem('EP_user_company');
              localStorage.removeItem('EP_user_login_pwd');
              localStorage.removeItem('EP_user_login_name');
              localStorage.removeItem('EP_access_idp_token');
              self.$router.push('/login')
            }
          },(err) =>{
            localStorage.removeItem('EP_token');
            localStorage.removeItem('EP_user_company');
            localStorage.removeItem('EP_user_login_pwd');
            localStorage.removeItem('EP_user_login_name');
            localStorage.removeItem('EP_access_idp_token');
            self.$router.push('/login')
          }
        )
      }else{
        f7.addNotification({
          title: self.$t('alert.networkTitle'),
          message: self.$t('alert.networkToast'),
          media: '<i class="icon iconfont icon-gth-full" style="color: red !important"></i>'
        });
      }

    },

    appUpdate:function(){
      let self = this;
      api.getAppVersion().then(
        (response) =>{
          let serviceVersion = response.body[APP_ENV_NOW.ENV].version
          let clientVersion =  localStorage.getItem('EP_version')
          let platForm = localStorage.getItem('EP_browser')
          if(serviceVersion.split('.')[1] > clientVersion.split('.')[1] ){
            f7.modal({
              title:  self.$t('text')[0],
              text: self.$t('text')[1]+serviceVersion,
              buttons: [
                {
                  text: self.$t('text')[2],
                  close:false,
                  onClick: function() {
                    if(localStorage.getItem('EP_browser')=='android'){
                      cordova.InAppBrowser.open(APP_ENV_NOW.DOWNLOAD_LOAD.ANDROID, '_system');
                    }else if(localStorage.getItem('EP_browser')=='ios'){
                      cordova.InAppBrowser.open(APP_ENV_NOW.DOWNLOAD_LOAD.IOS, '_blank','toolbar=no');
                    }else {

                    }
                  }
                },
              ]
            })

          }
        },(response) => {
          console.log('app Version Ajax error!')
        }
      )
    }
  },
  /**
   * @description 多语言
   */
  locales: {
    en: {
      text:[
        'Update APP',
        'Current version is too low, please update to the latest version',
        'OK'
      ],
      loading:'loading',
      alert:{
        loading:'loading...',
        login:'Login failed, please try again later',
        session:'Please try again later',
        sessionTitle:'No Session',
        statusNo200:'Please check your company,username,password and try again later',
        errorInfo:'Login failed',
        backToast:'Click again to exit',
        networkToast:'The current network is not available, please check your network',
        networkTitle:'No network'
      },
    },

    zh: {
      text:[
        '更新应用程序',
        '当前版本太低，请更新至最新版本',
        '确定'
      ],
      loading:'加载中',
      alert:{
        loading:'加载中...',
        login:'登录失败，请稍后重试',
        session:'请稍后重试',
        sessionTitle:'未获取到数据',
        statusNo200:'请检查公司、用户名、密码，稍后重试',
        errorInfo:'登录失败',
        backToast:'再点击一次退出!',
        networkToast:'当前网络不可用，请检查你的网络...',
        networkTitle:'没有网络'
      },
    },
  },

  }
</script>
