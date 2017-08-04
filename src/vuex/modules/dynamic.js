/**
 * @author Lance.Z
 * @version 2016/12/12
 * @description 动态
 */
const _trim = require('lodash/trim');
import api from '../../api';
import _ from 'lodash';

const moduleDynamic = {
  state: {
    dynamicCategory:[],
    dynamicCategoryList:[],
    newToShare:[],
    enterpriseNews:[],
    journalOfEnterprise:[]
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setDynamicCategory(state, data){
      state.dynamicCategory = data;
    },
    setDynamicCategoryList(state, data){
      state.dynamicCategoryList = data;
    },
    setNewToShare(state, data){
      state.newToShare = data;
    },
    setEnterpriseNews(state, data){
      state.enterpriseNews = data;
    },
    setJournalOfEnterprise(state, data){
      state.journalOfEnterprise = data;
    }

  },

  actions: {

            async getDynamicCategoryList({ commit,state},data){

                  api.getDynamicCategoryList(data.id).then((response) =>{

                    const dynamicCategoryList = response.body.map((item) => {
                        const {
                          id,
                          link,
                          type
                        } = item;

                        const img = item.better_featured_image?item.better_featured_image.source_url:'';
                        const subtitle = item.title.rendered;
                        const text = _trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`);
                        const iframeTitle = localStorage.getItem('EP_lang')=='zh'?'企业新闻':'News';
                        const iframePath = '/dynamic/dynamicList/iframePage';



                        return { id, link, type, img, subtitle, text, iframeTitle, iframePath }

                })
                commit('setDynamicCategoryList', dynamicCategoryList);

                });
            },

              async getDynamicCategory({ commit,state}){
                    api.getDynamicCategory().then((response) => {

                      const categoryInfo = response.body.map((item) => {

                          const {
                            id,
                            name
                          } = item;
                          const posts = []
                          if(item.posts.size!=0){
                            _.forEach(item.posts,function(v,k,l){

                              if(v.better_featured_image == null||v.better_featured_image.media_details == null){
                                var image = ''
                              }else {
                                var image = v.better_featured_image.media_details.sizes.medium.source_url
                              }

                              posts.push({
                                subTitle:v.title.rendered,
                                abstract:_trim(_trim(v.excerpt.rendered, '<p>'), `</p>\n`),
                                link:v.link,
                                img:image,
                                iframeLink:'./dynamic/iframePage'
                              })
                            })
                          }
                           const listLink = "./dynamic/dynamicList"
                        const current = false;
                           return{ id, name,listLink,posts,current}

                      });
                      categoryInfo.unshift({id:'newToShare',name: localStorage.getItem('EP_lang')=='zh'?'新鲜事分享':'Shareing',listLink:'',posts:'',current:false});

                      _.forEach(categoryInfo, function(n, key) {
                        let currentLocal = localStorage.getItem('EP_Activity_Current_Sub_Title')
                        if(currentLocal==undefined){
                          n.id == 'newToShare' ? n.current=true:n.current=false
                        }else{
                          currentLocal == n.id ? n.current=true:n.current=false
                        }
                      });

                        commit('setDynamicCategory', categoryInfo);
                      })
            },


          async getNewToShare({ commit,state},data){
            const newToShare = [];

            api.getNewToShare(data.number).then((response) => {
              const enNews = response.body.map((item) => {
                  const {
                    id,
                    link,
                    type
                  } = item;
                const like = parseInt(item._thumbs_rating_up);
            const img = item.better_featured_image?item.better_featured_image.source_url:'';
            const subtitle = item.title.rendered;
            const text = _trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`);
            const iframeTitle = localStorage.getItem('EP_lang')=='zh'?'新鲜事分享':'Sharing';
            const iframePath = '/dynamic/dynamicList/iframePage';



              newToShare.push({  id, link, type, like, img, subtitle, text, iframeTitle, iframePath })

          });

            //commit('setNewToShare', newToShare);
              commit('setDynamicCategoryList', newToShare);

          });

          },

        async getEnterpriseNews({ commit,state}){

                const enterpriseNews = [];

                api.getEnterpriseNews().then((response) => {
                  const enNews = response.body.map((item) => {
                      const {
                        link
                      } = item;
                const img = item.better_featured_image?item.better_featured_image.source_url:'';
                const subtitle = item.title.rendered;
                const text = [
                  _trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`),
                ];
                const iframeTitle = localStorage.getItem('EP_lang')=='zh'?'企业新闻':'News';
                const iframePath = '/dynamic/iframePage';



                enterpriseNews.push({  link, img, subtitle, text, iframeTitle, iframePath })

              });

              commit('setEnterpriseNews', enterpriseNews);

              });

    },
    async getJournalOfEnterprise({ commit,state}){

      const journalOfEnterprise = [];

      api.getJournalOfEnterprise().then((response) => {
        const enNews = response.body.map((item) => {
            const {
              link
            } = item;
      const img = item.better_featured_image?item.better_featured_image.source_url:'';
      const subtitle = item.title.rendered;
      const text = [
        _trim(_trim(item.excerpt.rendered, '<p>'), `</p>\n`),
      ];
      const iframeTitle = localStorage.getItem('EP_lang')=='zh'?'企业内刊':'Magzines';
      const iframePath = '/dynamic/iframePage';

            journalOfEnterprise.push({  link, img, subtitle, text, iframeTitle, iframePath })

    });

      commit('setJournalOfEnterprise', journalOfEnterprise);

    });

    },
}
    
};

export default moduleDynamic;
