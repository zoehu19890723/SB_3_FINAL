<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div v-if="parent.length > 1" class="orgNavPanel">
        <div class="org-nav spec" v-for=" item in parent">
          <div :class="['nav-item back-color-with-5 font-color-with-spec',item.isSelf ? 'isSelf' : '']" @click="backToPointedPerson(item.id,item.name)">{{item.name}}</div>
          <div :class="['nav-split font-color-with-7' , item.isSelf ? 'isSelf' : '']" >></div>
        </div>
      </div>
      <div :class="['team-container', animation]">
        <NoDataCard v-if="members.length === 0"></NoDataCard>
        <div class="team-item-card" v-for="it in members" v-else>
          <router-link tag="div" class= "self-info-card" :to="{path:'/home/esshrdetail',query:{id : it.id}}">
            <div class="self-photo cut-img">
              <img v-lazy="it.photo" style="width:52px;height:52px" :onerror="'javascript:this.src=\''+errorImagePath+'\''" v-if="it.hasImg"/>
              <div :style="'background-color:'+it.photoColor" class="photo-text" v-else>{{it.abbChar}}</div>
            </div>
            <div class="self-text-info">
              <div class="emp-code">{{it.showname}}</div>
              <div class="emp-name">{{it.department || $t('unknow')}},<span>{{it.post || $t('emp')}}</span></div>
            </div>
          </router-link>
          <div class= "team-member" v-if="it.subordinate_count > 0" @click="getSubordinate(it.id,it.fullname)">
            <div>{{it.subordinate_count}}{{$t('wei')}}{{$t('subordinate')}}</div>
            <i class="WeStar_iconfont ">&#xe624;</i>
          </div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import { mapGetters } from 'vuex';
  import {APP_ENV_NOW,assetsPublicPath} from '../../config';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';

  export default {
    created:function(){

      let lastRoute = this.$route.query.from || null;
      this.$store.dispatch('getMyTeam',{id : null , name : null,from : lastRoute});
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('my-team')
        },
        animation : '',
        serviceImagePath : APP_ENV_NOW.WSIMG,
        errorImagePath : assetsPublicPath + '/static/img/default.jpg'
      }},
    computed : {
      ...mapGetters(['members','parent']),
    },
    methods : {
      getSubordinate(id,name){
        this.animation = 'fromRight';
        this.$store.dispatch('getMyTeam',{id : id , name : name, from : ''});
      },
      backToPointedPerson(id,name){
        this.animation = 'fromLeft';
        this.$store.dispatch('getMyTeam',{id : id , name : name, from : ''});
      }
    },
    components: {
      VContent,
      NavBar,
      NoDataCard
    },

    locales: {
      zh: {
        'my-team' : '我的下属',
        'subordinate' : '下属',
        'emp-code' : '工号 : ',
        'emp-name' : '姓名 : ',
        'unknow' : '未知',
        'emp' : '员工',
        'wei' : '位'
      },

      en: {
        'my-team' : 'Subordinate',
        'subordinate' : 'subordinate',
        'emp-code' : 'Employee ID : ',
        'emp-name' : 'Name : ',
        'unknow' : 'unknow',
        'emp' : 'Employee',
        'wei' : ' '
      }
    }
  }
</script>

<style scoped>
 .orgNavPanel{
    display: -webkit-box;
    transition: 0.3s all linear;
    overflow-x: auto;
    padding:8px;
  }
  .nav-split.isSelf{
    display: none;
  }
  .org-nav.spec{
    padding:0px;
  }
  .emp-code{
    font-weight: bold;
  }
  .emp-name{
    font-size: 14px;
  }
  .page-content{
    margin-bottom: 0px!important;
    height: calc(100%);
  }
  .photo-text{
    color: white;
    font-size: 16px;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 52px;
}
</style>
