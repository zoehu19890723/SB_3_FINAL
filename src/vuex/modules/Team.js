import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {APP_ENV_NOW} from '../../config';
import _ from 'lodash';
import {getWestarAjax,dealUsrPhoto} from '../../utils/tools';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleTeam = {
  state: {
    members : [],
    parent : []
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setMembers(state, list){
      state.members = list;
    },
    setParent(state,obj){
      if(state.parent.length > 0){
        let select_index = _.findIndex(state.parent, {id : obj.id});
        if(select_index > -1){
          state.parent = _.dropRight(state.parent, (state.parent.length - select_index)); 
        }
        state.parent.forEach(
          (item)=>{
            if(item.isSelf === true){
              item.isSelf = false;
            }
        });
      }
      obj.isSelf = true;
      state.parent.push(obj);
    },
    clearParent(state){
      state.parent = [];
    }
  },

  getters: {
    members: state => state.members,
    parent : state => state.parent
  },

  actions : {
    getMyTeam({commit,state,dispatch},{id,name,from}){
      if(from === 'esshrdetail'){
        let existParent = state.parent ; 
        let pointedPerson = existParent[existParent.length-1];
        id = pointedPerson.id;
        name = pointedPerson.name;
      }
      if(id === null){
        commit('clearParent');
        dispatch('getPersonCard',{id:null}).then(
          (result)=>{
            if(result !== undefined && result !== null && result.personProfile !== null){
              commit('setParent',{id : result.personProfile.id , name : result.personProfile.name});
              dispatch('getSpecficTeam',{id : result.personProfile.id});
            }
        })
      }else{
        commit('setParent',{id : id , name : name});
        dispatch('getSpecficTeam',{id : id});
      }
    },

    getSpecficTeam({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/SubordinateService/GetSubordinateByEmpId/';
      return getWestarAjax(apiUrl,{id : id}).then(
      (response)=>{
        if(response.body.status === 1){
          let memberList = [];
          response.body.data.forEach((item)=>{
            if(item.photo !== undefined && item.photo !== null && item.photo !== ''){
              item.photo = APP_ENV_NOW.WSIMG + item.photo;
            }
            item.showname = item.fullname || item.othername ;
            item = dealUsrPhoto(item,item.showname);
            memberList.push(item);
          })
          commit('setMembers',memberList);
        }else{
          f7.alert('',response.body.message);
        }
      }
      );
    }

  }

};

export default moduleTeam;

