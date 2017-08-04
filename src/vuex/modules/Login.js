/**
 * @author She.L
 * @version 2016/12/7
 * @description 登录页 {用户名，密码}
 */
import api from '../../api'

const moduleLogin = {
  state: {
    user_display_name: '',
    user_display_name_zh: '',
    user_display_name_us: '',
    user_display_position_zh:'',
    user_display_position_us:'',
    user_nicename:'',
    user_email: '',
    user_id:'',
    weStarSession:'',
    user_photo:'',
    appMenus:[]
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setWeStarSession(state, { weStarSession }) {
      state.weStarSession = weStarSession;
    },
    setUser(state,{user}){
      state.user_display_name = user.user_display_name;
      state.user_display_name_zh = user.user_display_name_zh;
      state.user_display_name_us = user.user_display_name_us;
      state.user_display_position_zh = user.user_display_position_zh;
      state.user_display_position_us = user.user_display_position_us;
      state.user_nicename = user.user_nicename;
      state.user_email = user.user_email;
      state.user_id = user.user_id;
      state.user_photo = user.user_photo;
    },
    setAppMenus(state, payload){
      state.appMenus = payload;
    },

  },
  actions: {
    async getAppMenus({commit}){
      return api.getDynamicMenu().then((response) => {
        const menus = response.body.map((item) => {
             console.log(item);
          // const rotateImage = item.better_featured_image.source_url;
          // const thumbnail_img = item.better_featured_image.media_details.sizes.thumbnail.source_url;
          // const medium_img = item.better_featured_image.media_details.sizes.medium.source_url;
          //const medium_large_img = item.better_featured_image.media_details.sizes.medium_large.source_url;
          //const medium_large_img = item.better_featured_image.source_url

          //return { medium_large_img };

        });
        //commit('setRotateImage', images);

      })
    },
  }

};

export default moduleLogin;
