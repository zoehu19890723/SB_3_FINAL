<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <scroller style="margin-top: 44px" :on-refresh="refresh" :on-infinite="infinite" ref="blog_scroller">
      <div v-if="personalBlogItems&&personalBlogItems.length!=0">
      <div class="card demo-card-header-pic" v-for="item in personalBlogItems">
        <div  v-bind:style="{ backgroundImage: 'url(' + item.img + ')' }" valign="bottom" class="card-header color-white no-border"></div>
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
      if(self.$store.state.moduleMy.personalBlog[self.$route.query.id]){
        self.personalBlogItems = self.$store.state.moduleMy.personalBlog[self.$route.query.id]
      }else{
        self.$store.dispatch('getPersonalBlog',{userId:self.$route.query.id,page:1}).then(function(){
            self.personalBlogItems = self.$store.state.moduleMy.personalBlog[self.$route.query.id]
          }
        )
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
        personalBlogItems:[]
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
        self.$store.dispatch('getPersonalBlog',{userId:self.$route.query.id,page:1}).then(function(){
          self.personalBlogItems = self.$store.state.moduleMy.personalBlog[self.$route.query.id]
          self.$refs.blog_scroller.finishPullToRefresh();
          }
        );

      },
      infinite(done) {


        let self = this;
        if (self.personalBlogItems.length%10!=0||self.personalBlogItems.length==0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getPersonalBlog',{userId:self.$route.query.id,page:parseInt((self.personalBlogItems.length)/10)+1}).then(
            function () {
              const newPersonBlogList = self.$store.state.moduleMy.personalBlog[self.$route.query.id]
              if(newPersonBlogList.length == self.personalBlogItems.length){
                self.noData = true;
                done(true)
              }else {
                self.personalBlogItems = newPersonBlogList;
                self.noData = false;
                done()
              }
            }
          )
        }, 1500)

      },


      openPage(link){
        let path = './empDetailPage/personalBlog/iframePage';
        openLink(link,'',path);
      }

    },

    locales: { en: {
      title: 'Blog',
      header: [{
        backInfo: 'Back',
      }],
      text:[
        'Posted on',
        'Read more',
        'Like',
        'No blog has been published'
      ],
      loading:'loading',
      noData:'No more blog'
    },

      zh: {
        title: '博客',
        header: [{
          backInfo: '返回',
        }],
        text:[
          '发布于',
          '详情',
          '赞',
          '还没有发布内容哦'
        ],
        loading:'加载中',
        noData:'没有更多内容'
      },

    },

  };
</script>
