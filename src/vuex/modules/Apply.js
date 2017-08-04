import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {APP_ENV_NOW} from '../../config';
import _ from 'lodash';
import {getWestarAjax,convertTimeValue} from '../../utils/tools';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleApply = {
  state: {
    vacationType : [],
    provinceArray : [],
    attendanceTime : {},
    otType : [],
    otTime :{},
    seletedOtTime : {},
    tempLeaveApplyItems : {},
    tempProveItems :{},
    proveType : [],
    leaveSummary : {},
    otSummary : {},
    proveSummary : {},
    generalType : [],
    generalSummary : {},
    tempGeneralItems :{},
  },

  mutations: {
    setVacationType(state, list){
      state.vacationType = list;
    },
    setProvinceArray(state,list){
      state.provinceArray = list;
    },
    setAttendanceTime(state, obj){
      state.attendanceTime = obj;
    },
    setOTType(state,list){
      state.otType = list;
    },
    setOTTime(state, obj){
      state.otTime = obj;
    },
    setTempLeaveApplyItems(state, obj){
      state.tempLeaveApplyItems = obj;
    },
    setTempLeaveApplyPic(state,src){
      state.tempLeaveApplyItems.photo = src;
    },
    clearTempLeaveApplyItems(state){
      state.tempLeaveApplyItems = '';
    },
    setSelectedOtTime(state, ot_code){
      if(ot_code === 'ot1'){
        state.seletedOtTime.start = state.otTime.end;
      }else{
        state.seletedOtTime.start = state.otTime.start;
        state.seletedOtTime.end = state.otTime.end;
      }
    },
    setLeaveSummary(state,data){
      state.leaveSummary = data;
    },
    setOTSummary(state,data){
      state.otSummary = data;
    },

    setTempProveItems(state, obj){
      state.tempProveItems = obj;
    },
    setTempProvePic(state,src){
      state.tempProveItems.photo = src;
    },
    clearTempProveItems(state){
      state.tempProveItems = '';
    },
    setProveType(state,list){
      state.proveType = list;
    },
    setProveSummary(state,data){
      state.proveSummary = data;
    },
    
    setGeneralSummary(state,data){
      state.generalSummary = data;
    },
    setGeneralType(state,list){
      state.generalType = list;
    },
    setTempGeneralItems(state, obj){
      state.tempGeneralItems = obj;
    },
    setTempGeneralPic(state,src){
      state.tempGeneralItems.photo = src;
    },
    clearTempGeneralItems(state){
      state.tempGeneralItems = '';
    },
  },

  getters: {
    vacationType: state => state.vacationType,
    provinceArray: state => state.provinceArray,
    attendanceTime: state => state.attendanceTime,
    otType: state => state.otType,
    otTime: state => state.otTime,
    seletedOtTime : state => state.seletedOtTime,
    proveType: state => state.proveType,
    leaveSummary : state => state.leaveSummary,
    otSummary : state => state.otSummary,
    proveSummary : state => state.proveSummary,
    generalSummary : state => state.generalSummary,
    generalType: state => state.generalType,
  },

  actions : {
    //--------------------------------------------------休假相关------------------------------------------
    getLeaveSummary({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/getLeaveSummary/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data;
            commit('setLeaveSummary',result);
        }else{
          f7.alert('',response.body.message);
        }
      })
    },

    getLeaveTypes({commit}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/GetLeaveType/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data;
            let attendanceTime = {};
            if (result !== undefined && result.leave_type !== undefined && result.leave_type.length > 0) {
              result.leave_type.forEach(
                (item)=>{
                  item.value = item.leave_code;
                  item.display = item.name
                });
              attendanceTime = result.attendance_time;
          }
          commit('setVacationType',result.leave_type || []);
          result.province_list.forEach(
            (item) =>{
              item.value = item.code;
              item.display = item.text
          });
          commit('setProvinceArray',result.province_list);
          
          let now = new Date();
          let nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          let begin_time_am = nextDay.getFullYear() + '-' + convertTimeValue(nextDay.getMonth()+1) + '-' + convertTimeValue(nextDay.getDate()) + '   '+ (attendanceTime.begin_time_am || '09:00');
          let end_time_pm = nextDay.getFullYear() + '-' + convertTimeValue(nextDay.getMonth()+1) + '-' + convertTimeValue(nextDay.getDate()) + '   '+ (attendanceTime.end_time_pm || '18:00');
          
          commit('setAttendanceTime',{start : begin_time_am ,end : end_time_pm});
        }else{
          f7.alert('',response.body.message);
        }
      })
    },

    getMyLeaveQuota({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/attendance/AttendanceAnnualLeave/getLeaveQuota/';
      return getWestarAjax(apiUrl);
    },

    getMyLeaveInfo({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/getMyLeaveInfo/';
      return getWestarAjax(apiUrl);
    },

    getMyLeaveApprove({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/getMyLeaveApproveInfo/';
      return getWestarAjax(apiUrl);
    },

    getLeaveDetailInfo({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/getleaveDetailInfo/';
      return getWestarAjax(apiUrl,{id : id});
    },

    cancelLeaveApply({commit},{id,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/CancelAttendanceApply/';
      let paramArgs = {
        id: id,
        workflowType: "LEAVE",
        cancelReason: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },

    approveLeaveApply({commit},{id,code,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/ApproveLeaveItem/';
      let paramArgs = {
        id: id,
        resultCode: code,
        msg: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },

    commitLeaveApply({commit,state},{args}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/ApplyELeave/';
      return getWestarAjax(apiUrl,args);
    },

    //--------------------------------------------------加班相关------------------------------------------
    getOTSummary({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/getOTSummary/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data;
            commit('setOTSummary',result);
        }else{
          f7.alert('',response.body.message)
        }
      })
    },

    getOTTypes({commit}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/GetOTType/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data;
            let attendanceTime = {};
            if (result !== undefined && result.ot_type !== undefined && result.ot_type.length > 0) {
              result.ot_type.forEach(
                (item)=>{
                  item.value = item.ot_code;
                  item.display = item.name
                });
              attendanceTime = result.attendance_time;
          }
          commit('setOTType',result.ot_type || []);
          commit('setOTTime',{ start : attendanceTime.begin_time_am ,end : attendanceTime.end_time_pm});
        }else{
          f7.alert('',response.body.message);
        }
      })
    },

    getMyOTInfo({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/getMyOverTimeInfo/';
      return getWestarAjax(apiUrl);
    },

    getMyOTApprove({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/getMyOverTimeApproveInfo/';
      return getWestarAjax(apiUrl);
    },

    getOTDetailInfo({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/getOverTimeDetailInfo/';
      return getWestarAjax(apiUrl,{id : id});
    },

    cancelOTApply({commit},{id,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/ELeave/CancelAttendanceApply/';
      let paramArgs = {
        id: id,
        workflowType: "OT",
        cancelReason: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },

    approveOTApply({commit},{id,code,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/ApproveOverTimeItem/';
      let paramArgs = {
        id: id,
        resultCode: code,
        msg: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },

    commitOTApply({commit,state},{args}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EOT/ApplyEOT/';
      return getWestarAjax(apiUrl,args);
    },
    //--------------------------------------------------审批相关------------------------------------------
    getMyApprove({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/MyApprovalService/getMyApproveInfo/';
      return getWestarAjax(apiUrl);
    },

    getTransferDetailInfo({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceRelocationWebsvcService/getTransferDetailInfo/';
      return getWestarAjax(apiUrl,{id : id});
    },

    approveTransferApply({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceRelocationWebsvcService/ApproveTransfer/';
      return getWestarAjax(apiUrl,{id : id});
    },

    //--------------------------------------------------证明申请相关------------------------------------------
    getProveSummary({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/getProveSummary/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data;
            commit('setProveSummary',result);
        }else{
          f7.alert('',response.body.message)
        }
      })
    },

    getProveTypes({commit}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/getProveType/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data.prove_type;
            if (result !== undefined && result.length > 0) {
              result.forEach(
                (item)=>{
                  item.value = item.prove_code;
                  item.display = item.name
                });
            }
          commit('setProveType',result || []);
          }else{
            f7.alert('',response.body.message);
          }
      })
    },

    getProveInfo({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/getMyProveInfo/';
      return getWestarAjax(apiUrl);
    },

    getProveApprove({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/getMyProveApproveInfo/';
      return getWestarAjax(apiUrl);
    },

    getProveDetailInfo({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/getProveDetailInfo/';
      return getWestarAjax(apiUrl,{id:id});
    },

    cancelProveApply({commit},{id,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/CancelProveApply/';
      let paramArgs = {
        id: id,
        cancelReason: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },

    approveProveApply({commit},{id,code,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/ApproveProveItem/';
      let paramArgs = {
        id: id,
        resultCode: code,
        msg: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },
    commitProveApply({commit,state},{args}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/ApplyProve/';
      return getWestarAjax(apiUrl,args);
    },
    evaluateProve({commit,state},{id,starNo}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EProve/evaluateProve/';
      return getWestarAjax(apiUrl,{
        id : id,
        starNo:starNo
      });
    },

     //--------------------------------------------------通用申请相关------------------------------------------
    getGeneralSummary({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/getGeneralSummary/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data;
            commit('setGeneralSummary',result);
        }else{
          f7.alert('',response.body.message)
        }
      })
    },

    getGeneralTypes({commit}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/getGeneralType/';
      return getWestarAjax(apiUrl).then(
        (response)=>{
          if(response.body.status === 1){
            let result = response.body.data.prove_type;
            if (result !== undefined && result.length > 0) {
              result.forEach(
                (item)=>{
                  item.value = item.prove_code;
                  item.display = item.name
                });
            }
          commit('setGeneralType',result || []);
          }else{
            f7.alert('',response.body.message);
          }
      })
    },

    getGeneralInfo({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/getMyGeneralInfo/';
      return getWestarAjax(apiUrl);
    },

    getGeneralApprove({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/getMyGeneralApproveInfo/';
      return getWestarAjax(apiUrl);
    },

    getGeneralDetailInfo({commit,state},{id}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/getGeneralDetailInfo/';
      return getWestarAjax(apiUrl,{id:id});
    },

    cancelGeneralApply({commit},{id,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/CancelGeneralApply/';
      let paramArgs = {
        id: id,
        cancelReason: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },

    approveGeneralApply({commit},{id,code,reson}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/ApproveGeneralItem/';
      let paramArgs = {
        id: id,
        resultCode: code,
        msg: reson
      }
      return getWestarAjax(apiUrl,paramArgs);
    },
    commitGeneralApply({commit,state},{args}){
      let apiUrl = APP_ENV_NOW.WS + '/ess/EGeneral/ApplyGeneral/';
      return getWestarAjax(apiUrl,args);
    }
  }
};

export default moduleApply;

