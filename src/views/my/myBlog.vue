<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="blog_scroller">
      <div v-if="myBlogItems.length!=0&&myBlogItems[0]!='init'">
      <div class="card demo-card-header-pic" v-for="item in myBlogItems">
        <div  v-show="item.img" v-bind:style="{ backgroundImage: 'url(' + item.img + ')' }" valign="bottom" class="card-header color-white no-border"></div>
        <div class="card-content">
          <div class="card-content-inner">
            <p class="color-black" v-html="item.content"></p>
          </div>
        </div>
        <div class="card-footer">
          <a href="#">
            <p class="color-gray">{{$t('text')[0]}} &nbsp;&nbsp;&nbsp;{{item.dateDay}}，{{item.dateTime}}</p>
          </a>
          <div class="link"  @click="openPage(item.link)">
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
  </div>
</template>
<style scoped>

  .demo-card-header-pic .card-header {
    height: 40vw;
    background-size: cover;
    background-position: center;
  }

</style>
<script>
  import NavBar from '../../components/NavBar';
  import {openLink} from '../../utils/tools';

  export default {

    created:function(){
        let self = this;
        if(this.$store.state.moduleMy.myBlog.length!=0&&this.$store.state.moduleMy.myBlog[0]=='init'){

          this.$store.dispatch('getMyBlog',{userId:localStorage.getItem('EP_user_id'),page:1}).then(function () {
            self.myBlogItems = self.$store.state.moduleMy.myBlog
            setTimeout(() =>{
              f7.hidePreloader()
          },1500)
          })
        }else{
          self.myBlogItems = self.$store.state.moduleMy.myBlog
          //this.$store.dispatch('getMyBlog',{userId:localStorage.getItem('EP_user_id')})
        }

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
        myBlogItems:this.$store.state.moduleMy.myBlog
      };
    },
    mounted:function() {
      setTimeout(() => {
        this.$refs.blog_scroller.resize()
      },1500)
    },
    computed: {
    },
    components: {
      NavBar,
    },

    methods: {


      refresh(){
        var self = this;
        self.$store.dispatch('getMyBlog',{userId:localStorage.getItem('EP_user_id'),page:1}).then(
          function(){
            setTimeout(() => {
              if (self.$refs.blog_scroller)
                self.$refs.blog_scroller.finishPullToRefresh();
            }, 1500)

          }
        );

      },
      infinite(done) {

        let self = this;
        console.log('infinite')
        if (self.myBlogItems&&self.myBlogItems.length%10!=0&&self.myBlogItems[0]!='init') {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getMyBlog',{userId:localStorage.getItem('EP_user_id'),page:parseInt((self.myBlogItems.length)/10)+1}).then(
            function () {
              const newMyBlogList = self.$store.state.moduleMy.myBlog

              if(self.myBlogItems.length == newMyBlogList.length){
                self.noData = true;
                done(true)
              }else{
                self.myBlogItems = newMyBlogList;
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
        let path = '/my/myBlog/iframePage';
        openLink(link,'',path);
      }

    },

    locales: { en: {
      title: 'My Blog',
      header: [{
        backInfo: 'Back',
      }],
      loading:'Loading',
      noData:'No more blog',
      text:[
        'Posted on',
        'Read more',
        'Like',
        'No blog has been published'
      ]
    },

      zh: {
        title: '我的博客',
        header: [{
          backInfo: '返回',
        }],
        loading:'加载中',
        noData:'没有更多内容',
        text:[
          '发布于',
          '详情',
          '赞',
          '还没有发布内容哦'
        ]
      },

    },

  };
</script>
