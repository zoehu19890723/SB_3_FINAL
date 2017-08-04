/**
 * @author Lance.Z
 * @version 2017/04/20
 * @description My
 */
const _trim = require('lodash/trim');
import api from '../../api'
import {getRandomNumber} from '../../utils/tools';
const _= require('lodash');
const moduleMy = {
  state: {
    myDynamic:[],
    personalDynamic:{},
    myDynamicDetail:[],
    myBlog:['init'],
    personalBlog:{},
    personalWishes:{},
    personalLikes:{},
    likeTypes:[],
    blessingTypes:[],
    mySkills:[],
    empSkills:{},
    myMedal:{},
    dynamicTempImage:[],
    empBlessCards:{},
    empCardPresenter:{}
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setMyDynamic(state, data){
      if(state.myDynamic.length>0 &&state.myDynamic[0]!='init'&& data.page!=1){
        state.myDynamic = state.myDynamic.concat(data.list);
      }else{
        state.myDynamic= data.list;
      }
    },
    initMyDynamic(state){
      state.myDynamic= ['init'];
    },
    setPersonalDynamic(state,payload){

      if(state.personalDynamic[payload.id] && state.personalDynamic[payload.id].length>0 && payload.page!=1){
        state.personalDynamic[payload.id] = state.personalDynamic[payload.id].concat(payload.content);
      }else{
        state.personalDynamic[payload.id]= payload.content;
      }

    },
    setMyDynamicDetail(state, data){
      state.myDynamicDetail = data;
    },
    setMyBlog(state, data){
      if(state.myBlog.length>0 &&state.myBlog[0]!='init'&& data.page!=1){
        state.myBlog = state.myBlog.concat(data.list);
      }else{
        state.myBlog= data.list;
      }
    },
    setPersonalBlog(state,payload){

      if(state.personalBlog[payload.id] && state.personalBlog[payload.id].length>0 && payload.page!=1){
        state.personalBlog[payload.id] = state.personalBlog[payload.id].concat(payload.content);
      }else{
        state.personalBlog[payload.id]= payload.content;
      }

    },
    setPersonalWishes(state,payload){

      if(state.personalWishes[payload.id] && state.personalWishes[payload.id].length>0 && payload.page!=1){
        state.personalWishes[payload.id] = state.personalWishes[payload.id].concat(payload.content);
      }else{
        state.personalWishes[payload.id]= payload.content;
      }

    },
    setPersonalLikes(state,payload){

      if(state.personalLikes[payload.id] && state.personalLikes[payload.id].length>0 && payload.page!=1){
        state.personalLikes[payload.id] = state.personalLikes[payload.id].concat(payload.content);
      }else{
        state.personalLikes[payload.id]= payload.content;
      }

    },
    setIncreaseLikes(state,payload){
      _.forEach(state.personalLikes, function(n, key) {
        if(key == payload.id){
          n.unshift(payload.content)
        }
      });
    },
    setIncreaseBlessing(state,payload){
      _.forEach(state.personalWishes, function(n, key) {
        if(key == payload.id){
          n.unshift(payload.content)
        }
      });
    },

    setLikeTypes(state,payload){
      state.likeTypes = payload
    },
    setBlessingTypes(state,payload){
      state.blessingTypes = payload
    },
    setMySkills(state, payload){
      state.mySkills = payload.content;
    },
    setEmpSkills(state, payload){
      state.empSkills[payload.id] = payload.content;
    },
    setEmpBlessCards(state, payload){
      state.empBlessCards[payload.id] = payload.content;
    },
    changeEmpBlessCards(state, payload){
      _.forEach(state.empBlessCards[payload.empId],function(n, key){
        if(n.cardType == payload.type){
          payload.action=='add'?n.cardNumber=n.cardNumber+1:n.cardNumber=n.cardNumber-1
        }
      })
    },
    setEmpCardPresenter(state, payload){
      if(state.empCardPresenter[payload.id]){
        state.empCardPresenter[payload.id][payload.type] = payload.content
      }else{
        state.empCardPresenter[payload.id] = {};
        state.empCardPresenter[payload.id][payload.type] = payload.content;
      }
    },
    addEmpCardPresenter(state, payload){
      const id = payload.data.transfer.ID;
      const datetime = payload.data.transfer.datetime
      const textInfo = payload.entry;
      const nameEN = payload.data.transfer.emp_fullname.en_US;
      const nameCN = payload.data.transfer.emp_fullname.zh_CN;
      const message = payload.message;
      const img = payload.data.transfer.avatar;
      state.empCardPresenter[payload.user_id][payload.ctype]=state.empCardPresenter[payload.user_id][payload.ctype].push({id,datetime,textInfo,nameEN,nameCN,message,img});
    },
    setDeleteSkill(state, payload){
      _.remove(state.mySkills, function(n) {
        return n.id == payload.skillId;
      });
    },
    addOrRemoveSkills(state,data){
      _.forEach(data.skills, function(n, key) {
        if(n.id == data.skill_id){
          if(data.operate=='add'){
            n.count = n.count+1
            n.clicked = true;
          }else{
            n.count = n.count-1
            n.clicked = false;
          }
        }
      });
    },
    setMyMedal(state, payload){
      state.myMedal[payload.id] = payload.content;
    },

    clearDynamicTempImage(state){
      state.dynamicTempImage = [];
    },
    addDynamicTempImage(state,src){
      state.dynamicTempImage.push(src);
    },
    setDynamicTempImageList(state,list){
      state.dynamicTempImage = list;
    }
  },

  actions: {

    async getMyDynamic({ commit,state},data){

      return api.getMyDynamic(data.userId,data.page).then((response) =>{
        var dynamicObj = {
          page:data.page,
          list:[]
        };

            const dynamicList = response.body.map((item) => {
            const id = item.id;
            const type = item.component;
            const title = _.unescape(_trim(item.author_name));
            const content = _.unescape(_trim(item.content));
            const dateDay = item.date.split('T')[0];
            const dateTime = item.date.split('T')[1];
            const link = item.link;
            const img = item.images[0]!=undefined?item.images[0]:'';
            return {id,type,title,content,dateDay,dateTime,link,img}
          })
        dynamicObj.list = dynamicList;
        commit('setMyDynamic', dynamicObj);
      });
    },

    async getPersonalDynamic({ commit,state},data){

      return api.getMyDynamic(data.userId,data.page).then((response) =>{
        var personalDynamicObj = {
          id:'',
          page:data.page,
          content:[]
        };
        const dynamicList = response.body.map((item) => {
          const id = item.id;
          const type = item.component;
          const title = _.unescape(_trim(item.title));
          const content = _.unescape(_trim(item.content));
          const dateDay = item.date.split('T')[0];
          const dateTime = item.date.split('T')[1];
          const link = item.link;
          const img = item.images[0]!=undefined?item.images[0]:'';
          return {id,type,title,content,dateDay,dateTime,link,img}
        })

        personalDynamicObj.id = data.userId
        personalDynamicObj.content = dynamicList;

        commit('setPersonalDynamic', personalDynamicObj);
      });
    },

    async getMyBlog({ commit,state},data){

      return api.getMyBlog(data.userId,data.page).then((response) =>{

        var blogObj = {
          page:data.page,
          list:[]
        };

        const blogList = response.body.map((item) => {
          const id = item.id;
          const title = _.unescape(_trim(item.excerpt.rendered));
          const content = _.unescape(_trim(item.excerpt.rendered));
          const dateDay = item.date.split('T')[0];
          const dateTime = item.date.split('T')[1];
          const link = item.link;
          const img = item.better_featured_image.media_details?item.better_featured_image.media_details.sizes.medium_large.source_url:"";
          return {id,title,content,dateDay,dateTime,link,img}
        })
        blogObj.list = blogList;
        commit('setMyBlog', blogObj);
      });
    },

    async getPersonalBlog({ commit,state},data){

      return api.getMyBlog(data.userId,data.page).then((response) =>{
        var personalBlogObj = {
          id:'',
          page:data.page,
          content:[]
        };

        const blogList = response.body.map((item) => {
          const id = item.id;
          const title = _.unescape(_trim(item.excerpt.rendered));
          const content = _.unescape(_trim(item.excerpt.rendered));
          const dateDay = item.date.split('T')[0];
          const dateTime = item.date.split('T')[1];
          const link = item.link;
          const img = item.better_featured_image.media_details?item.better_featured_image.media_details.sizes.medium_large.source_url:"";
          return {id,title,content,dateDay,dateTime,link,img}
        })

        personalBlogObj.id = data.userId
        personalBlogObj.content = blogList;

        commit('setPersonalBlog', personalBlogObj);
      });
    },

    async getWishes({ commit,state},data){

      return api.getWishes(data.userId,data.page).then((response) =>{

        var personalWishesObj = {
          id:'',
          page:data.page,
          content:[]
        };

          const wishesList = response.body.map((item) => {
          const id = item.id;
          const senderName = item.sender_name;
          const senderImg = item.sender_avatar_url;
          const wishName = item.wish_name;
          const wishIcon = item.wish_icon_url
          const content = _.unescape(_trim(item.message));
          const dateDay = item.date.split('T')[0];
          const dateTime = item.date.split('T')[1];

          return {id,senderName,senderImg,wishName,wishIcon,content,dateDay,dateTime}

        })

        personalWishesObj.id = data.userId
        personalWishesObj.content = wishesList;

        commit('setPersonalWishes', personalWishesObj);
      });
    },

    async getLikes({ commit,state},data){

      return api.getLikes(data.userId,data.page).then((response) =>{

        var personalLikesObj = {
          id:'',
          page:data.page,
          content:[]
        };

          const likesList = response.body.map((item) => {
          const id = item.sender_ID;
          const senderName = item.sender_name;
          const senderImg = item.sender_avatar_url;
          const likeName = item.like_name;
          const likeIcon = item.like_icon_url
          const content = _.unescape(_trim(item.message));
          const dateDay = item.date.split('T')[0];
          const dateTime = item.date.split('T')[1];

          return {id,senderName,senderImg,likeName,likeIcon,content,dateDay,dateTime}

        })

        personalLikesObj.id = data.userId
        personalLikesObj.content = likesList;

        commit('setPersonalLikes', personalLikesObj);
      });
    },

    async getMyDynamicDetail({ commit,state},data){
      const dynamicDetail = {};
      api.getMyActivityDetail(data.activityId).then((response) =>{
          response.body.map((item) => {
            dynamicDetail.title = _.unescape(_trim(item.title));
            dynamicDetail.content = item.content
            dynamicDetail.dateDay = item.date.split('T')[0];
            dynamicDetail.dateTime = item.date.split('T')[1];
          })
        commit('setMyDynamicDetail', dynamicDetail);
      })

    },

    async getLikeTypes({ commit,state},data){
      const likeTypes = [];
      return api.getLikeTypes().then((response) =>{
        response.body.map((item) => {
          const id = item.id;
          const type = item.component;
          const title = _.unescape(_trim(item.name));
          const title_US = item.name_en_US;
          const title_CN = item.name_zh_CN;
          const img = item.icon;
          likeTypes.push({id,type,title,title_US,title_CN,img})
        })
        commit('setLikeTypes', likeTypes);
      });
    },

    async getBlessingTypes({ commit,state},data){
      const blessingTypes = [];
      return api.getBlessingTypes().then((response) =>{
        response.body.map((item) => {
          const id = item.id;
          const type = item.component;
          const title = _.unescape(_trim(item.name));
          const title_US = item.name_en_US;
          const title_CN = item.name_zh_CN;
          const img = item.icon;
          blessingTypes.push({id,type,title,title_US,title_CN,img})
        })
        commit('setBlessingTypes', blessingTypes);
      });
    },

    async getSkills({ commit,state},data){
      var mySkillsObj = {
        id:'',
        content:[]
      };

      const skillsList = [];
      return api.getMySkills(data.userId,data.endorser_id).then((response) =>{
        response.body.data.map((item) => {
          const id = item.ID;
          const name = item.name;
          const count = item.endorsors.count;
          skillsList.push({id,name,count})
        })

        mySkillsObj.id = data.userId
        mySkillsObj.content = skillsList;

        commit('setMySkills', mySkillsObj);
      });
    },

    async getEmpSkill({ commit,state},data){
      var empSkillsObj = {
        id:'',
        content:[]
      };

      const skillsList = [];
      return api.getMySkills(data.userId,data.endorser_id).then((response) =>{
        response.body.data.map((item) => {
          const id = item.ID;
          const name = item.name;
          const count = item.endorsors.count;
          const clicked = item.endorsors.is_endorsed
          skillsList.push({id,name,count,clicked})
        })

        empSkillsObj.id = data.userId
        empSkillsObj.content = skillsList;

        commit('setEmpSkills', empSkillsObj);
      });
    },

    async getEmpBlessCards({ commit,state},data){

      var empBlessCardsObj = {
        id:'',
        content:[]
      };

      const blessCardsList = [];
      return api.getBlessCards(data.userId).then((response) =>{
        const availables = response.body.data.availables
        const cardsBlance = response.body.data.balance
        const cardsIcon = response.body.data.icons
        const cardsColor = response.body.data.colors

        _.mapKeys(cardsBlance, function(value, key) {
          if(key!='mycred_default'){
            const cardType = key;
            const cardNumber = value.current;
            const cardName = value.current>1?value.type.plural:value.type.singular;
            const cardIcon = cardsIcon[key]
            const cardColor = value.current>0?cardsColor[key].positive:cardsColor[key].negative
            const cardAvailables = availables[key]&&availables[key].length>0?true:false
            const cardId = availables[key]&&availables[key].length>0?availables[key][0].id:'-1'
            blessCardsList.push({cardType,cardNumber,cardName,cardIcon,cardColor,cardAvailables,cardId})
          }
        });
        empBlessCardsObj.id = data.userId
        empBlessCardsObj.content = blessCardsList;

        commit('setEmpBlessCards', empBlessCardsObj);
      });
    },
    async getCardPresenter({commit,state},data){
      var empCardPresenterObj = {
        id:'',
        type:data.type,
        content:[]
      };

      const empCardPresenterList = [];
      return api.getCardPresenter(data.userId,data.type).then((response) =>{

        response.body.data.results.map((item) => {

          const id = item.transfer.ID;
          const datetime = item.transfer.datetime
          const textInfo = item.entry;
          const nameEN = item.transfer.emp_fullname.en_US;
          const nameCN = item.transfer.emp_fullname.zh_CN;
          const message = item.message;
          const img = item.transfer.avatar;
          empCardPresenterList.push({id,datetime,textInfo,nameEN,nameCN,message,img})
        })
        empCardPresenterObj.id = data.userId;
        empCardPresenterObj.type = data.type;
        empCardPresenterObj.content = empCardPresenterList;
        commit('setEmpCardPresenter', empCardPresenterObj);
      })
    },

    async getMyMedal({ commit,state},data){

      var myMedalObj = {
        id:'',
        content:[]
      };

      const medalList = [];
      return api.getMyMedal(data.userId).then((response) =>{
        response.body.map((item) => {
          const id = item.ID;
          const level = item.level;
          const title = item.title;
          const img = item.image;
          medalList.push({id,level,title,title,img})
        })

        myMedalObj.id = data.userId
        myMedalObj.content = medalList;

        commit('setMyMedal', myMedalObj);
      });
    },

    async addDynamicImage({commit,state},data){
      let filename = getRandomNumber()+'.jpg';
      let epToken = localStorage.getItem('EP_token')|| '';
      return api.saveDynamicPhoto({data,filename,epToken}).then((response)=>{
        if(response.body && response.body.id && response.body.media_id && response.body.media_id.length > 0 && response.body.source_url){
          let obj = {
            delete_id : response.body.id,
            update_id : response.body.media_id[0],
            imgPath : response.body.source_url
          };
          commit('addDynamicTempImage',obj);
          return true;
        }else{
          return false;
        }
      })
    },

    async deleteDynamicImage({commit,state},id){
      return api.deleteDynamicPhoto(id).then((response)=>{
        if(response.body.deleted){
          _.remove(state.dynamicTempImage,function(obj){
            return obj.delete_id === id;
          });
          let tempList = state.dynamicTempImage;
          commit('setDynamicTempImageList',[]);
          setTimeout(function(){
            commit('setDynamicTempImageList',tempList);
          },0);
        }
        return response.body.deleted;
      })
    },

    async saveDynamic({commit,state},{text,mediaArr}){
      return api.createDynamic(text,mediaArr);
    },
  },

};

export default moduleMy;
