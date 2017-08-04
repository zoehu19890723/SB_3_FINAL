import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {APP_ENV_NOW} from '../../config';
import _ from 'lodash';
import {getWestarAjax} from '../../utils/tools';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleFund = {
  state: {
    payList : [],
  },

  /* eslint-disable no-param-reassign*/
  mutations: {

    setPayList(state, list){
      state.payList = list;
    }
  },


  actions : {
    getFundMonth({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getMyFundMonth/';
      return getWestarAjax(apiUrl).then((response) => {
          if(parseInt(response.body.status) === 1){
            return response.body.data;
          }else{
            return [];
          }
        });
    },
    getFundData({commit,state},{month}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getMyFundByMonth/';
      return getWestarAjax(apiUrl,{month : month}).then((response) => {
          if(parseInt(response.body.status) === 1){
            return response.body.data;
          }else{
            return [];
          }
        });
    }
  }

};

export default moduleFund;

