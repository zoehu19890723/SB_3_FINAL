<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a class="link" v-if="header.backShow" @click="routerBack(header.backHref)">
            <i class="icon icon-back"></i>
            <span>{{header.backInfo}}</span>
          </a>
        </div>
        <div class="center">{{ header.title }}</div>
        <div class="right">
        </div>
        </v-content>
      </div>
      <div class="subnavbar">
        <div class="buttons-row">
          <a href="#" v-bind:class="{ 'active': 'cdp_hr_notice'==isActive }" class="button tab-link" v-on:click="currentSubTitle({id:'cdp_hr_notice'})">{{$t('subTitle')[3]}}</a>
          <a href="#" v-bind:class="{ 'active': 'cdp_emp_blog'==isActive}" class="button tab-link" v-on:click="currentSubTitle({id:'cdp_emp_blog'})">{{$t('subTitle')[0]}}</a>
          <a href="#"  v-bind:class="{ 'active': 'cdp_culture'==isActive }" class="button tab-link" v-on:click="currentSubTitle({id:'cdp_culture'})">{{$t('subTitle')[1]}}</a>
          <a href="#" v-bind:class="{ 'active': 'posts'==isActive }" class="button tab-link" v-on:click="currentSubTitle({id:'posts'})">{{$t('subTitle')[2]}}</a>
        </div>
      </div>
    </div>

    <scroller style="top: 90px" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">

      <div class=" media-list" style="padding-bottom: 30px;">
        <div class="list-group">
          <ul class="wx-contacts">
              <router-link v-for="itemInfo in items" class="wx-item" :to="{path:detailPage,query: {id:itemInfo.id,isActive:isActive,comments:itemInfo.comments,like:itemInfo.like,type:itemInfo.type}}">
              <span v-if="itemInfo.img" class="wx-icon" style="width:90px ;height:60px;border-radius: 2px;overflow:hidden">
                    <img :src="itemInfo.img" style = "width:90px ;height:60px;">
                </span>
              <div class="wx-name">{{itemInfo.subtitle}}</div>
              <div class="wx-pos" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:12px">
                <span>{{itemInfo.text}}</span>
              </div>
                <div class="item-footer flex-row item-subtitle">
                  <!--<a v-if="itemInfo.type=='post'" href="#" class="color-gray link"><span class="text">PDC</span></a>-->
                  <a href="#" class="color-gray link" style="width: 50%;display: flex"><span class="iconfont icon-yonghu"></span> <span class="text">{{itemInfo.author}}</span></a>
                  <a href="#" class="color-gray link" style="width: 20%;display: flex"><span class="iconfont icon-comment1"></span> <span class="text">{{itemInfo.comments}}</span></a>
                  <a href="#" class="color-gray link" style="width: 20%;display: flex"><span class="iconfont icon-zanzan"></span> <span class="text">{{itemInfo.like}}</span></a>
                </div>

              </router-link>
          </ul>
        </div>
        <!-- Preloader -->
        <div class="infinite-scroll-preloader">
          <p v-if='noData' class="color-gray">{{$t('noData')}}</p>
          <p v-else class="preloader"></p>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import VContent from '../../components/Content';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {openLink,PIWIKstatistics} from '../../utils/tools';
  export default {
      ready:function(){
//        setTimeout(() => {
//          this.$refs.my_scroller.resize()
//        })
      },
    created:function(){
      this.getActivity()
    },
    data() {
      return {
        isActive:localStorage.getItem('EP_Activity_Current_Sub_Title')?localStorage.getItem('EP_Activity_Current_Sub_Title'):'cdp_hr_notice',
        noData:false,
        header:{
          backShow:false,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('header.title')
        },
        swiperOption: {
          pagination: '.swiper-pagination',
          initialSlide :1,
          slidesPerView: 4,
          centeredSlides: true,
          paginationClickable: true,
          spaceBetween: 10,
          preventClicksPropagation:true,
        },
        subTitle:this.$t('subTitle'),
        itemList:[],
        detailPage:'./activity/activityDetail',
        items:this.$store.state.moduleActivity.activityList[localStorage.getItem('EP_Activity_Current_Sub_Title')]
      }
    },
    methods:{
      currentSubTitle(info){
        let self = this;

        PIWIKstatistics({
          trackType:'trackEvent',
          category:'activity',
          action:info.id,
          name:info.id,
          value:1
        })

        localStorage.setItem('EP_Activity_Current_Sub_Title',info.id);
        self.isActive = info.id

        if(self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]){
          self.items = self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]
        }else{
           self.items = [];
           self.noData = false;
          this.$store.dispatch('getActivityList',{id:info.id,page:1}).then(
            function () {
              self.items = self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]
              self.noData = true;
            }
          )
        }
      },
      getActivity(){
        let self = this;
        if(self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]){
          self.items = self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]
        }else{
//          f7.showPreloader(this.$t('loading'));
          this.$store.dispatch('getActivityList',{id:self.isActive,page:1}).then(
            function () {
              self.items = self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]

            }
          )
        }
      },
      refresh() {
        var self = this;
        self.$store.dispatch('getActivityList',{id:self.isActive,page:1}).then(
          function () {
            self.items = self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]
            setTimeout(() => {
              if (self.$refs.my_scroller)
                self.$refs.my_scroller.finishPullToRefresh();
            }, 500)
          }
        )


      },
      infinite(done) {
        let self = this;

        if (self.items&&self.items.length%10!=0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 500)
          return;
        }
        setTimeout(() => {
            if(self.items){
              self.$store.dispatch('getActivityList',{id:self.isActive,page:parseInt((self.items.length)/10)+1}).then(
                function () {

                  const newActivityList = self.$store.state.moduleActivity.activityList[self.isActive+'_'+localStorage.getItem('EP_lang')]
                  //当下一页请求结果为0的时候
                  if(newActivityList.length == self.items.length){
                    self.noData = true;
                    done(true)
                  }else{
                    self.items = newActivityList
                    self.noData = false;
                    done()
                  }

                }
              )
            }else {
              setTimeout(() => {
                self.noData = false;
                done()
              })
            }
        }, 500)
      },
      routerBack(href){
        if(href&&href.length>1){
          this.$router.push(href);
        }else{
          this.$router.back();
        }
      }
    },
    computed: {

    },
    mounted: function () {
      setTimeout(() => {
        this.$refs.my_scroller.resize()
      },500)
    },
    beforeUpdate:function(){
    },
    updated: function () {

    },
    /**
     * @description 多语言
     */
    locales: {
      en: {
        header: {
          title: 'Activity',
        },
        subTitle:[
          'Sharing',
          'Culture',
          'News',
          'Notice'
        ],
        loading:'loading',
        noData:'No more content'
      },

      zh: {
        header: {
          title: '动态'
        },
        subTitle:[
          '新鲜事分享',
          '企业文化',
          '新闻',
          '公告'
        ],
        loading:'加载中',
        noData:'没有更多内容'
    },
  },
    components: {
      VContent,
      swiper,
      swiperSlide
    }
  }
</script>
<style lang="less" scoped>
  .pull-to-refresh-layer.active.refreshing{
    top: 44px !important;
  }
  .active{
    overflow:visible!important;
  }
  .item-footer{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0 0 0;
    font-size: 12px;
  }
 .item-footer .iconfont{
   font-size: 12px;
 }
  .item-footer a{
    margin-right: 20px;
  }
  .sub-swiper-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;

  }
  .text{
    margin: 0 3px;
    display:block;/*内联对象需加*/
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .navbar:after{
    height: 0;
  }
  .subHeader{
    background: #f7f7f8;
    top: 30px;
    position: absolute;
    width: 100%;
    height: 44px;
  }
  .subHeader{
    border-bottom: solid 1px #c4c4c4;
  }
  .sub-swiper-title .active-state{
    color: #007aff;
  }
</style>
