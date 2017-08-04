import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {APP_ENV_NOW} from '../../config';
import _ from 'lodash';
import {getWestarAjax} from '../../utils/tools';

Vue.use(Vuex);
Vue.use(VueResource);

const modulePayslip = {
  state: {
    payList : [],
    currentTime : ''
  },

  /* eslint-disable no-param-reassign*/
  mutations: {

    setPayList(state, list){
      state.payList = list;
    },
    setCurrentTime(state, time){
       state.currentTime = time;
    }

  },

  actions : {
    getMyPayList({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/payroll/PayrollConfigWebService/getEmployeePayslip/';
      return getWestarAjax(apiUrl).then((response) => {
          if(response.body.status === 1){
            let groupArray = response.body.data;
            commit('setPayList',groupArray);
            if(state.currentTime === '' && groupArray.length > 0){
              commit('setCurrentTime',groupArray[0].date);
            }
            let selectedGroup = _.find(state.payList,{
              date : state.currentTime
            });
            let monthArray = [];
            state.payList.forEach((item)=>{
              monthArray.push(item.date);
            })
            return { 
              status : true ,
              data : selectedGroup,
              monthArray : monthArray
            };
          }else{
            return { status : false , message : response.body.message };
          }
        });
    },

    setNewDate({commit,state},{newDate}){
      commit('setCurrentTime',newDate);
      let selectedGroup = _.find(state.payList,{
        date : state.currentTime
      });
      return selectedGroup;
    }
  }

};

export default modulePayslip;

