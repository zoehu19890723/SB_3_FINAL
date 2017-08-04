<template>
  <div class="page navbar-fixed">
    <NavBar :headerInfo="header"/></NavBar>
    <div class="page-content">
      <div class="list-block color-gray">
        <ul>
          <li>
            <div class="item-link item-content"  @click="goToPassworkSetting" v-if="!isWexin">
              <div class="item-inner">
                <div class="item-title">{{ $t('settings.account') }}</div>
              </div>
            </div>
          </li>
          <li>
            <router-link class="item-link item-content" to="/my/config/languageConfig">
              <div class="item-inner">
                <div class="item-title">{{ $t('settings.language') }}</div>
                <div class="item-after">{{lang}}</div>
              </div>
            </router-link>
          </li>
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">{{ $t('settings.version') }}</div>
                <div class="item-after">{{version}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-block">
        <a href="#" class="button button-big button-fill" @click="doLoginOut">{{$t('button.logout')}}</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .img-response {
    height: auto;
    width: 60px;
  }
  .img-div {
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
  }
  .bg-grayblue {
    background-color: rgba(32, 126, 189, 1);
  }
  .personal-content {
    padding: 15px;
    margin: 10px 0;
  }
  .color-gray {
    color: rgba(53, 53, 53, 1);
  }
</style>
<script>
  import NavBar from '../../../components/NavBar';
  import { signOut } from '../../../utils/authService';
  import {assetsPublicPath,APP_ENV_NOW} from '../../../config'
  export default {
    name: 'ConfigMenu',

    components: {
      NavBar,
    },

    data() {
      return {
        lang: localStorage.getItem('EP_lang')=='zh'?'简体中文':'English',
        version:localStorage.getItem('EP_version'),
        SETTING_PWD_URL:APP_ENV_NOW.SETTING_PWD,
        isWexin : localStorage.getItem('EP_browser')=='weixin',
        header:{
          backShow:true,
          rightShow:false,
          show:true,
          title:this.$t('title')
        },
      };
    },

    locales: {
      en: {
        title: 'Personal Settings',

        settings: {
          account: 'Password setting',
          language: 'Language',
          about: 'About CDP Portal',
          version:'version'
        },

        button: {
          feedback: 'My Feedback',
          logout: 'Log Out',
        },
        close:'Close'
      },

      zh: {
        title: '个人设置',

        settings: {
          account: '密码设置',
          language: '语言',
          about: '关于 CDP Portal',
          version:'版本'
        },

        button: {
          feedback: '意见反馈',
          logout: '退出系统',
        },
        close:'关闭'
      },
    },
    methods: {
      doLoginOut(){
        signOut();
        localStorage.setItem('EP_token','');
        localStorage.setItem('EP_user_login_pwd','');
        localStorage.removeItem('EP_user_login_name');
        localStorage.removeItem('EP_access_idp_token');
        localStorage.removeItem('EP_Activity_Current_Sub_Title');
        localStorage.removeItem('favorList');
        this.$router.push('/login')
      },
      goToPassworkSetting() {
        if(localStorage.getItem('EP_browser') === 'weixin'){
          window.location.href = this.SETTING_PWD_URL;
        }else{
          let ref = cordova.InAppBrowser.open(this.SETTING_PWD_URL, '_blank', 'location=no,toolbar=yes,toolbarposition=top,hardwareback=no,closebuttoncaption='+this.$t('close'));
          ref.show();
        }
      },
    }

  };
</script>
