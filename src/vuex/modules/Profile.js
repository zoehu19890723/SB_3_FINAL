/**
 * @author Zoe
 * @version 2016/12/7
 * @description 首页 {最新职位，新进员工}
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {compactDetail,compactGroupDetail} from '../../utils/tools';
import {APP_ENV_NOW} from '../../config';
import _ from 'lodash';

import {getWestarAjax} from '../../utils/tools';

Vue.use(Vuex);
Vue.use(VueResource);


const moduleProfile = {
    state: {
      personCard: {},
      profileList: {},
      profileStruct: {},
      profileDetailData: {},
      attendanceSummaryDetailData : {},
      more : {}

    },

    getters: {
      personCard: state => state.personCard,
      profileList: state => state.profileList,
      profileStruct: state => state.profileStruct,
      profileDetailData: state => state.profileDetailData,
      attendanceSummaryDetailData : state => state.attendanceSummaryDetailData,
      more : state => state.more,
      
    },

    /* eslint-disable no-param-reassign*/
    mutations: {
      setPersonCard(state, data) {
        state.personCard = data;
      },
      setProfileList(state, data) {
        state.profileList = data;
      },
      setProfileStruct(state, data) {
        state.profileStruct = data;
      },
      setProfileDetailData(state, data) {
        state.profileDetailData = data;
      },
      setSelfCardPhoto(state,src){
        state.personCard.photo = src;
      },
      setAttendanceSummaryDetailData(state,data){
        state.attendanceSummaryDetailData = data;
      },
      clearProfileStruct(state) {
        state.profileStruct = {};
      },
      setMore(state,more){
        state.more = more;
      }
    },

    actions: {
      getPersonCard({commit,state}, {id}) {
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getEmployeeProfile/';
        return getWestarAjax(apiUrl,{id : id}).then((response) => {
          let obj = response.body;
          if (obj.status === 1) {
            let photo = response.body.data.profile.photo;
            if (photo && '' !== photo && photo.indexOf(APP_ENV_NOW.WSIMG) < 0) {
              photo = APP_ENV_NOW.WSIMG + photo.replace(/\s/g, '%20');
            }
            let dest = {
              photo: photo,
              name: obj.data.profile.name,
              action: obj.data.profile.action,
              post: obj.data.profile.post,
              id : obj.data.profile.id,
              //Mock data
              department: obj.data.profile.department,
              tel: obj.data.profile.tel,
              mail: obj.data.profile.mail,
            }
            let list = _.omit(obj.data, "profile");

            commit('setPersonCard', dest);
            commit('setProfileList', list);

            return { personProfile : dest};
          } else {
            commit('setPersonCard', {});
            return { personProfile : {}};
          }
        }, (error) => {
          return error;
        });
      },

      getProfileDetail({commit,state}, {id,groupID}) {
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getEmployeeProfileDetail/';
        let currentStruct = state.profileStruct[groupID];
        let withStruct = false;
        if (currentStruct === undefined || currentStruct === null) {
          withStruct = true;
        }
        let argsParam = {
          group_id: groupID,
          withStructure: withStruct
        }
        if(id !== undefined && id !== null){
          argsParam.id = id;
        }
        return getWestarAjax(apiUrl,argsParam).then((response) => {
          let obj = response.body;
          if (obj.status === 1) {
            let data = obj.data;
            let struct = null;
            let data_ = null;
            if (data.structure !== undefined && data.structure !== null) {
              let desObj = state.profileStruct;
              desObj[groupID] = data.structure;
              commit('setProfileStruct', desObj);
              struct = data.structure;
            } else {
              struct = currentStruct;
            }
            if(data.isGroup === false){
              data_ = compactDetail(data.data, struct, false, id);
            }else{
              data_ = compactGroupDetail(data.data, struct, id);
            }
            let dataobj = {
              data: data_,
              isGroup: data.isGroup,
              permission_code: data.permission_code || 0
            };
            
            commit('setProfileDetailData', dataobj);
          } else {
            //TODO
          }
        }, (error) => {
          return error;
        });
      },

      getAttendanceSummaryDetail({commit,state}, {id,groupID}) {
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getEmployeeAttendanceSummaryData/';
        let argsParam = {};
        if(id !== undefined && id !== null){
          argsParam.id = id;
        }
        return getWestarAjax(apiUrl,argsParam).then((response) => {
          let obj = response.body;
          if (obj.status === 1) {
            commit('setAttendanceSummaryDetailData', obj.data);
            return obj.data;
          } else {
            //TODO
            return null;
          }
        });
      },

      updateField({commit,state},{field_code,groupId,value}){
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/updateEmployeeProfileDetail/';
        let argsParam = {
          group_type : groupId,
          field_code: field_code,
          isGroup : false,
          value : value 
        }
        return getWestarAjax(apiUrl,argsParam);
      },

      updateForm({commit,state},{dataId,groupId,value}){
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/updateEmployeeProfileDetail/';
        let argsParam = {
          group_type : groupId,
          id: dataId,
          isGroup : true,
          value : value  
        }
        return getWestarAjax(apiUrl,argsParam);
      },
      deleteForm({commit,state},{dataId,groupId}){
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/deleteEmployeeProfileDetail/';
        let argsParam = {
          group_type : groupId,
          id: dataId,
          isGroup : true,
          value : value  
        }
        return getWestarAjax(apiUrl,argsParam);
      },
      getMore({commit,state}){
        let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getInfoMore/';
        return getWestarAjax(apiUrl).then((response) => {
            if(response.body.status === 1){
              commit('setMore',response.body.data);
            }else{
              commit('setMore',{});
            }
          });
      }
    }
  }

  export default moduleProfile;