<template>
  <div class="page">
    <NavBar :headerInfo="head" rightEnable="true" :rightClick = "rightClick"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="dynamic_scroller">
      <div v-if="myDynamicItems.length!=0&&myDynamicItems[0]!='init'">
              <div class="card demo-card-header-pic" v-for="item in myDynamicItems">
                <div  v-if="item.img" v-bind:style="{ backgroundImage: 'url(' + item.img + ')' }" valign="bottom" class="card-header color-white no-border"></div>
                <div class="card-content">
                  <div class="card-content-inner">
                    <p class="color-black" v-html="item.content"></p>
                  </div>
                </div>
                <div class="card-footer">
                  <a href="#">
                    <p class="color-gray">{{item.title}}{{$t('text')[0]}} &nbsp;&nbsp;&nbsp;{{item.dateDay}}，{{item.dateTime}}</p>
                  </a>
                  <div class="link" v-if="item.type=='blogs'" @click="openPage(item.link)">
                    <p>{{$t('text')[1]}}</p>
                  </div>
                </div>
              </div>
  </div>
      <!--<div v-else class="card demo-card-header-pic">-->
        <!--<div class="card-content">-->
          <!--<div class="card-content-inner">-->
            <!--<p class="color-black">{{$t('text')[3]}}</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!-- Preloader -->
      <div class="infinite-scroll-preloader">
        <p v-if='noData' class="color-gray">{{$t('noData')}}</p>
        <p v-else class="preloader"></p>
      </div>
    </scroller>
    <!--<CardList :propItems="myDynamicItems"></CardList>-->
  </div>
</template>
<style scoped>
.card{
  margin: 10px;
}
.pull-to-refresh-layer .spinner-holder .text{
  visibility: hidden;
}

.demo-card-header-pic .card-header {
  height: 40vw;
  background-size: cover;
  background-position: center;
}

</style>
<script>
  import NavBar from '../../components/NavBar';
  import CardList from '../../components/CardList';
  import {openLink} from '../../utils/tools';
  export default {
    beforeCreate:function(){
    },
    created:function(){
        let self = this;
        if(this.$store.state.moduleMy.myDynamic.length>0){
          self.myDynamicItems = self.$store.state.moduleMy.myDynamic
        }else {
          this.$store.dispatch('getMyDynamic',{userId:localStorage.getItem('EP_user_id'),page:1}).then(function () {
              self.myDynamicItems = self.$store.state.moduleMy.myDynamic
            }
          )
          //this.$store.dispatch('getMyDynamic',{userId:localStorage.getItem('EP_user_id')})
        }
    },
    mounted:function() {
      setTimeout(() => {
        this.$refs.dynamic_scroller.resize()
      },1500)
    },
    data() {
      return {
        lang: '',
        noData:false,
        head:{
          backShow:true,
          rightShow:true,
          rightIcon:'plus1',
          iconColor:'red',
          show:true,
          title: this.$t('title')
        },
        myDynamicItems:[]
      };
    },
    watch: {
    },
      computed: {

    },
    components: {
      NavBar,
      CardList
    },

    methods: {
      rightClick(){
        this.$router.push('/my/myDynamic/addDynamic')
      },
      refresh(){
        var self = this;
        self.$store.dispatch('getMyDynamic',{userId:self.$route.query.id,page:1}).then(
          function(){
            self.myDynamicItems = self.$store.state.moduleMy.myDynamic
            setTimeout(() => {
              if (self.$refs.dynamic_scroller)
                self.$refs.dynamic_scroller.finishPullToRefresh();
            }, 1500)

          }
        );

      },
      infinite(done) {
        let self = this;
        if (self.myDynamicItems.length==0&&self.myDynamicItems.length%10!=0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getMyDynamic',{userId:self.$route.query.id,page:parseInt((self.myDynamicItems.length)/10)+1}).then(
            function () {
              const newMyDynamicList = self.$store.state.moduleMy.myDynamic

              if(self.myDynamicItems.length == newMyDynamicList.length){
                self.noData = true;
                done(true)
              }else{
                self.myDynamicItems = newMyDynamicList;
                setTimeout(() => {
                  self.noData = false;
                  done()
                })
              }

            }
          )
        }, 1500)
      },


        openPage(link){
          let path = '/my/myDynamic/iframePage';
          openLink(link,'',path);
      }

    },

    locales: {
      en: {
        title: 'My Dynamic',
        header: [{
          backInfo: 'Back',
        }],
        text:[
          'Posted on',
          'Read more',
          'Like',
          'No activity has been published'
        ],
        loading:'Loading',
        noData:'No more activities'
      },

      zh: {
        title: '我的动态',
        header: [{
          backInfo: '返回',
        }],
        text:[
          '发布于',
          '详情',
          '赞',
          '还没有动态发布哦'
        ],
        loading:'加载中',
        noData:'没有更多动态'
      },
    },

  };
</script>
