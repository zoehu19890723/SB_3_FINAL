<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="likes_scroller">
      <ul v-if="likesItems.length!=0" class="wx-contacts">
        <li v-for="item in likesItems" class="wx-item employee-card">
          <span class="wx-icon edit-head-photo cut-img" style="min-width:50px;min-height:50px;border: 1px solid #cecece;">
                  <img  v-lazy= "item.senderImg" style="width: 60px;height: 60px; margin: -5px 0 0 -5px"/>
          </span>
          <div>
            <div class="item-subtitle" style="font-weight:bold">
              <div class="chip bg-blue">
                <div class="chip-label">{{item.senderName}}{{$t('text')[0]}}{{item.likeName}}</div>
                <div class="chip-media" style="height: 25px;width: 25px;"><img :src="item.likeIcon"></div>
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
      if(self.$store.state.moduleMy.personalLikes[self.$route.query.id]){
        self.likesItems = self.$store.state.moduleMy.personalLikes[self.$route.query.id]
      }else{
        this.$store.dispatch('getLikes',{userId:this.$route.query.id,page:1}).then(function () {
          self.likesItems = self.$store.state.moduleMy.personalLikes[self.$route.query.id]
        })
      }
    },
    mounted:function() {
      setTimeout(() => {
        this.$refs.likes_scroller.resize()
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
        likesItems:[]
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
        self.$store.dispatch('getLikes',{userId:self.$route.query.id,page:1}).then(function(){

          self.likesItems = self.$store.state.moduleMy.personalLikes[self.$route.query.id]
          self.$refs.likes_scroller.finishPullToRefresh();

          }
        );

      },
      infinite(done) {
        let self = this;
        if (self.likesItems.length%10!=0||self.likesItems.length==0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getLikes',{userId:self.$route.query.id,page:parseInt((self.likesItems.length)/10)+1}).then(
            function () {
              const newPersonLikeList = self.$store.state.moduleMy.personalLikes[self.$route.query.id]
              if(newPersonLikeList.length == self.likesItems.length){
                self.noData = true;
                done(true)
              }else {
                self.likesItems = newPersonLikeList;
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
        title: 'Likes',
        header: [{
          backInfo: 'Back',
        }],
        text:[
          'Sent',
          'No one has ever sent you a blessing',
          'message:'
        ],
        loadingText : 'Loading',
        noData:'No more like'
      },

      zh: {
        title: '点赞',
        header: [{
          backInfo: '返回',
        }],
        text:[
          '送了',
          '还没有人给你点赞哦',
          '留言：'
        ],
        loadingText : '加载中',
        noData:'没有更多点赞内容'
      },
    },

  };
</script>
