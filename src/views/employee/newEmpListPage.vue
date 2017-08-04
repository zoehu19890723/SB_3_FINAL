<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
    <!--<v-content className="page-content">-->
    <ul class="wx-contacts">
      <li v-for="item in emps" class="wx-item employee-card">

        <router-link :to="{path:'./newEmpListPage/empDetailPage',query: {id:item.id}}" style="width:100%;display: flex">
                        <span class="wx-icon edit-head-photo cut-img" style="min-width:60px;min-height:60px;border: 1px solid #cecece;">
                          <img v-lazy="item.photo" style="width: 70px;height: 70px; margin: -5px 0 0 -5px" v-if="item.hasImg"/>
                            <div :style="'background-color:'+item.photoColor" class="photo-text" v-else>{{item.abbChar}}</div>
                        </span>
          <div>
            <div v-if="lang=='zh'" class="wx-name" style="font-weight:bold">{{item.displayName_CN}}</div>
            <div v-else class="wx-name" style="font-weight:bold">{{item.displayName_US}}</div>

            <div class="item-subtitle" style="display: flex;flex-wrap: wrap;">
              <div>
                <div v-if="lang=='zh'" style="color: #333333">{{item.department_CN}}</div>
                <div v-else style="color: #333333">{{item.department_US}}</div>
              </div><div style="margin: 0 5px;font-size: 14px;" class="color-gray" >|</div>
              <div>
                <div v-if="lang=='zh'" style="color: #333333">{{item.position_CN}}</div>
                <div v-else style="color: #333333">{{item.position_US}}</div>
              </div>
            </div>
            <div class="item-subtitle"><span class="color-gray" style="font-size: 0.6rem">{{$t('entryDate')}}{{item.enterDate}}</span></div>
          </div>
        </router-link>
      </li>
    </ul>
      <!--</v-content>-->
    </scroller>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import DMediaList from '../../components/Demo-mediaList';
  import {dealUsrPhoto} from '../../utils/tools';

  export default {
    beforeCreate:function(){
    },
    created:function(){

    },
    mounted() {
      setTimeout(() => {
        this.$refs.my_scroller.resize()
      })
    },
    props:{

    },
    data:function(){
      return {
        header:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('title')
        },
        lang:localStorage.getItem('EP_lang')
      }
    },
    computed: {
      emps() {
        this.$store.state.moduleHome.emps.forEach((item)=>{
          if(item.nameTxt){
            item = dealUsrPhoto(item,item.nameTxt);
          }
        });
        return this.$store.state.moduleHome.emps;
      }
    },
    methods:{
      routerBack(href){
        this.$router.back();
      },
      refresh() {
        var self = this;
        self.$store.dispatch('getEmps').then(
          function(){
            setTimeout(() => {
              if (self.$refs.my_scroller)
                self.$refs.my_scroller.finishPullToRefresh();
            }, 1500)

          }
        );
      },
      infinite() {

      }
    },
    locales: {
      en: {
        title:'New Employee',
        backInfo:'Back',
        entryDate:'Entry date:'
      },

      zh: {
        title:'新进员工',
        backInfo:'返回',
        entryDate:'入职日期：'
      }
    },
    components: {
      VContent,
      NavBar,
      DMediaList
    }
  }

</script>

<style scoped>
  .wx-contacts{
    margin-top: 10px;
  }
  .loading-layer
  {
    visibility: hidden;
  }
  .pull-to-refresh-layer .spinner-holder .text{
    visibility: hidden;
  }
  .item-media-img {
    width: 50px;
    height: 50px;
  }
  .employee-card{
    margin-left: 8px;
    min-height: 85px;
    display: flex;
    align-items: center;
  }
  .cut-img{
    border-radius: 50%;
    overflow: hidden;
  }
  .photo-text{
    width: 70px;
    height: 70px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: white;
    margin: -5px 0 0 -5px
  }
</style>
