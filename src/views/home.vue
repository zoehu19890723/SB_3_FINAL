<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <swiper :options="swiperOption">
        <swiper-slide v-for="swiperSRC in swiperImgs">
          <img class="swiper-img"  :src="swiperSRC.medium_large_img" >
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>

        <iconNav :propItems="iconNavigation"/>

        <DMediaList :propTitle="$t('title[0]')" :propItems="jobs"/>
        <NewEmpList :propTitle="$t('title[1]')" :propItems="emps"/>

    </v-content>
  </div>
</template>

<script>

  import VContent from '../components/Content';
  import NavBar from '../components/NavBar';
  import VGridCol from '../components/Grid-col';
  import VGridRow from '../components/Grid-row';
  import DMediaList from '../components/Demo-mediaList';
  import DNewEmpList from '../components/Demo-new-emp-list';
  import NewEmpList from '../components/New-emp-list';
  import F7swiper from '../components/F7-swiper';
  import iconNav from '../components/Icon-navigation'
  import {assetsPublicPath,API_ROOT} from '../config';
  import _ from 'lodash';
  import {openLink} from '../utils/tools';

  export default {

    created(){
      var self = this;
      this.$store.dispatch('getRotateImage');
      //this.$store.dispatch('getNineLattices');
      this.$store.dispatch('getIconNav');
      this.$store.dispatch('getJobs');
      this.$store.dispatch('getEmps');

      this.$store.commit('showFooter');

      if(localStorage.getItem('EP_lang')&&localStorage.getItem('EP_lang')!=''){
        this.lang = localStorage.getItem('EP_lang')=='zh'?'zh_cn':'en_us'
      }else{
        if(navigator.language.substr(0,2)=='zh'){
          this.lang = 'zh_cn'
        }else{
          this.lang = 'en_us'
        }
      }

      this.userName = this.$store.state.moduleLogin.user_nicename;



      _.forEach(this.$t('empItems'), function(n, key) {
        //console.log(n);
      });

    },

    mounted(){

    },

    name: 'carrousel',

    data() {
      return {
        header:{
          backShow:false,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('header[0].title')
        },
        baseImgUrl:assetsPublicPath,
        baseUrl: assetsPublicPath + 'static/img/icons/',
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
        },
        swiperOptionNine: {
          autoplay: false,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          initialSlide :localStorage.getItem('EP_home_nav_index')?localStorage.getItem('EP_home_nav_index'):0,
          onTransitionStart(swiper){
            localStorage.setItem('EP_home_nav_index',swiper.activeIndex);
          },
        },
        swiperSRCs:[
          { src: 'static/img/EP-Banner-005.png' },
          { src: 'static/img/EP-Banner-006.png' },
          {src:'static/img/EP-Banner-00.png'},
          { src: 'static/img/EP-Banner-01.png' },
          { src: 'static/img/EP-Banner-02.png' },
          { src: 'static/img/EP-Banner-03.png' }
        ],
        columnStyle: 'border: none; padding:5px; text-align: center',
        userName:'',
        lang:'',
        index:localStorage.getItem('EP_home_nav_index')?localStorage.getItem('EP_home_nav_index'):0,
        colWidth:'25',
        text:'25%',
        links01:[
          [ 'weStar',
            'weStar',
            'weStar',
            'weStar'],[
            API_ROOT+'en/total-rewards',
            'http://timesheet.cdpgroupltd.com:8000/nwbc/?sap-client=888&sap-language=en&from=',
            API_ROOT+'en/insurance',
            API_ROOT+'en/finance'
          ],[
            'http://demo.cdp-life.com/wap/tmpl/member/ext_login.html?idstr=aIHUhInrSlYHqgIZdQlbnXZhTd7SY4qt&app_id=EP_DEMO&username=13809234126&sign=0497cdd42678bfcca3061e82b8de140c&t=1480654792',
            API_ROOT+'en/health',
            API_ROOT+'en/e-learning',
            'http://salesdemo4.successfactors.com/login#/login'
          ]
        ],
        links02:[
          [ 'weStar',
            'weStar',
            'weStar'
          ],
        ],
        links01ZH:[
          [ 'weStar',
            'weStar',
            'weStar',
            'weStar'],[
            API_ROOT+'en/total-rewards',
            'http://timesheet.cdpgroupltd.com:8000/nwbc/?sap-client=888&sap-language=en&from=',
            API_ROOT+'insurance',
            API_ROOT+'finance'
          ],[
            'http://demo.cdp-life.com/wap/tmpl/member/ext_login.html?idstr=aIHUhInrSlYHqgIZdQlbnXZhTd7SY4qt&app_id=EP_DEMO&username=13809234126&sign=0497cdd42678bfcca3061e82b8de140c&t=1480654792',
            API_ROOT+'health',
            API_ROOT+'e-learning',
            'http://salesdemo4.successfactors.com/login#/login'
          ]
        ],
        links02ZH:[
          [ 'weStar',
            'weStar',
            'weStar'
          ]
        ],
        emplinks:[
          'http://demo.cdpyun.com/staffs/charlie-zhai',
          'http://demo.cdpyun.com/staffs/vincent-liu',
          'http://demo.cdpyun.com/staff/roger'
        ]
      }
    },


    computed: {

      onSlideChangeStart (currentPage) {
        //console.log('onSlideChangeStart', currentPage);
      },

//      nineLattices(){
//        return this.$store.state.moduleHome.nineLattices
//      },

      iconNavigation(){
        return this.$store.state.moduleHome.iconNavigation
      },

      swiperImgs(){
        return this.$store.state.moduleHome.rotateImage
      },

      jobs() {
        return this.$store.state.moduleHome.jobs.slice(0,3);
      },

      emps() {
        return this.$store.state.moduleHome.emps.slice(0,3);
      },
    },

    methods:{
      onSlideChangeEnd (currentPage) {
        localStorage.setItem('EP_home_nav_index',currentPage);
      },
      openInappBrowser (obj){

        let baseURL = '';

        if(obj.to == 'CDPLife'){

          baseURL = obj.redirect + '&username=' + localStorage.getItem('EP_user_login_name')

        }else{

          baseURL = obj.redirect

        }

        // if(localStorage.getItem('EP_browser')==="android"){
        //   var ref = cordova.InAppBrowser.open(baseURL, '_blank', 'location=yes,toolbar=yes');
        // }else{
        //   var ref = cordova.InAppBrowser.open(baseURL, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption='+this.$t('button'));
        // }
        // ref.show();
        let path = '/home/iframePage';
        openLink(baseURL,obj.title,path)

      }
    },

    /**
     * @description 多语言
     */
    locales: {
      en: {
        title: ['Hot Jobs', 'New Employee'],
        header: [{
          title: 'CDP Portal'
        }],
        gridItems:[
          [
            {title:'To-do List',icon:'approve.png',color:'orange',from:'ep',dest:'approve'},
            {title:'Leave',icon:'leave.png',color:'green',from:'ep',dest:'leave'},
            {title:'Overtime',icon:'overtime.png',color:'red',from:'ep',dest:'overtime'},
            {title:'Attendance',icon:'attendance.png',color:'blue',from:'ep',dest:'attend'}
          ],[
            {title:'Compensation',icon:'payslip.png',color:'green',from:'ep'},
            {title:'Reimbursement',icon:'reimbursement.png',color:'red',from:'ep'},
            {title:'Insurance',icon:'insurance.png',color:'blue',from:'ep'},
            {title:'Finance',icon:'financial.png',color:'green',from:'ep'}
          ],[
            {title:'CDP-Life',icon:'life.png',color:'red',from:'',to:'life'},
            {title:'Health',icon:'health.png',color:'blue',from:'ep'},
            {title:'e-Learning',icon:'study.png',color:'green',from:'ep'},
            {title:'Performance',icon:'table.png',color:'orange',from:'',to:'sap'},
          ]
        ],
        gridItems02:[
          [
            {title:'Payslips',icon:'wage.png',color:'orange',from:'ep',dest:'payroll'},
            {title:'My team',icon:'subordinate.png',color:'green',from:'ep',dest:'myteam'},
            {title:'Information',icon:'file.png',color:'red',from:'ep',dest:'profile'},
            {}
          ]
        ],
        empItems:[
          {link:'http://demo.cdpyun.com/staffs/charlie-zhai',img:'http://demo.cdpyun.com/wp-content/uploads/2017/01/1111.png',subtitle:'Charlie Zhai',text:['Sales VP'],iframeTitle:'Charlie Zhai',iframePath:'/home/iframePage'},
          {link:'http://demo.cdpyun.com/staffs/vincent-liu',img:'http://demo.cdpyun.com/wp-content/uploads/2017/01/2222.png',subtitle:'Vincent Liu',text:['Sales Manager'],iframeTitle:'Vincent Liu',iframePath:'/home/iframePage'},
          {link:'http://demo.cdpyun.com/staff/roger',img:'http://demo.cdpyun.com/wp-content/uploads/2017/01/A0045.jpg',subtitle:'Roger Yang',text:['Product Manager'],iframeTitle:'Roger Yang',iframePath:'/home/iframePage'},
        ],
        button:'Close'
      },
      zh: {
        title: ['热门职位', '新进员工'],
        header: [{
          title: 'CDP一站式服务平台'
        }],
        gridItems:[
          [
            {title:'我的审批',icon:'approve.png',color:'orange',from:'ep',dest:'approve'},
            {title:'我的休假',icon:'leave.png',color:'green',from:'ep',dest:'leave'},
            {title:'我的加班',icon:'overtime.png',color:'red',from:'ep',dest:'overtime'},
            {title:'我的考勤',icon:'attendance.png',color:'blue',from:'ep',dest:'attend'}

          ],[
            {title:'我的薪酬',icon:'payslip.png',color:'green',from:'ep'},
            {title:'我的报销',icon:'reimbursement.png',color:'red',from:'ep'},
            {title:'我的商保',icon:'insurance.png',color:'blue',from:'ep'},
            {title:'我的理财',icon:'financial.png',color:'green',from:'ep'}
          ],[
            {title:'弹性福利',icon:'life.png',color:'red',from:'ep',to:'life'},
            {title:'我的健康',icon:'health.png',color:'blue',from:'ep'},
            {title:'我的学习',icon:'study.png',color:'green',from:'ep'},
            {title:'我的绩效',icon:'table.png',color:'red',from:'',to:'sap'},
          ]
        ],
        gridItems02:[
          [
            {title:'我的工资单',icon:'wage.png',color:'orange',from:'ep',dest:'payroll'},
            {title:'我的团队',icon:'subordinate.png',color:'green',from:'ep',dest:'myteam'},
            {title:'我的信息',icon:'file.png',color:'orange',from:'ep',dest:'profile'},
            {}
          ]
        ],
        empItems:[
          {link:'http://demo.cdpyun.com/staffs/charlie-zhai',img:'http://demo.cdpyun.com/wp-content/uploads/2017/01/1111.png',subtitle:'翟海锋',text:['华南区销售副总'],iframeTitle:'翟海锋',iframePath:'/home/iframePage'},
          {link:'http://demo.cdpyun.com/staffs/vincent-liu',img:'http://demo.cdpyun.com/wp-content/uploads/2017/01/2222.png',subtitle:'刘文朔',text:['销售经理'],iframeTitle:'刘文朔',iframePath:'/home/iframePage'},
          {link:'http://demo.cdpyun.com/staff/roger',img:'http://demo.cdpyun.com/wp-content/uploads/2017/01/A0045.jpg',subtitle:'杨建涛',text:['产品经理'],iframeTitle:'杨建涛',iframePath:'/home/iframePage'},

        ],
        button:'关闭'
      }
    },

    components: {
      VContent,
      NavBar,
      VGridCol,
      VGridRow,
      DMediaList,
      DNewEmpList,
      NewEmpList,
      F7swiper,
      iconNav
    },

  }
</script>

<style  lang="less" scoped>
  @import '../assets/less/common.less';
  .swiper-pagination-bullet-active{
    background-color:@cdp-main-color;
  }
  .center{
    margin-left: -20px!important;
    overflow: visible!important;
  }
  .white-bg{
    background: white;
    padding: 0.333rem 0;
    border-top: 1px solid  #e4e4e4;
    border-bottom: 1px solid  #e4e4e4;
    border-color:transform;
  }
  .swiper-img{
    width: 100%;
  }
  .btn-circle{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-grid{
    margin: 1rem 0;
    font-size: 12px;
  }
  .btn-distance{
    padding-bottom: 10px;
  }

</style>
