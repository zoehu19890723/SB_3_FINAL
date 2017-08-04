/**
 * @author She.L
 * @version 2016/12/7
 * @description 首页 {热门职位，新进员工}
 */
import api from '../../api'
import {assetsPublicPath} from '../../config'
import {dealUsrPhoto} from '../../utils/tools'

const moduleHome = {
  state: {
    tokenState:[],
    rotateImage:[{medium_large_img:assetsPublicPath+'./static/img/rotate_loading.png'}],
    iconNavigation:[
      {color:"rgb(175, 175, 175)",dest:'',icon:'iconfont icon-more',path:'/home/esshrdetail',title:'Loading...',to:''},
      {color:"rgb(175, 175, 175)",dest:'',icon:'iconfont icon-more',path:'/home/esshrdetail',title:'Loading...',to:''},
      {color:"rgb(175, 175, 175)",dest:'',icon:'iconfont icon-more',path:'/home/esshrdetail',title:'Loading...',to:''},
      ],

    iconNavigationAll:[],
    nineLattices:{
      0:[
        [
        {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
        {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
        {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
        {color:"#dfdfdf",dest:'',dest:'',title:'',to:''}],
        [
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''}],
        [
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''},
          {color:"#dfdfdf",dest:'',dest:'',title:'',to:''}]
      ],

    },
    jobs: [],
    emps: [],
    empDetail:{}
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setTokenState(state, payload){
      state.tokenState = payload;
    },
    setRotateImage(state, payload){
      state.rotateImage = payload;
    },
    setNineLattices(state, payload){
      state.nineLattices = payload;
    },
    setIconNavigation(state, payload){
      state.iconNavigation = payload;
    },
    setIconNavigationAll(state, payload){
      state.iconNavigationAll = payload;
    },
    setJobs(state, payload) {
      state.jobs = payload;
    },

    setEmps(state, payload) {
      state.emps = payload;
    },

    setEmpDetail(state,payload){
      state.empDetail[payload.id] = payload.content;
    },

    updateDes(state,{des,id}){
      state.empDetail[id].description = des;
    }

  },

  actions: {

    async postCheckToken({commit}){

      return api.postCheckToken().then((response) => {

        const tokenState = response.body.data.status

        commit('setTokenState', tokenState);

        return tokenState;

      })
    },

    async getRotateImage({commit}){
      return api.getRotateImage().then((response) => {
        const images = response.body.map((item) => {

            // const rotateImage = item.better_featured_image.source_url;
            // const thumbnail_img = item.better_featured_image.media_details.sizes.thumbnail.source_url;
            // const medium_img = item.better_featured_image.media_details.sizes.medium.source_url;
            const medium_large_img = item.better_featured_image.media_details.sizes.medium_large.source_url;
          //const medium_large_img = item.better_featured_image.source_url

            return { medium_large_img };

          });
          commit('setRotateImage', images);

      })
    },

    async getNineLattices({commit}){
      return api.getNineLattices().then((response) => {
        const items = [];
        response.body.map((item) => {
          if (item.to === 'weStar') {
            item.path = '/home/' + item.dest;
          } else {
            item.path = '/home/iframePage';
          }
          items.push(item);

      });

      while(items.length%4!=0)
      {
        items.push({})
      }

      while (items.length%4!=0);
      const squareInfo12 = _.chunk(items, 12)
      const squareInfo ={};

      _.forEach(squareInfo12, function(n, k) {

          squareInfo[k] = _.chunk(n, 4)
      });


      commit('setNineLattices', squareInfo);

    })
    },
    async getIconNav({commit}){
      api.getIconNavigation().then((response)=>{

        const hotIcons = [];
        response.body.map((item) => {
          item.to = item.to.toLowerCase();
          if (item.to === 'westar') {
            item.path = '/home/' + item.dest;
          } else {
            item.path = item.dest;
          }
          hotIcons.push(item);

        });
        commit('setIconNavigation', hotIcons);
      })
    },
    async getIconNavAll({commit}){
      api.getIconNavigationAll().then((response)=>{

        const allClassification = [];
        const allIcons = {title:'',icons:[]};

        response.body.map((items) => {
          items.icons.map((item) => {
            item.to = item.to.toLowerCase();
            if (item.to === 'westar') {
              item.path = '/home/' + item.dest;
            } else {
              item.path = item.dest;
            }
          })
          while (items.icons.length%4!=0)
          {
            items.icons.push({})
          }

          allClassification.push(items)
        });
        commit('setIconNavigationAll', allClassification);
      })
    },


    async getJobs({ commit }) {
    api.getNewPosition().then((response) => {
          const jobs = response.body.map((item) => {
            const {
              link,
              title,
              job_location: location,
              job_listing_type: type,
              company_tagline: tagline,
              } = item;
            const text = [
              `${location}`,
              `${type}`,
              `${tagline}`,
            ];
            const subtitle = title.rendered;
            const iframeTitle = localStorage.getItem('EP_lang')=='zh'?'热门职位':'Hot Positions';
            const img = item.better_featured_image?item.better_featured_image.source_url:''
            const iframePath = '/home/iframePage';
            return { link, img, subtitle, text, iframeTitle, iframePath };
          });
          commit('setJobs', jobs);
        });
    },

    async getEmps({ commit }) {
      api.getNewEmployee().then((response) => {

          const emps = response.body.map((item) => {
            const {
              meta,
              name,
              avatar_urls,
              } = item;
            const id = item.id
            const link = ''
            const description = item.description;
            const enterDate = item.meta.emp_onboarding_date
            const photo = item.meta.emp_photo ? (item.meta.emp_photo_prefix+item.meta.emp_photo) : '';
            const displayName_CN = item.meta.emp_fullname_zh_CN==''?'没找到用户中文姓名':item.meta.emp_fullname_zh_CN;
            const displayName_US = item.meta.emp_fullname_en_US==''?'No English name information':item.meta.emp_fullname_en_US;
            const position_CN = item.meta.position_zh_CN==''?'未填写职位信息':item.meta.position_zh_CN;
            const position_US = item.meta.position_en_US==''?'No position information':item.meta.position_en_US;
            const department_CN = item.meta.org_zh_CN==''?'未填写部门信息':item.meta.org_zh_CN;
            const department_US = item.meta.org_en_US==''?'No department information':item.meta.org_en_US;
            const gender = item.meta.emp_gender || 2;
            const nameTxt = item.meta.emp_fullname_zh_CN ? item.meta.emp_fullname_zh_CN : (item.meta.emp_fullname_en_US ? item.meta.emp_fullname_en_US : (item.name ? item.name : ''));
            return { id, description,enterDate, link, photo, displayName_CN,displayName_US, position_CN,position_US,department_CN,department_US,gender,nameTxt};
          });
          commit('setEmps', emps);
        });
    },
    async getEmpDetail({ commit,state },data) {
      const empDetail = {};
      return api.getEmployeeDetail(data.userId).then((response) => {
        var empDetailObj = {
          id:'',
          content:{}
        };
        empDetail.id = response.body.id;
        empDetail.photo = response.body.meta.emp_photo ? response.body.meta.emp_photo_prefix + response.body.meta.emp_photo : '';
        empDetail.likeUrl = './empDetailPage/sendLikes';
        empDetail.sendUrl = './empDetailPage/sendWishes';
        empDetail.birthday = response.body.meta.emp_birthday;
        empDetail.displayName_CN = response.body.meta.emp_fullname_zh_CN==''?'没找到用户中文姓名':response.body.meta.emp_fullname_zh_CN;
        empDetail.displayName_US = response.body.meta.emp_fullname_en_US==''?'No English name information':response.body.meta.emp_fullname_en_US;
        empDetail.department_CN = response.body.meta.org_zh_CN==''?'未填写部门信息':response.body.meta.org_zh_CN;
        empDetail.department_US = response.body.meta.org_en_US==''?'No department information':response.body.meta.org_en_US;
        empDetail.position_CN = response.body.meta.position_zh_CN==''?'未填写职位信息':response.body.meta.position_zh_CN;
        empDetail.position_US = response.body.meta.position_en_US==''?'No position information':response.body.meta.position_en_US;
        empDetail.email = response.body.email;
        empDetail.gender = response.body.meta.emp_gender;
        empDetail.mobile = response.body.meta.emp_mobile;
        empDetail.description = response.body.description;
        empDetail.nameTxt = response.body.meta.emp_fullname_zh_CN ? response.body.meta.emp_fullname_zh_CN : (response.body.meta.emp_fullname_en_US ? response.body.meta.emp_fullname_en_US : (response.body.name ? response.body.name : ''));

        empDetailObj.id = data.userId
        empDetailObj.content = empDetail;

        commit('setEmpDetail', empDetailObj);
        return empDetailObj;

      });
    },

    async saveMyDescription({ commit,state },{des,id}){
      return api.saveMyDescription(des,id).then((response)=>{
        return response.body.description || '';
      })
    }
  },
};

export default moduleHome;
