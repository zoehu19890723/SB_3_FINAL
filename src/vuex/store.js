import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import moduleLogin from './modules/Login';
import moduleHome from './modules/Home';
import moduleDynamic from './modules/dynamic';
import moduleMy from './modules/My';
import moduleAnnouncement from './modules/Announcement';
import moduleConfig from './modules/Config';
import modulePayslip from './modules/Payslip';
import moduleInsurance from './modules/Insurance';
import moduleFund from './modules/Fund';
import moduleProfile from './modules/Profile';
import moduleApply from './modules/Apply';
import moduleTeam from './modules/Team';
import moduleReview from './modules/Review';
import moduleContact from './modules/Contact';
import moduleActivity from './modules/Activity';
import moduleAttend from './modules/Attend';

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.debug = true;

let epIndex = window.location.href.indexOf('index.html')
const debug = process.env.NODE_ENV !== 'production';
const epBaseURL = window.location.href.substring(0,epIndex!=-1?epIndex:window.location.href.length)

export default new Vuex.Store({
  state:{
    config:{
      epBaseURL:epBaseURL
    },
    head:{
      backShow:Boolean,
      rightShow:Boolean,
      rightInfo:String,
      show:Boolean,
      title:String
    },
    footer:{
      show:true
    },
    mask : {
      show : false,
      text : 'loading',
      loading : true
    }
  },

  getters:{
    config:state=>state.config,
    head:state=>state.head,
    footer:state=>state.footer,
    mask : state => state.mask
    },

  mutations:{
    setHead(state,head){
      state.head.backShow=head.backShow;
      state.head.rightShow=head.rightShow;
      state.head.rightInfo=head.rightInfo;
      state.head.show=head.show;
    },

    showFooter(state){
      state.footer.show=true;
    },

    hideFooter(state){
      state.footer.show=false;
    },

    setMask(state,mask){
      if(mask.loading === undefined){
        mask.loading = true;
      }
      state.mask = mask;
    },

    hideMask(state){
      state.mask.show = false;
    }
  },

  actions: {},

  modules: {
    moduleLogin,
    moduleHome,
    moduleDynamic,
    moduleMy,
    moduleAnnouncement,
    moduleConfig,
    modulePayslip,
    moduleInsurance,
    moduleProfile,
    moduleApply,
    moduleTeam,
    moduleFund,
    moduleReview,
    moduleContact,
    moduleActivity,
    moduleAttend
  },

  strict: debug

})

