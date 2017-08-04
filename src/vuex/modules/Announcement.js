/**
 * @author Lance.Z
 * @version 2017/02/21
 * @description 公告
 */
const _trim = require('lodash/trim');
const _= require('lodash');
import api from '../../api'
import {unescapeHtml} from '../../utils/tools';


const moduleAnnouncement = {
  state: {
    announcementCategory:[],
    announcementList:{}
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setAnnouncementCategory(state, data){
      state.announcementCategory = data;
    },
    setAnnouncementList(state, data){
      state.announcementList[data.id] = data.list;
    }

  },

  actions: {

          async getAnnouncementCategory({ commit,state}){

                api.getAnnouncementCategory().then((response) => {
                  const announcementCategory = response.body.map((item) => {

                  const {
                    id,
                    link,
                    name
                  } = item;

                  const iframePath = "./announcement/AnnouncementList"

                  return {id,iframePath,link,name}

                });

                commit('setAnnouncementCategory', announcementCategory);

              });

          },


        async getAnnouncementList({ commit,state},data){

              return api.getAnnouncementList(data.id).then((response) =>{
                 var announcementObj = {
                   id:'',
                   list:[]
                 };
                const announcementList = response.body.map((item) => {
                    const {
                      link
                    } = item;
              const subtitle = item.title.rendered
              const img = item.better_featured_image.media_details?item.better_featured_image.media_details.sizes.thumbnail.source_url:"";

              const text = unescapeHtml(_trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`));
              const iframePath = './announcementList/iframePage';
              const iframeTitle = item.title.rendered


              return {  link, img, subtitle, text, iframeTitle, iframePath }

            })

                announcementObj.id = data.id
                announcementObj.list = announcementList

              commit('setAnnouncementList', announcementObj);

            });

        }
},
};

export default moduleAnnouncement;
