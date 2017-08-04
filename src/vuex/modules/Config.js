/**
 * @author She.L
 * @version 2016/12/14
 * @description 设置
 */
import Vue from 'vue';


const ModuleConfig = {
  state: {
    lang: '',
    sendCard:{}
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    /**
     * @param {string} payload
     */
    setLang(state, payload) {
      state.lang = payload;
      Vue.config.lang = state.lang;
    },
    setSendCard(state, payload){
      state.sendCard = payload;
    },
    clearSendCard(state, payload){
      state.sendCard = {};
    }

  },

};

export default ModuleConfig;
