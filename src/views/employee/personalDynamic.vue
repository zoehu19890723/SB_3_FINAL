<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="personal_dynamic_scroller">
      <div v-if="myDynamicItems&&myDynamicItems.length!=0">
      <div class="card demo-card-header-pic" v-for="item in myDynamicItems">
        <div  v-if="item.img" v-bind:style="{ backgroundImage: 'url(' + item.img + ')' }" valign="bottom" class="card-header color-white no-border"></div>
        <div class="card-content">
          <div class="card-content-inner">
            <p class="color-gray" v-html="item.title" style="margin-bottom: 1rem"></p>
            <p class="color-black" v-html="item.content"></p>
          </div>
        </div>
        <div class="card-footer">
          <a href="#">
            <p class="color-gray">{{$t('text')[0]}} &nbsp;&nbsp;&nbsp;{{item.dateDay}}，{{item.dateTime}}</p>
          </a>
          <div class="link" v-if="item.type=='blogs'" @click="openPage(item.link)">
            <p>{{$t('text')[1]}}</p>
          </div>
        </div>
      </div>
   </div>
      <div class="infinite-scroll-preloader">
        <p v-if='noData' class="color-gray">{{$t('noData')}}</p>
        <p v-else class="preloader"></p>
      </div>
    </scroller>
    <!--<CardList :propItems="myDynamicItems"></CardList>-->
  </div>
</template>
<style scoped>
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
        if(self.$store.state.moduleMy.personalDynamic[self.$route.query.id]){
          self.myDynamicItems = self.$store.state.moduleMy.personalDynamic[self.$route.query.id]
        }else{
          this.$store.dispatch('getPersonalDynamic',{userId:this.$route.query.id,page:1}).then(function(){
              self.myDynamicItems = self.$store.state.moduleMy.personalDynamic[self.$route.query.id]
            }
          )
        }
    },
    mounted:function() {
      setTimeout(() => {
        this.$refs.personal_dynamic_scroller.resize()
      },1500)
    },
    data() {
      return {
        lang: '',
        noData:false,
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
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

      refresh(){
        var self = this;
        self.$store.dispatch('getPersonalDynamic',{userId:self.$route.query.id,page:1}).then(function(){
            self.myDynamicItems = self.$store.state.moduleMy.personalDynamic[self.$route.query.id]
                self.$refs.personal_dynamic_scroller.finishPullToRefresh();
          });
      },
      infinite(done) {

        let self = this;
        if (self.myDynamicItems.length%10!=0||self.myDynamicItems.length==0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getPersonalDynamic',{userId:self.$route.query.id,page:parseInt((self.myDynamicItems.length)/10)+1}).then(
            function () {
                const newPersonDynamicList = self.$store.state.moduleMy.personalDynamic[self.$route.query.id]
              if(newPersonDynamicList.length == self.myDynamicItems.length){
                self.noData = true;
                done(true)
              }else {
                self.myDynamicItems = newPersonDynamicList;
                self.noData = false;
                done()
              }
            }
          )
        }, 1500)
      },


      openPage(link){
        let path = './empDetailPage/personalDynamic/iframePage';
        openLink(link,'',path);
      }

    },

    locales: {
      en: {
        title: 'Dynamic',
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
        title: '动态',
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
