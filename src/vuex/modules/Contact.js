import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {APP_ENV_NOW} from '../../config';
import api from '../../api';
import {dealUsrInfo} from '../../utils/tools';
import _ from 'lodash';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleContact = {
  state: {
    contactList :[],
    searchList :[],
    searchContext : ''
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    
    setContactList(state, list){
      state.contactList = state.contactList.concat(list);
    },
    setSearchList(state, list){
      state.searchList = state.searchList.concat(list);
    },
    clearSearchList(state){
      state.searchContext = '';
      state.searchList = [];
    },
    setSearchKey(state,key){
      state.searchContext = key;
    },
    setFavor(state,{id,isFavor}){
      let existList = state.contactList;
      let existFavorList = store.get('favorList') || [];
      let objIndex = _.findIndex(existList,{
        id : id
      });
      let favorIndex = _.findIndex(existFavorList,{
        id : id
      });
      if(objIndex > -1){
        let tempObj = existList[objIndex];
        tempObj.isFavor = isFavor;
        state.contactList.splice(objIndex,1,tempObj);
        
        if(favorIndex > -1 && !isFavor){
          existFavorList.splice(favorIndex,1);
        }else{
          existFavorList.push(tempObj);
        }
        store.set('favorList',existFavorList);
      }
    }

  },
  getters: {
    contactList: state => state.contactList,
    searchList: state => state.searchList,
    searchContext : state => state.searchContext
  },

  actions : {
    async getAllContact({ commit,state},{page,number}){
      let lan = localStorage.getItem('EP_lang');
      let languageObj = {
        'zh' : {
          'loading' : '数据加载中...',
        },
        'en' : {
          'loading' : 'Loading...',
        }
      }
      let nextIndex = (page-1)*number;
      let existListLength = state.contactList.length;
      let selfId = localStorage.getItem('EP_user_id')|| '';
      if(existListLength <= nextIndex){
        commit('setMask',{show:true,text:languageObj[lan].loading});
        api.getContactList(page,number,selfId).then((response) => {
          let contactList = [];
          response.body.forEach((item)=>{
            contactList.push(dealUsrInfo(item));
          })
          commit('setContactList',contactList);
          commit('hideMask');
        });
      }
    },

    async getSearchContact({ commit,state},{page,number,key}){
      commit('setSearchKey',key);
      let lan = localStorage.getItem('EP_lang');
      let languageObj = {
        'zh' : {
          'loading' : '数据加载中...',
        },
        'en' : {
          'loading' : 'Loading...',
        }
      }
      commit('setMask',{show:true,text:languageObj[lan].loading});
      let selfId = localStorage.getItem('EP_user_id')|| '';
      api.getContactSearchList(page,number,key,selfId).then((response) => {
        let searchList = [];
        response.body.forEach((item)=>{
          searchList.push(dealUsrInfo(item));
        })
        commit('setSearchList',searchList);
        commit('hideMask');
      });
    },
  }

};

export default moduleContact;

