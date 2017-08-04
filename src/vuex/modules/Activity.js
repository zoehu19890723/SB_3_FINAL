/**
 * @author Lance.Z
 * @version 2017/5/5
 * @description 动态
 */
const _trim = require('lodash/trim');
import api from '../../api'


const moduleActivity = {
  state: {
    activityList:{},
    postsDetail:{},
    cultureDetail:{},
    commentList:{}
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setActivityList(state, data){
      if(state.activityList[data.id] && data.page!=1){
        state.activityList[data.id] = state.activityList[data.id].concat(data.list);
      }else{
        state.activityList[data.id] = data.list;
      }
    },
    setActivityIncreaseLike(state,data){
      _.forEach(data.list, function(n, key) {
        if(n.id == data.id){
          n[data.type] = n[data.type]+1
        }
      });
    },
    setPostsDetail(state, data){
      state.postsDetail[data.id] = data.content;
    },
    setCultureDetail(state, data){
      state.cultureDetail = data;
    },
    setCommentList(state, data){
      if(state.commentList[data.id] && state.commentList[data.id].length>0 && data.page!=1){
        state.commentList[data.id] = state.commentList[data.id].concat(data.list);
      }else{
        state.commentList[data.id]= data.list;
      }
    }
  },

  actions: {
    async getPostsDetail({ commit,state},data){
      const postsDetail = {};
      return api.getPostsDetail(data.postsId).then((response) =>{

        var postsDetailObj = {
          id:'',
          content:{}
        };

        postsDetail.title = response.body.title.rendered
        postsDetail.content = response.body.content.rendered;
        postsDetail.img = response.body.better_featured_image.source_url;

        postsDetailObj.id = data.postsId
        postsDetailObj.content = postsDetail;

        commit('setPostsDetail', postsDetailObj);

      })
    },

    async getCultureDetail({ commit,state},data){
      const cultureDetail = {};
      return api.getCultureDetail(data.cultureId).then((response) =>{
        var postsDetailObj = {
          id:'',
          content:{}
        };

            cultureDetail.title = response.body.title.rendered
            cultureDetail.content = response.body.content.rendered;
            cultureDetail.img = response.body.better_featured_image.source_url;

            postsDetailObj.id = data.cultureId
            postsDetailObj.content = cultureDetail;

            commit('setPostsDetail', postsDetailObj);
        })
    },

    async getArticleDetail({ commit,state},data){
      const cultureDetail = {};
      return api.getArticleDetail(data.cultureId,data.type).then((response) =>{
        var postsDetailObj = {
          id:'',
          content:{}
        };

        cultureDetail.title = response.body.title.rendered
        cultureDetail.content = response.body.content.rendered;

        postsDetailObj.id = data.cultureId
        postsDetailObj.content = cultureDetail;

        commit('setPostsDetail', postsDetailObj);
      })
    },

    async getActivityList({ commit,state},data){

      return api.getDynamicCategoryList(data.id,data.page).then((response) =>{

        var activityListObj = {
          id:'',
          page:data.page,
          list:[]
        };

        const dynamicCategoryList = response.body.map((item) => {
          const {
            id,
            link,
            type
          } = item;
          const like = parseInt(item._thumbs_rating_up);
          const comments = parseInt(item.total_comments);
          const author = item.author_name;
          const authorId = item.author;
          const ajaxUrl =item._links.self[0].href;
          const img = item.better_featured_image&&item.better_featured_image.media_details.sizes.thumbnail_sm?item.better_featured_image.media_details.sizes.thumbnail_sm.source_url:'';
          const subtitle = item.title.rendered;
          const text = _trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`);
          const title = item.title.rendered;



          return {  id, link, type, like, comments, author, authorId, ajaxUrl, img, subtitle, text,title}

        })

        activityListObj.id = data.id + '_'+ localStorage.getItem('EP_lang');
        activityListObj.list = dynamicCategoryList;

        commit('setActivityList', activityListObj);

      });
    },

    async getShare({ commit,state},data){
      const newToShare = [];

      return api.getNewToShare(data.number).then((response) => {
        var activityListObj = {
          id:'',
          list:[]
        };
        response.body.map((item) => {
          const {
            id,
            link,
            type
          } = item;
          const like = parseInt(item._thumbs_rating_up);
          const img = item.better_featured_image?item.better_featured_image.source_url:'';
          const subtitle = item.title.rendered;
          const text = _trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`);
          const iframeTitle = localStorage.getItem('EP_lang')=='zh'?'新鲜事分享':'Sharing';
          const iframePath = '/dynamic/dynamicList/iframePage';



          newToShare.push({  id, link, type, like, img, subtitle, text, iframeTitle, iframePath })

        });
        activityListObj.id = 'newToShare'
        activityListObj.list = newToShare;

        commit('setActivityList', activityListObj);

      });

    },

    async getCommentsList({ commit,state},data){

      return api.getCommentsList(data.postId,data.page).then((response) => {
        const CommentsList = [];
        var commentListObj = {
          id:'',
          page:data.page,
          list:[]
        };

        response.body.map((item) => {

             const img = item.author_avatar_urls[48];
             const name = item.author_name;
             const content = item.content.rendered;
             const dateDay = item.date.split('T')[0];
             const dateTime = item.date.split('T')[1];

             CommentsList.push({img, name, content, dateDay, dateTime})

        })
        commentListObj.id = data.postId
        commentListObj.list = CommentsList

        commit('setCommentList', commentListObj);

      })

    }

  },
};

export default moduleActivity;
