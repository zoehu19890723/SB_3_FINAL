<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>

    <div class="page-content">
      <scroller style="margin-top: 44px"  :on-infinite="infinite" ref="dynamic_scroller">
    <NewsPageDetail v-if="myActivityDetail" :propContent = "myActivityDetail"></NewsPageDetail>
      <div class="content-block">

        <button href="#" :disabled="disabled" class="button active" v-on:click="clickLike"><i class="icon iconfont icon-zanzan" style="margin-right: 10px;color: white !important;font-size: 1rem"></i>{{totalLike}}</button>
      </div>
    <!--<Comment :propItems="" ></Comment>-->


        <div v-show="comments!=0" class="content-block-title">{{$t('text')[1]}} </div>
        <div v-show="comments!=0" class="list-block media-list">
          <ul class="comment-list">
            <li v-for="comment in commentsList">
              <div class="item-content">
                <div class="item-media">
                  <img v-if="comment.img!=''" :src="comment.img" width="44" height="44" style="border-radius:50%">
                  <i v-else class="icon iconfont icon-me"></i>
                </div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title comment-text">{{comment.name}}</div>
                  </div>
                  <div class="item-title-row">
                    <div class="item-title color-gray comment-text" v-if="comment.dateDay!=''">
                      {{$t('text')[0]}} &nbsp;&nbsp;&nbsp;{{comment.dateDay}}，{{comment.dateTime}}
                    </div>
                  </div>
                  <div class="comment-text color-black" v-html="comment.content" ></div>
                </div>
              </div>
            </li>
          </ul>
        </div>


        <div class="infinite-scroll-preloader" style="margin-bottom: 100px">
          <p v-if='noData' class="color-gray">{{$t('noData')}}</p>
          <p v-else class="preloader"></p>
        </div>
      </scroller>
    </div>

    <div v-show="!hideComment" class="toolbar tabbar">
      <div class="toolbar-inner">
        <a href="#" type="text" class="comment-input button"  v-on:click="contralPicker(true)" >{{$t('text')[3]}}</a>
      </div>
    </div>


    <f7-picker-modal id="demo-picker" :opened="opened">
      <div class="toolbar">
      <div class="toolbar-inner">
        <div class="left">
          <a href="#" class="link" v-on:click="contralPicker(false)">{{$t('text')[4]}}</a>
          </div>
        <div class="right">
          <a href="#" v-if="sent" v-on:click="postComment" class="link">{{$t('text')[5]}}</a>
          <div v-else class="link color-gray">{{sendSuccess}}</div>
          </div>
        </div>
      </div>
      <div class="picker-modal-inner">

          <textarea :placeholder="$t('text')[3]" v-model="comment.content">
          </textarea>
        </div>
    </f7-picker-modal>
    <div v-show="opened" class="modal-overlay modal-overlay-visible" style="z-index: 555"></div>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar';
  import NewsPageDetail from '../../components/NewsPageDetail';
  import Comment from '../../components/Comment';
  import api from '../../api'

  export default {
    name: 'activityDetail',

    created:function(){
        let self = this;
        let type = this.$route.query.type
        if(type == 'post'){
          type = 'posts'
        }

      if(self.$store.state.moduleActivity.postsDetail[self.$route.query.id]){
        this.$store.dispatch('getArticleDetail',{cultureId:this.$route.query.id,type:type})
      }else{
//        f7.showPreloader(this.$t('pageLoading'));
        this.$store.dispatch('getArticleDetail',{cultureId:this.$route.query.id,type:type}).then(function () {
          self.myActivityDetail = self.$store.state.moduleActivity.postsDetail[self.$route.query.id];
//          setTimeout(() => {
//            f7.hidePreloader()
//          },1500)
        })
      }

      if(self.$route.query.comments!=0){
        this.$store.dispatch('getCommentsList',{postId:this.$route.query.id,page:1}).then(function(){
          self.commentsList = self.$store.state.moduleActivity.commentList[self.$route.query.id];
        })
      }

    },

    mounted:function() {
      setTimeout(() => {
        this.$refs.dynamic_scroller.resize()
      },500)
    },

    data () {
      return {
        noData:false,
        sendSuccess:this.$t('text')[6],
        sent:true,
        opened:false,
        like:this.$route.query.like,
        comments:this.$route.query.comments,
        hideComment:this.$route.query.isActive == 'cdp_hr_notice',
        disabled:false,
        lang: '',
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('title')
        },
        myActivityDetail:this.$store.state.moduleActivity.postsDetail[this.$route.query.id],
        commentsList:this.$store.state.moduleActivity.commentList[this.$route.query.id]===undefined?[]:this.$store.state.moduleActivity.commentList[this.$route.query.id],
        comment:{
          post:this.$route.query.id,
          content:''
        },
        articleLike:{
          post_id:this.$route.query.id
        }
      }
    },
    methods:{
      contralPicker:function(info){
          this.opened = info
      },
      postComment:function(){
          let self = this;
        let newListObj = {
          id:self.$route.query.id,
          type:'comments',
          list:[]
        };
          self.sent = false
        api.postCommentSubmit(this.comment).then((response) =>{
            //success callback
              self.sendSuccess = self.$t('success')
              self.comments = self.comments+1
              const myComment = {
                'img':response.body.author_avatar_urls[48],
                 'name':response.body.author_name,
                'content':response.body.content.rendered,
                'dateDay':response.body.date.split('T')[0],
               'dateTime':response.body.date.split('T')[1]
            }

             self.commentsList.unshift(myComment)

            newListObj.list = self.$store.state.moduleActivity.activityList[self.$route.query.isActive+'_'+localStorage.getItem('EP_lang')]

            self.$store.commit('setActivityIncreaseLike',newListObj);

              setTimeout(function () {
                self.opened = false
                self.sent = true
                self.sendSuccess  = self.$t('text')[3]
              }, 1000);


          },(response) => {
            // error callback
            f7.showPreloader(this.$t('fail'))
          });

      },
      clickLike:function(){
          let self = this;
          this.disabled = true;

        api.postArticleLike(this.articleLike).then((response) =>{
            self.like = self.like + 1
            let newListObj = {
              id:self.$route.query.id,
              type:'like',
              list:[]
            }
            newListObj.list = self.$store.state.moduleActivity.activityList[self.$route.query.isActive+'_'+localStorage.getItem('EP_lang')]

            self.$store.commit('setActivityIncreaseLike',newListObj);

          }
          ,(response) => {
            self.like = self.$t('likeFail')
          });
      },

      refresh(){

      },

      infinite(done) {
        let self = this;
        console.log('infinite')
        if (self.commentsList.length%10!=0) {
          setTimeout(() => {
            self.noData = true;
            done(true)
          }, 500)
          return;
        }
        setTimeout(() => {
          self.$store.dispatch('getCommentsList',{postId:this.$route.query.id,page:parseInt((self.commentsList.length)/10)+1}).then(
            function () {
                const newCommentList = self.$store.state.moduleActivity.commentList[self.$route.query.id];
                if(newCommentList.length == self.commentsList.length){
                  self.noData = true;
                  done(true)
                }else{
                  self.commentsList = newCommentList;
                  self.noData = false;
                  done()
                }
            }
          )
        }, 500)

      },





    },
    updated:function(){

    },
    computed: {
      totalLike(){
          return this.like;
      }
    },
    components: {
      NavBar,
      NewsPageDetail,
      Comment
    },
    locales: {
      en: {
        success:'Comment success',
        fail:'Comment fail',
        likeFail:'Like failed',
        loading:'Loading',
        pageLoading:'Loading',
        title: 'Activity details',
        header: [{
          backInfo: 'Back',
        }],
        text:[
          'Posted on',
          'Comment',
          'No comment,come and say a few words',
          'Post comment...',
          'Close',
          'Send',
          'Sending...'
        ],
        noData:'No more comment'
      },

      zh: {
        success:'评论成功',
        fail:'评论失败',
        likeFail:'点赞失败了',
        loading:'提交中',
        pageLoading:'加载中',
        title: '动态详情',
        header: [{
          backInfo: '返回',
        }],
        text:[
          '发布于',
          '评论',
          '暂无评论,快来说两句吧',
          '写评论...',
          '取消',
          '提交',
          '提交中...'
        ],
        noData:'没有更多评论了'
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  .comment-text{
    font-size: 14px;
  }
  .comment-input{
    width: 100%;
    padding: 5px;
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    border-color:gray;
  }
  .list-block .item-content{
    align-items: flex-start!important;
  }
  .picker-modal-inner > textarea{
    width: 100%;
    height: 150px;
    font-size: 14px;
    border: none;
    margin: 0;
    padding: 5px;
    resize: none;
    box-sizing: border-box;
    border-radius: 0;
    color: black;
    background-color: #cfd5da;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
