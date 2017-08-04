import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {
  APP_ENV_NOW
} from '../../config';
import api from '../../api';
import {
  getWestarAjax,
  convertTimeValue
} from '../../utils/tools';
import _ from 'lodash';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleAttend = {
  state: {
    punchSummary: {},
    punchType: [],
    tempPunchItems: {},
    abnormalCurrentMonth : '',
    punchCurrentMonth : '',
    attendInfo : {}
  },

  mutations: {
    setPunchSummary(state, data) {
      state.punchSummary = data;
    },
    setPunchType(state, data) {
      state.punchType = data;
    },
    setTempPunchItems(state, data) {
      state.tempPunchItems = data
    },
    clearTempPunchApplyItems(state) {
      state.tempPunchItems = {};
    },
    clearTempNoteItems(state) {
      state.tempPunchItems.reason = undefined;
      state.tempPunchItems.photo = undefined;
    },
    setTempPunchPic(state, src) {
      state.tempPunchItems.photo = src;
    },
    setAbnormalCurrentMonth(state,month){
      state.abnormalCurrentMonth = month;
    },
    setPunchCurrentMonth(state,month){
      state.punchCurrentMonth = month;
    },
    setAttendInfo(state,data){
      state.attendInfo = data;
    }
  },
  getters: {
    punchSummary: state => state.punchSummary,
    punchType: state => state.punchType,
    tempPunchItems: state => state.tempPunchItems,
    abnormalCurrentMonth : state => state.abnormalCurrentMonth,
    punchCurrentMonth : state => state.punchCurrentMonth,
    attendInfo : state => state.attendInfo
  },

  actions: {
    getPunchSummary({commit, state}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getPunchSummary/';
      return getWestarAjax(apiUrl).then(
        (response) => {
          if (response.body.status === 1) {
            let result = response.body.data;
            commit('setPunchSummary', result);
          } else {
            f7.alert('', response.body.message);
          }
        })
    },

    getPunchType({commit,state}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getPunchType/';
      return getWestarAjax(apiUrl).then(
        (response) => {
          if (response.body.status === 1) {
            let result = response.body.data;
            if (result !== undefined && result.length > 0) {
              result.forEach(
                (item) => {
                  item.value = item.code;
                  item.display = item.name
                });
            }
            commit('setPunchType', result);
          } else {
            f7.alert('', response.body.message);
          }
        })
    },

    getPunchData({commit}, {type,date}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getPunchData/';
      return getWestarAjax(apiUrl,{
        type: type,
        date : date
      }).then(
        (response) => {
          if (response.body.status === 1) {
            let result = response.body.data;
            return result;
          } else {
            f7.alert('', response.body.message);
          }
        })
    },

    applyPunch({commit,state}, {args}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/ApplyPunch/';
      return getWestarAjax(apiUrl, args);
    },

    getRecordDetail({commit,state}, {id}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getPunchRecordDetail/';
      return getWestarAjax(apiUrl,{
        id : id
      }).then((response) => {
        if (response.body.status === 1) {
          let result = response.body.data;
          commit('setTempPunchItems', result);
        } else {
          f7.alert('', response.body.message);
        }
      })
    },

    getPunchInfo({commit,state}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getMyPunchInfo/';
      return getWestarAjax(apiUrl);
    },
    getPunchApprove({commit,state}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getMyPunchApproveInfo/';
      return getWestarAjax(apiUrl);
    },

    getPunchDetailInfo({commit,state}, {id}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getPunchDetailInfo/';
      return getWestarAjax(apiUrl, {
        id: id
      });
    },

    cancelPunchApply({commit}, {id,reson}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/CancelPunchApply/';
      let paramArgs = {
        id: id,
        cancelReason: reson
      }
      return getWestarAjax(apiUrl, paramArgs);
    },
    approvePunchApply({commit}, {id,code,reson}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/ApprovePunchlItem/';
      let paramArgs = {
        id: id,
        resultCode: code,
        msg: reson
      }
      return getWestarAjax(apiUrl, paramArgs);
    },

    getAttendMonth({ commit}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getAttendMonth/';
      return getWestarAjax(apiUrl);
    },

    getPunchList({commit}, {month}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getAbnormalRecordsByMonth/';
      return getWestarAjax(apiUrl,{
        month : month
      });
    },
    getAttendList({commit}, {month}) {
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getAttendRecordsByMonth/';
      return getWestarAjax(apiUrl,{
        month : month
      });
    },


    getAttendInfo({commit}){
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/getMyAttendInfo/';
      return getWestarAjax(apiUrl).then((response)=>{
        if (response.body.status === 1) {
          let result = response.body.data;
          commit('setAttendInfo', result);
        } else {
          f7.alert('', response.body.message);
        }
      });
    },

    saveSignInRecord({commit}, {args}){
      let apiUrl = APP_ENV_NOW.WS + '/attendance/SignInService/SaveSignInRecord/';
      return getWestarAjax(apiUrl, args);
    }
  }
}

export default moduleAttend;