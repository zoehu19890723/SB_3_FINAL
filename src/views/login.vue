<template>
  <div class="view">
    <div class="pages">
      <div class="page">
        <div class="login-screen-title">
          <img :src="baseImgUrl+EPLogoUrl">
        </div>

        <div id="login"  v-if="!online">
          <div class="noNetPanel">
            <i class="f7-icons info">info</i>
            <div class="hint">{{$t('networkError')}}</div>
            <div class="buttons-row">
              <button class="button reload"  @click="reload">{{ $t('reload') }}</button>
            </div>
          </div>
          <div class="content-block login-footer">
            <div class="copyright-des describe-font">2017 ©CDP-Portal by cdpgroupltd.com</div>
          </div>
        </div>

        <div id="login"  v-if="isWeixin && online">
          <div class="loading-text">{{$t('loadingText')}}</div>
          <div class="content-block login-footer">
            <div class="copyright-des describe-font">2017 ©CDP-Portal by cdpgroupltd.com</div>
          </div>
        </div>

        <div>
          <form class="list-block" id="loginForm">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-input">
                      <input type="text" :placeholder="$t('placeholder.name')" name="name" v-model="user.username" v-focus="nameFocused" @focus="nameFocused = true" @blur="nameFocused = false">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-input">
                      <input type="password" :placeholder="$t('placeholder.password')" name="password" v-model="user.access_token" v-focus="pwdFocused" @focus="pwdFocused = true" @blur="pwdFocused = false">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div class="buttons-row">
            <button class="button button-big button-fill" :disabled="disableLogin" @click="doLogin">{{ $t('button.login') }}</button>
          </div>
          <div class="content-block login-footer">
            <div class="copyright-des describe-font">2017 ©CDP-Portal by cdpgroupltd.com</div>
          </div>
        </div>

        <div v-if="!isLocalDev && !isWeixin && online" class="content-block login-footer">

          <div class="buttons-row">
            <button class="button button-big button-fill"  @click="SSOLogin">{{ $t('button.login') }}</button>
          </div>

          <div class="content-block color-cdp-red" >
            <template  v-if="lang==='en'">
              <p class="describe-font" style="padding-right:65px; ">{{ $t('companyCulture[1]') }}</p>
              <p class="describe-font" style="padding-left:65px; padding-bottom: 10px; ">{{ $t('companyCulture[2]') }}</p>
            </template >
            <template  v-else>
              <span class="describe-font" style="margin: 0 10px;">{{ $t('companyCulture[1]') }}</span>
              <span class="describe-font" style="margin: 0 10px;">{{ $t('companyCulture[2]') }}</span>
            </template >
          </div>
          <div class="copyright-des describe-font">2017 ©CDP-Portal by cdpgroupltd.com</div>
        </div>

      </div>
    </div>
  </div>
