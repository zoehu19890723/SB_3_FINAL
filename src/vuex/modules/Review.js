import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import {APP_ENV_NOW} from '../../config';
import _ from 'lodash';
import {getWestarAjax} from '../../utils/tools';

Vue.use(Vuex);
Vue.use(VueResource);

const moduleReview = {
  state: {
    imgList : [],
    selectedImgList : [],
    uploadImgList : [],
    specGroupImgList : [],
    idList :[]
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setImgList(state, list){
      state.imgList = list;
    },
    setSpecGroupImgList(state, list){
      state.specGroupImgList = list;
    },
    setCheckedImg(state,imgPath){
      let flag = state.selectedImgList.indexOf(imgPath);
      if(flag < 0 ){
        state.selectedImgList.push(imgPath);
      }else{
        state.selectedImgList =  _.without(state.selectedImgList,imgPath);
      }
    },
    addIdList(state, obj){
      state.idList.push(obj);
    },
    reverseIdList(state){
      state.idList.reverse();
    },

    clearIdImgList(state){
      state.idList = [];
    },
    clearSpecGroupImgList(state){
      state.specGroupImgList = [];
    },
    clearCheckedImg(state){
      state.selectedImgList = [];
    },
    clearUploadImg(state){
      state.uploadImgList = [];
    },

    setUploadImg(state,uploadObj){
      let index = state.specGroupImgList.length;
      if(uploadObj.filename === undefined && uploadObj.group_name !== undefined && uploadObj.group_name !== null){
        if(uploadObj.groupid.indexOf('shenfenzheng')>-1){
          uploadObj.filename = uploadObj.group_name;
        }else{
          uploadObj.filename = uploadObj.group_name + (index+1);
        }
      }
      if(uploadObj.groupid.indexOf('shenfenzheng')>-1 && index > 0){
        let newIndex = _.findIndex(state.uploadImgList,{groupid : uploadObj.groupid});
        if(newIndex > -1){
          state.uploadImgList[newIndex].path = uploadObj.path;
        }else{
          state.uploadImgList.push(uploadObj);
        }
      }else{
        state.uploadImgList.push(uploadObj);
      }
      if(uploadObj.groupid !== undefined && uploadObj.groupid.indexOf('shenfenzheng') < 0){
        state.specGroupImgList.push(uploadObj);
      }
    },
    setUploadList(state,list){
      state.uploadImgList = list;
    }

  },

  actions : {
    getMyImgProfileList({commit,state}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getMyImgProfileList/';
      return getWestarAjax(apiUrl).then((response) => {
          if(response.body.status === 1){
            let data = response.body.data;
            let fileLoadPath = localStorage.getItem('westar_image_address');
            if(data.length > 0){
              let pathIndx = _.findIndex(data,function(chr) {
                return chr.fileUploadPath !== undefined;
              });
              if(fileLoadPath === null){
                localStorage.setItem('westar_image_address',data[pathIndx].fileUploadPath || '/system/EFile/photoUpload/');
              }
              data.splice(pathIndx,1);
            } 
            let newItem = {
              'group_id' : 'shenfenzheng',//该类型的唯一标识
              'imgNumber' : 0,
              'path' : '/home/review/idImg'
            }
            data.forEach((item)=>{
              if(item.group_id === 'shenfenzheng' || item.group_id === 'shenfenzheng_back'){
                newItem.imgNumber += parseInt(item.imgNumber);
              }
              if(parseInt(item.imgNumber)>0){
                item.note = item.imgNumber;
                item.noteColor = 'grey';
                item.noteShape = 'square';
              }
              item.path = '/home/review/CommonImg';
              item.query = {
                group_id : item.group_id,
                title : item.title
              }
            });
            _.remove(data, function(obj) { 
              return obj.group_id.indexOf('shenfenzheng') > -1; 
            });
            
            if(newItem.imgNumber > 0){
              newItem.note = newItem.imgNumber;
              newItem.noteColor = 'grey';
              newItem.noteShape = 'square';
            }
            data.unshift(newItem);
            commit('setImgList',data);
            
          }else{
            commit('setImgList',[]);
          }
        });
    },

    getMyProfileImgById({commit,state,dispatch},{group_id}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/getMyProfileImgById/';
      return getWestarAjax(apiUrl,{group_id : group_id}).then((response) => {
          if(response.body.status === 1){
            let data = response.body.data;
            if(group_id.indexOf('shenfenzheng')>-1){
              let obj = {
                file_name : '',
                path : ''
              }
              if(data.length > 0){
                obj = data[0];
              }
              obj.ref = group_id;
              dispatch('updateSpecGroupImgList',{obj:obj});
            }else{
              commit('setSpecGroupImgList',data);
            }
          }else{
            commit('clearSpecGroupImgList');
          }
        });
    },
    deleteImg({commit,state},{array,group_id}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/deleteImg/';
      return getWestarAjax(apiUrl,{
        group_id : group_id,
        photoArray : array
      }).then((response) => {
          if(parseInt(response.body.status) === 1){
            return true;
          }else{
            return false;
          }
        });
    },
    deleteSelectImg({commit,state},{array}){
      array.forEach((item)=>{
        _.remove(state.specGroupImgList,function(obj){
          return obj.path === item;
        });
        _.remove(state.uploadImgList,function(obj){
          return obj.path === item;
        });
      })
      let tempList = state.specGroupImgList;
      let tempUpList = state.uploadImgList;
      commit('clearSpecGroupImgList');
      commit('clearUploadImg');
      setTimeout(function(){
        commit('setSpecGroupImgList',tempList);
        commit('setUploadList',tempUpList);
      },0);
    },

    updateSpecGroupImgList({commit,state} , {obj}){
      commit('addIdList',obj);
      if(state.idList.length === 2){
        if(state.idList[1].ref === 'shenfenzheng' && state.idList[0].ref === 'shenfenzheng_back'){
          commit('reverseIdList',obj);
        }
        commit('clearSpecGroupImgList');
        setTimeout(function(){
          commit('setSpecGroupImgList',state.idList);
        },0);
      }
    },

    uploadImg({commit,state},{array}){
      let apiUrl = APP_ENV_NOW.WS + '/humanresource/HumanResourceWebsvcService/uploadImg/';
      return getWestarAjax(apiUrl,{photoArray : array}).then((response) => {
          if(parseInt(response.body.status) === 1){
            return true;
          }else{
            return false;
          }
        });
    },
  }
};

export default moduleReview;

