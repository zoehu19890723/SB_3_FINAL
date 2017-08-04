<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="dynamic_scroller">
      <ul v-if="wishesItems&&wishesItems.length!=0" class="wx-contacts">
        <li v-for="item in wishesItems" class="wx-item employee-card">
          <span class="wx-icon edit-head-photo cut-img" style="min-width:50px;min-height:50px;border: 1px solid #cecece;">
                  <img  v-lazy= "item.senderImg" style="width: 60px;height: 60px; margin: -5px 0 0 -5px"/>
          </span>
          <div>
            <div class="item-subtitle" style="font-weight:bold">
              <div class="chip bg-blue">
                <div class="chip-label">{{item.senderName}}{{$t('text')[0]}}{{item.wishName}}</div>
                <div class="chip-media" style="height: 25px;width: 25px;"><img :src="item.wishIcon"></div>
              </div>
            </div>
            <div v-show="item.content.length!=0" class="item-subtitle" style="font-weight:bold">
              <p style="color: black;font-size: 14px;margin: 0">
                {{$t('text')[2]}}{{item.content}}
              </p>
            </div>

              <div class="item-subtitle"><span class="color-gray" style="font-size: 0.6rem">{{item.dateDay}}</span></div>
          </div>
        </li>
      </ul>
      <!--<ul v-else class="wx-contacts">-->
        <!--<li class="wx-item employee-card">-->
          <!--<span class="wx-icon edit-head-photo cut-img" style="min-width:60px;min-height:60px;border: 1px solid #cecece;">-->
                  <!--<img  v-lazy= "" style="width: 70px;height: 70px; margin: -5px 0 0 -5px"/>-->
          <!--</span>-->
          <!--<div>-->
            <!--<div class="wx-name" style="font-weight:bold">{{$t('text')[1]}}</div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <div class="infinite-scroll-preloader">
        <p v-if='noData' class="color-gray">{{$t('noData')}}</p>
        <p v-else class="preloader"></p>
      </div>
    </scroller>

  </div>
</template>
<style scoped>
  .employee-card{
    min-height:75px;
  }
</style>
<script>
  import NavBar from '../../components/NavBar';
  import CardList from '../../components/CardList';
  export default {
    beforeCreate:function(){
    },
    created:function(){
      var self = this;
      if(self.$store.state.moduleMy.personalWishes[self.$route.query.id]){
        self.wishesItems = self.$store.state.moduleMy.personalWishes[self.$route.query.id]
      }else{
        this.$store.dispatch('getWishes',{userId:this.$route.query.id,page:1}).then(function () {
          self.wishesItems = self.$store.state.moduleMy.personalWishes[self.$route.query.id]
        })
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
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('title')
        },
        wishesItems:[]
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
        self.$store.dispatch('getWishes',{userId:self.$route.query.id,page:1}).then(function(){
          self.wishesItems = self.$store.state.moduleMy.personalWishes[self.$route.query.id]
          self.$refs.dynamic_scroller.finishPullToRefresh();
          });
      },
      infinite(done){
        let self = this;
        if (self.wishesItems.length%10!=0||self.wishesItems.length==0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getWishes',{userId:self.$route.query.id,page:parseInt((self.wishesItems.length)/10)+1}).then(
            function () {
              const newPersonWishesList = self.$store.state.moduleMy.personalWishes[self.$route.query.id]
              if(newPersonWishesList.length == self.wishesItems.length){
                self.noData = true;
                done(true)
              }else {
                self.wishesItems = newPersonDynamicList;
                self.noData = false;
                done()
              }
            }
          )
        }, 1500)
      },
    },

    locales: {
      en: {
        title: 'Blessing',
        header: [{
          backInfo: 'Back',
        }],
        text:[
          'Sent',
          'No one has ever sent you a blessing',
          'message:'
        ],
        loadingText : 'Loading',
        noData:'No more blessing'
      },

      zh: {
        title: '祝福',
        header: [{
          backInfo: '返回',
        }],
        text:[
          '送了',
          '还没有人给你送祝福哦',
          '留言：'
        ],
        loadingText : '加载中',
        noData:'没有更多祝福内容'
      },
    },

  };
</script>