</template>
<style scoped>
  .login-screen-title{
    margin: 30px 0;
  }
  .login-screen-title img{
    width: 250px;
  }
  .describe-font{
    font-size: 0.6rem;
  }
  #login{
    margin: 20px 0;
  }
  .img-response-half {
    width: 50%;
    height: auto;
  }
  .img-response-height {
    height: 100%;
    width: auto;
  }
  .login-footer {
    text-align: center;
    padding: 20px;
    position: absolute;
    bottom: 0px;
    width: 100%;
  }
  .login-navbar {
    padding: 5px;
    border-bottom: solid 2px rgb(202, 17, 50);
  }
  .bg-cdp-red,
  .bg-cdp-red.button-fill {
    background-color: rgb(202, 17, 50);
  }
  .color-cdp-red {
    color: rgb(202, 17, 50);
  }
  .border-cdp-red {
    border-color: rgb(202, 17, 50);
  }
  .forgetPwd-panel{
    margin: 10px 0;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .size-18{
    font-size: 18px;
  }
  .forget-btn{
    margin-left:5px ;
  }
  .sso-btn{
    margin: 0 20px 0 5px;
  }
  .buttons-row{
    margin: 0 20px;
  }
  .loading-text{
    text-align: center;
    font-size: 24px;
    margin-top: 200px;
  }
  .noNetPanel{
    margin-top: 160px;
    text-align: center;
    color: #bebebe;
  }
  .f7-icons.info{
    font-size: 72px;
    margin-bottom: 8px;
  }
  .noNetPanel .buttons-row{
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }
  .noNetPanel .reload{
    color: #999999;
    border: 1px solid #999999;
    border-radius: 4px;
    width: 160px;
  }
</style>
<script>
  import {assetsPublicPath,APP_ENV_NOW} from '../config'
  import { saveCookie } from '../utils/authService'
  import api from '../api'
  import { focus } from 'vue-focus'
  export default {
    name: 'login',
    directives: { focus: focus },
    created(){

      /* Piwik */
      window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      window._paq.push(['setCustomDimension', 1, localStorage.getItem('EP_version')]);
      window._paq.push(['trackPageView']);
      window._paq.push(['trackAllContentImpressions']);
      window._paq.push(['enableLinkTracking']);
      (function() {
        var u="https://cdpyun.com/wp-content/plugins/wp-piwik/proxy/"
        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId',  localStorage.getItem('EP_user_company')]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.php'; s.parentNode.insertBefore(g,s);
      })();
      /* End Piwik Code */

      this.lang = localStorage.getItem('EP_lang');
      localStorage.getItem('EP_NonIDPlogin_username')?this.user.username = localStorage.getItem('EP_NonIDPlogin_username'):this.user.username='';
      localStorage.getItem('EP_NonIDPlogin_company')?this.user.company = localStorage.getItem('EP_NonIDPlogin_company'):this.user.company='';
      if('weixin' === localStorage.getItem('EP_browser')){
        var userName = localStorage.getItem('EP_user_login_name');
        var accessToken = localStorage.getItem('EP_access_idp_token');
        if(userName !== undefined && userName !== null && userName !== ''&& accessToken !== undefined && accessToken !== null && accessToken !== ''){
          this.freeLogin(userName,accessToken);
        }else{
          window.location.href = this.IPD_URL;
        }
      }else{
        if(localStorage.getItem('EP_browser')=='android'){
          this.onDeviceReady();
        }else {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        }
      }

    },

    /**
     * @description 初始化数据
     * @description 用户名，密码，当前内容ID（login或forget）
     */
    data() {
      return {
        baseImgUrl:assetsPublicPath,
        baseUrl: assetsPublicPath + 'static/img/icons/',
        currentContentId: 'login',
        CDPLogoUrl:'static/img/CDP-Brand.png',
        EPLogoUrl:'static/img/ep-portal-logo.png',
        CopyrightUrl:'static/img/Copyright.png',
        user:{
          password:'access_token',
          username: '',
          access_token: ''
        },
        companyFocused:false,
        nameFocused: false,
        pwdFocused:false,
        lang:'',
        IPD_URL:APP_ENV_NOW.IDP+'&lang='+localStorage.getItem('EP_lang'),
        EP_URL:APP_ENV_NOW.EP,
        online : true
      };
    },

    computed: {
      isLogin() {
        return this.currentContentId === 'login';
      },

      isWeixin(){
        return 'weixin' === localStorage.getItem('EP_browser');
      },

      isLocalDev(){
        return 'localDev' === localStorage.getItem('EP_browser');
      },

      disableLogin() {
        return  this.user.username === '' || this.user.password === '';
      },

    },

    methods: {
      reload : function(){
        this.onDeviceReady();
      },
      onDeviceReady:function(){
        if(navigator.onLine){
          this.online = true;
          this.loginToMain();
        }else{
          this.online = false;
        }
      },
      loginToMain:function(){
        let userName = localStorage.getItem('EP_user_login_name');
        let accessToken = localStorage.getItem('EP_access_idp_token');

        if(userName==null||userName==''||accessToken==null||accessToken=='') {
          this.SSOLogin();
        }else{
          this.freeLogin(userName,accessToken);
        }
      },

      SSOLogin:function(){
        var self = this;
        var ref = cordova.InAppBrowser.open(self.IPD_URL, '_blank', 'location=no,toolbar=no,hardwareback=yes');
        ref.show();
        ref.addEventListener('loadstop', function(event) {
          if (event.url.match("access_token")&&event.url.match("username")) {
            f7.showPreloader(self.$t('alert.loading'));

            localStorage.setItem('EP_user_login_name',decodeURIComponent(self.request(event.url,'mobile')));
            localStorage.setItem('EP_access_idp_token',self.request(event.url,'access_token'));
            //localStorage.setItem('EP_login_sso_domain',self.EP_URL);
            localStorage.setItem('EP_lang',self.request(event.url,'currentLang').toLowerCase()=='zh_cn'?'zh':'en');
            self.$store.commit('setLang',  localStorage.getItem('EP_lang'));

            api.postUserLogin(
              {
                username:localStorage.getItem('EP_user_login_name'),
                password:'access_token',
                access_token:localStorage.getItem('EP_access_idp_token')
                //third_code:self.request(event.url,'third_code')
              }
            ).then((response) =>{
              // 响应成功回调
              const token = response.body.token;
              //saveCookie('token',token);
              localStorage.setItem('EP_token',token)
              if(response.body.cubi_sess_id){
                localStorage.setItem("EP_session_id", response.body.cubi_sess_id);
//                self.$store.commit('setWeStarSession', {
//                  weStarSession: response.body.cubi_sess_id
//                });
                self.$store.commit('setUser', {
                  user: {
                    user_id:response.body.user_id,
                    user_display_name: response.body.user_display_name,
                    user_display_name_zh: response.body.metas.emp_fullname_zh_CN,
                    user_display_name_us: response.body.metas.emp_fullname_en_US,
                    user_position_zh: response.body.metas.position_zh_CN,
                    user_position_us: response.body.metas.position_en_US,
                    user_nicename: response.body.user_nicename,
                    user_email: response.body.user_email,
                    user_id: response.body.user_id,
                    user_photo:response.body.metas.emp_photo_prefix + response.body.metas.emp_photo
                  }
                });

                localStorage.setItem("EP_user_id", response.body.user_id);
                localStorage.setItem("EP_user_gender", response.body.metas.emp_gender);
                localStorage.setItem("EP_user_birthday", response.body.metas.emp_birthday);
                localStorage.setItem("EP_user_mobile", response.body.metas.emp_mobile);
                localStorage.setItem("EP_user_display_name", response.body.user_display_name);
                localStorage.setItem("EP_user_display_name_zh", response.body.metas.emp_fullname_zh_CN);
                localStorage.setItem("EP_user_display_name_us", response.body.metas.emp_fullname_en_US);
                localStorage.setItem("EP_user_position_zh", response.body.metas.position_zh_CN);
                localStorage.setItem("EP_user_position_us", response.body.metas.position_en_US);
                localStorage.setItem("EP_user_department_zh", response.body.metas.org_zh_CN);
                localStorage.setItem("EP_user_department_us", response.body.metas.org_en_US);
                localStorage.setItem("EP_user_email", response.body.user_email);
                localStorage.setItem("EP_user_photo", response.body.metas.emp_photo_prefix + response.body.metas.emp_photo);

                localStorage.setItem('EP_user_company',response.body.metas.source_domain);
                self.$router.push('main');
                ref.close();
                f7.hidePreloader();
              }else{
                alert(response.body.cubi_sess.message) //cubi_sess的报错信息
                f7.hidePreloader();
              }

            },(response) => {

              localStorage.removeItem('EP_user_login_name');
              localStorage.removeItem('EP_access_idp_token');
              // 响应错误回调
              alert("错误状态"+response.status);
              f7.alert(response.message,"错误状态"+response.status)
              f7.hidePreloader();
            })

          }else{

          }
        });
      },
      freeLogin:function(userName,accessToken){

        var self = this;
        if(typeof f7 !== 'undefined'){
          f7.showPreloader();
        }

        api.postUserLogin(
          {
            username:userName,
            password:'access_token',
            access_token:accessToken
          }
        ).then((response) =>{

          localStorage.setItem('EP_home_nav_index',0);
          const token = response.body.token;
          saveCookie('token',token);
          localStorage.setItem('EP_token',token);

          if(response.body.cubi_sess_id){
            localStorage.setItem("EP_user_gender", response.body.metas.emp_gender);
            localStorage.setItem("EP_user_birthday", response.body.metas.emp_birthday);
            localStorage.setItem("EP_user_mobile", response.body.metas.emp_mobile);
            localStorage.setItem("EP_user_department_zh", response.body.metas.org_zh_CN);
            localStorage.setItem("EP_user_department_us", response.body.metas.org_en_US);
            localStorage.setItem("EP_session_id", response.body.cubi_sess_id);
            localStorage.setItem("EP_user_id", response.body.user_id);
            localStorage.setItem("EP_user_display_name", response.body.user_display_name);
            localStorage.setItem("EP_user_display_name_zh", response.body.metas.emp_fullname_zh_CN);
            localStorage.setItem("EP_user_display_name_us", response.body.metas.emp_fullname_en_US);
            localStorage.setItem("EP_user_position_zh", response.body.metas.position_zh_CN);
            localStorage.setItem("EP_user_position_us", response.body.metas.position_en_US);
            localStorage.setItem("EP_user_email", response.body.user_email);
            localStorage.setItem("EP_user_photo", response.body.metas.emp_photo_prefix + response.body.metas.emp_photo);

            localStorage.setItem('EP_user_company',response.body.metas.source_domain);
            self.$router.push('main');
            if(typeof f7 !== 'undefined'){
              f7.hidePreloader();
            }
          }else{
            alert(response.body.cubi_sess.data.message) //cubi_sess的报错信息
            self.$router.push('login');
          }

        },(response) => {

            api.postAppLog(
              {
                name:'postUserLogin',
                type:'error',
                value:'demo',
                version:localStorage.getItem('EP_version')
              }
            ).then(response =>{
               console.log(response)
              })


          // 响应错误回调
          localStorage.removeItem('EP_user_login_name');
          localStorage.removeItem('EP_access_idp_token');
          self.$router.push('login');
          if(typeof f7 !== 'undefined'){
            f7.hidePreloader();
          }

        })
      },

      goToForgetContent() {
        this.currentContentId = 'forget';
      },

      goToLoginContent() {
        this.currentContentId = 'login';
      },

      doLogin:function(){


        var self = this;
        f7.showPreloader(self.$t('alert.loading'))

        api.postUserLogin(this.user).then((response) =>{

            //success callback
            localStorage.setItem('EP_user_company',response.body.metas.source_domain);
            localStorage.setItem("EP_user_id", response.body.user_id);
            localStorage.setItem("EP_user_gender", response.body.metas.emp_gender);
            localStorage.setItem("EP_user_birthday", response.body.metas.emp_birthday);
            localStorage.setItem("EP_user_mobile", response.body.metas.emp_mobile);
            localStorage.setItem("EP_user_display_name", response.body.user_display_name);
            localStorage.setItem("EP_user_display_name_zh", response.body.metas.emp_fullname_zh_CN);
            localStorage.setItem("EP_user_display_name_us", response.body.metas.emp_fullname_en_US);
            localStorage.setItem("EP_user_position_zh", response.body.metas.position_zh_CN);
            localStorage.setItem("EP_user_position_us", response.body.metas.position_en_US);
            localStorage.setItem("EP_user_department_zh", response.body.metas.org_zh_CN);
            localStorage.setItem("EP_user_department_us", response.body.metas.org_en_US);
            localStorage.setItem("EP_user_email", response.body.user_email);
            localStorage.setItem("EP_user_photo", response.body.metas.emp_photo_prefix + response.body.metas.emp_photo);
            localStorage.setItem('EP_user_login_name',this.user.username);
            localStorage.setItem('EP_user_login_pwd',this.user.password);
            localStorage.setItem('EP_NonIDPlogin_company',this.user.company);
            localStorage.setItem('EP_NonIDPlogin_username',this.user.username);
            localStorage.setItem('EP_NonIDPlogin_password',this.user.password);
            if(response.status==200){

              localStorage.setItem('EP_home_nav_index',0)
              const token = response.body.token
              saveCookie('token',token)
              localStorage.setItem('EP_token',token)
//                this.$http.jsonp(response.body.star_login,{
//                  params : {
//                    format : 'jsonp'
//                  }
//                }
//        ).then((response) => {
//                  // success callback
//          localStorage.setItem("session_id", response.body.data.session_id)
//          this.$store.commit('setWeStarSession', {
//            weStarSession: response.body.data.session_id
//          });
//                }, (response) => {
//                  console.log("===weStar login fails===")
//                });

              if(response.body.cubi_sess_id){
                localStorage.setItem("EP_session_id", response.body.cubi_sess_id);
                this.$store.commit('setWeStarSession', {
                  weStarSession: response.body.cubi_sess_id
                });
                this.$store.commit('setUser', {
                  user: {
                    user_id:response.body.user_id,
                    user_display_name: response.body.user_display_name,
                    user_display_name_zh: response.body.metas.emp_fullname_zh_CN,
                    user_display_name_us: response.body.metas.emp_fullname_en_US,
                    user_position_zh: response.body.metas.position_zh_CN,
                    user_position_us: response.body.metas.position_en_US,
                    user_nicename: response.body.user_nicename,
                    user_email: response.body.user_email,
                    user_id: response.body.user_id,
                    user_photo:response.body.metas.emp_photo_prefix + response.body.metas.emp_photo
                  }
                });
                localStorage.setItem("EP_user_id", response.body.user_id);
                localStorage.setItem("EP_user_display_name", response.body.user_display_name);
                localStorage.setItem("EP_user_display_name_zh", response.body.metas.emp_fullname_zh_CN);
                localStorage.setItem("EP_user_display_name_us", response.body.metas.emp_fullname_en_US);
                localStorage.setItem("EP_user_position_zh", response.body.metas.position_zh_CN);
                localStorage.setItem("EP_user_position_us", response.body.metas.position_en_US);
                localStorage.setItem("EP_user_email", response.body.user_email);
                localStorage.setItem("EP_user_photo", response.body.metas.emp_photo_prefix + response.body.metas.emp_photo);

                self.$router.push('main');
                f7.hidePreloader();
              }else{
                f7.alert(self.$t('alert.session'),self.$t('alert.sessionTitle'))
              }
            }else {
              f7.hidePreloader();
              f7.alert(self.$t('alert.statusNo200'))
            }

          }
          , (response) => {
            // error callback
            f7.alert(self.$t('alert.statusNo200'),self.$t('alert.errorInfo'))
          });

      },

      request:function(url,paras){
        var i,j
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
        var paraObj = {}
        for (i = 0;j = paraString[i]; i++){
          paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if(typeof(returnValue)=="undefined"){
          return "";
        }else{
          return returnValue;
        }
      },
      clearCompany:function(){
        this.user.company = '';
      },
      clearName:function(){
        this.user.username = '';
      },
      clearPwd:function(){
        this.user.password = '';
      }

    },

    /**
     * @description 多语言
     */
    locales: {
      lang:'en',
      en: {
        placeholder: {
          company:'Your company',
          name: 'Your name',
          password: 'Password',
        },

        button: {
          login: 'Login',
          forget: 'Forget password',
          back: 'Back',
          sso:'sso login'
        },

        loadingText : 'Loading...',

        paragraph: {
          forget: ['Forget your password?', 'Please contact your administrator to change your password.'],
        },
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
        companyCulture:[
          'CDP One-Stop service portal',
          'Enable Business of Future HR',
          'Become Employer of Choice'
        ],
        networkError: 'Network Error, please click button to reload!',
        reload :'Reload'


      },

      zh: {
        lang:'zh',
        placeholder: {
          company:'公司',
          name: '账号',
          password: '密码',
        },

        button: {
          login: '登录',
          forget: '忘记密码',
          back: '返回',
          sso:'sso 登陆'
        },

        loadingText : '加载中...',

        paragraph: {
          forget: ['忘记您的密码了？', '本系统暂不提供密码找回服务，请与您的管理员或HR联系。'],
        },
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
        companyCulture:[
          'CDP一站式服务门户',
          '成就企业',
          '造福员工'
        ],
        networkError: '网络出错啦，请点击按钮重试!',
        reload :'重新加载'

      },

    },

  };
</script>
