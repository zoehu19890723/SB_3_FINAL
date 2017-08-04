<template>
  <div class="page-content">
      <div v-for="itemCategory in items">
        <div class="subtitle-in" style="background-color:white;padding: 0">
          <div class="row btn-grid"  style="padding:10px;">
            <p style="width: 100%;line-height: 30px;margin:0 "><span class="subtitle-icon" style="font-size: 14px;font-weight: bold">{{ itemCategory.title }}</span></p>

        <div v-for="item in itemCategory.icons" class="col-25 icon-nav-box">
          <div v-if="item.to==='cdplife'||item.to==='sap'||item.to==='ep'||item.to==='app'">
            <a @click="openInAppBrowser({'from':'EP','redirect':item.dest,'title':item.title,'to':item.to,'language':lang})" class="icon-nav-btn" >
              <i :class="item.icon" :style="{color:item.color}"></i>
            </a>
          </div>
          <div v-else>
            <router-link class="icon-nav-btn" :to="{path:item.path,query: {redirect:item.dest,from:'EP',title:item.title,backHref:'/home',to:item.to,language:lang}}">
              <i :class="item.icon" :style="{color:item.color}"></i>
            </router-link>
          </div>
          <span style="overflow: hidden">{{item.title}}</span>
        </div>

      </div>
    </div>
      </div>
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
  import {openLink} from '../utils/tools';
  export default {
    name: 'IconNavigation',

    /**
     * @type {string} propTitle
     * @type {{img: string, subtitle: string, text: [string], link: string}[]} propItems
     */
    props: [ 'propItems'],

    data () {
      return {

      }
    },
    methods:{
      openInAppBrowser (obj){

        let baseURL = '';

        if(obj.to == 'app'){

          switch(obj.redirect){
            case "me":
                this.$router.push('/my'); break;
            case "newEmployees":
                this.$router.push('/home/newEmpListPage');break;
            case "hotPosition":
                this.$router.push('/home/hotPositionPage');break;

            default:;
          }
          return;
        }else if(obj.to == 'cdplife'){

          baseURL = obj.redirect + '&username=' + localStorage.getItem('EP_user_login_name')

        }else{

          baseURL = obj.redirect

        }

        let path = '/home/iframePage';
        openLink(baseURL,obj.title,path)

      },
      openIconNavPage(obj){
        this.$router.push('/home/navMore')
      }
    },
    /**
     * @description 多语言
     */
    locales: {
      en: {
        header: [{
          backInfo: 'Back',
        }],
        title:'More'
      },

      zh: {
        header: [{
          backInfo: '返回',
        }],
        title:'更多'
      },
    },
    computed: {
      items() {
        return this.propItems;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../assets/less/common.less';
  .subtitle-icon:before{
    content: '';
   height: 15px;
    width: 3px;
    margin: 0 5px 0 5px;
    display: inline-block;
    background:@cdp-main-color;
  }
  .subtitle-in:before{
    content: '';
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #c8c7cc;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
  .icon-nav-box{
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    padding: 5px;
    text-align: center;
    font-size: 12px;
  }
  .icon-nav-btn{
    height: 3rem;
    width: 3rem;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }

</style>
