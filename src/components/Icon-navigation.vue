<template>
  <div class="content-block white-bg">
    <div class="row btn-grid" style="justify-content: flex-start;">

        <div v-for="item in items" class="col-25 icon-nav-box" style="width: 25%;">

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

          <span class="color-gray" style="overflow: hidden">{{item.title}}</span>
        </div>

      <div class="col-25 icon-nav-box" style="width: 25%;">
        <a @click="openIconNavPage({to:'more'})" class="icon-nav-btn"><i class="iconfont icon-gengduo" style="font-size:24px;color:#cccccc;"></i></a>
        <span class="color-gray">{{ $t('title') }}</span>
      </div>
    </div>
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
<style scoped>
  .icon-nav-box{
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    padding: 5px;
    text-align: center;
    font-size: 0.6rem;
  }
  .icon-nav-btn{
    height: 3rem;
    width: 3rem;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
.iconfont{
  font-size: 30px;
}
</style>
