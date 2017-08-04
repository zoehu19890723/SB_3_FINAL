import Vue from 'vue';
import VueRouter from 'vue-router';
import my from './views/my/my';
import myParent from './views/my/myParent';
import more from './views/more';
import homeParent from './views/homeParent';
import home from './views/home';
import dynamicParent from './views/dynamicParent';
import dynamic from './views/dynamic';
import announcementParent from './views/announcementParent';
import announcement from './views/announcement';
import announcementList from './views/announcementList';
import dynamicList from './views/dynamicList';
import iframePage from './views/iframePage';
import hotPositionPage from './views/hotPositionPage';
import newEmpListPage from './views/employee/newEmpListPage';
import empDetailPage from './views/employee/empDetailPage';
import personalInformation from './views/employee/personalInformation';
import personalDynamic from './views/employee/personalDynamic'
import personalBlog from './views/employee/personalBlog';
import personalWishes from './views/employee/personalWishes';
import personalLikes from './views/employee/personalLikes';
import sendLikes from './views/employee/sendLikes';
import sendWishes from './views/employee/sendWishes';
import mySkillAdd from './views/my/mySkillAdd';
import cardDetail from './views/employee/cardDetail';
import sendCard from './views/employee/sendCard';
import cardType from './views/employee/cardType';
import login from './views/login';
import main from './views/main';
import ConfigMenu from './views/Config/ConfigMenu/ConfigMenu';
import LanguageConfig from './views/Config/LanguageConfig/LanguageConfig';
import AccountSetting from './views/Config/AccountSetting';
import Feedback from './views/Config/Feedback';
import About from './views/Config/About/About';
import myDynamic from './views/my/myDynamic';
import myDynamicDetail from './views/my/myDynamicDetail';
import addDynamic from './views/my/addDynamic';
import myBlog from './views/my/myBlog';
import myInformation from './views/my/myInformation';
import editInformation from './views/my/editInformation';

import payslip from './views/payslip/payslip';
import insurance from './views/insurance/insurance';
import fund from './views/fund/fund';
import profile from './views/profile/profile';
import profileSub from './views/profile/profileSub';
import profileEditInput from './views/profile/profileEditInput';
import profileEditSelector from './views/profile/profileEditSelector';
import profileEditForm from './views/profile/profileEditForm';
import profileAttendanceSummary from './views/profile/profileAttendanceSummary';

import leave from './views/leave/leave';
import leaveQuota from './views/leave/leaveQuota';
import leaveInfo from './views/leave/leaveInfo';
import leaveApply from './views/leave/leaveApply';
import leaveApprove from './views/leave/leaveApprove';
import leaveDetail from './views/leave/leaveDetail';

import overtime from './views/overtime/overtime';
import overtimeInfo from './views/overtime/overtimeInfo';
import overtimeApply from './views/overtime/overtimeApply';
import overtimeApprove from './views/overtime/overtimeApprove';
import overtimeDetail from './views/overtime/overtimeDetail';

import prove from './views/prove/prove';
import proveInfo from './views/prove/proveInfo';
import proveApply from './views/prove/proveApply';
import proveApprove from './views/prove/proveApprove';
import proveDetail from './views/prove/proveDetail';

import general from './views/general/general';
import generalInfo from './views/general/generalInfo';
import generalApply from './views/general/generalApply';
import generalApprove from './views/general/generalApprove';
import generalDetail from './views/general/generalDetail';

import approve from './views/approve/approve';
import approveDetail from './views/approve/approveDetail';

import team from './views/team/team';
import uploadPic from './views/UploadPhoto';
import helpDoc from './views/helpDoc';

import review from './views/review/review';
import idImg from './views/review/idImg';
import commonImg from './views/review/commonImg';

import contactParent from './views/contact/contactParent';
import contact from './views/contact/contact';

import activity from './views/activity/activity';
import activityDetail from './views/activity/activityDetail';
import activityParent from './views/activity/activityParent';

import attendanceParent from './views/attendance/attendanceParent';
import attendance from './views/attendance/attendance';
import outing from './views/attendance/outing';
import summary from './views/attendance/summary';

import punchParent from './views/punchrequest/punchParent';
import punchSummary from './views/punchrequest/punchSummary';
import punch from './views/punchrequest/punch';
import punchApply from './views/punchrequest/punchApply';
import punchInfo from './views/punchrequest/punchInfo';
import punchApprove from './views/punchrequest/punchApprove';
import punchDetail from './views/punchrequest/punchDetail';

Vue.use(VueRouter)
  // export default routes
const route = new VueRouter({
  mode: 'history',

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },

  base: __dirname,

  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, {
    path: '/main',
    component: main,
    children: [{
      path: '',
      redirect: '/home'
    }, {
      path: '/home',
      component: homeParent,
      children: [{
        path: '',
        component: home
      }, {
        path: 'iframePage',
        component: iframePage
      }, {
        path: 'navMore',
        component: more
      }, {
        path: 'hotPositionPage',
        component: hotPositionPage
      }, {
        path: 'newEmpListPage',
        component: newEmpListPage
      }, {
        path: 'hotPositionPage/iframePage',
        component: iframePage
      }, {
        path: 'newEmpListPage/empDetailPage',
        component: empDetailPage
      }, {
        path:'newEmpListPage/empDetailPage/cardDetail',
        component: cardDetail
      },{
        path: 'newEmpListPage/empDetailPage/cardDetail/sendCard',
        component: sendCard
      },{
        path: 'newEmpListPage/empDetailPage/cardDetail/sendCard/cardType',
        component: cardType
      },{
        path: 'newEmpListPage/empDetailPage/personalInformation',
        component: personalInformation
      }, {
        path: 'newEmpListPage/empDetailPage/personalDynamic',
        component: personalDynamic
      }, {
        path: 'newEmpListPage/empDetailPage/personalBlog',
        component: personalBlog
      }, {
        path: 'newEmpListPage/empDetailPage/personalWishes',
        component: personalWishes
      }, {
        path: 'newEmpListPage/empDetailPage/personalLikes',
        component: personalLikes
      }, {
        path: 'newEmpListPage/empDetailPage/sendLikes',
        component: sendLikes
      }, {
        path: 'newEmpListPage/empDetailPage/sendWishes',
        component: sendWishes
      }, {
        path: 'newEmpListPage/empDetailPage/personalDynamic/iframePage',
        component: iframePage
      }, {
        path: 'mypayrolllist', //我的工资单
        component: payslip
      }, {
        path: 'payrolldetail', //我的工资单
        component: payslip
      }, {
        path: 'security', //我的社保
        component: insurance
      }, {
        path: 'fund', //我的公积金
        component: fund
      }, {
        path: 'esshrdetail', //我的信息
        component: profile
      }, {
        path: 'esshrdetail1', //我的信息详情
        component: profileSub
      }, {
        path: 'esshrdetail2', //我的信息编辑（单条,文本）
        component: profileEditInput
      }, {
        path: 'esshrdetail5', //我的信息编辑（单条,selector）
        component: profileEditSelector
      }, {
        path: 'esshrdetail3', //我的信息编辑（表单）
        component: profileEditForm
      }, {
        path: 'esshrdetail4', //休假汇总详情
        component: profileAttendanceSummary
      }, {
        path: 'leave', //我的休假首页
        component: leave
      }, {
        path: 'leave1', //我的休假配额
        component: leaveQuota
      }, {
        path: 'leave2', //我提交的休假
        component: leaveInfo
      }, {
        path: 'leave3', //休假申请
        component: leaveApply
      }, {
        path: 'leave4', //我需要审批的休假
        component: leaveApprove
      }, {
        path: 'leave5', //休假详情
        component: leaveDetail
      }, {
        path: 'overtime', //我得加班首页
        component: overtime
      }, {
        path: 'overtime1', //我提交的加班
        component: overtimeInfo
      }, {
        path: 'overtime2', //加班申请
        component: overtimeApply
      }, {
        path: 'overtime3', //我要审批的加班
        component: overtimeApprove
      }, {
        path: 'overtime4', //加班详情
        component: overtimeDetail
      }, {
        path: 'prove', //我的证明申请首页
        component: prove
      }, {
        path: 'prove1', //我提交的证明申请
        component: proveInfo
      }, {
        path: 'prove2', //证明申请
        component: proveApply
      }, {
        path: 'prove3', //我要审批的证明申请
        component: proveApprove
      }, {
        path: 'prove4', //证明申请详情
        component: proveDetail
      }, {
        path: 'general', //我的通用申请首页
        component: general
      }, {
        path: 'general1', //我提交的通用申请
        component: generalInfo
      }, {
        path: 'general2', //通用申请
        component: generalApply
      }, {
        path: 'general3', //我要审批的通用申请
        component: generalApprove
      }, {
        path: 'general4', //通用申请详情
        component: generalDetail
      }, {
        path: 'approval', //我的审批列表
        component: approve
      }, {
        path: 'approval1', //异动审批详情
        component: approveDetail
      }, {
        path: 'subordinate', //我的下属
        component: team
      }, {
        path: 'uploadPic', //上传照片
        component: uploadPic
      }, {
        path: 'helpDoc', //上传照片
        component: helpDoc
      }, {
        path: 'review', //上传照片
        component: review
      }, {
        path: 'review/idImg', //上传照片
        component: idImg
      }, {
        path: 'review/commonImg', //上传照片
        component: commonImg
      }, {
        path: 'attend', //我的考勤
        component: attendanceParent,
        children :[{
          path: 'attend1', //补打卡
          component: attendance,
        }, {
          path: 'attend2',
          component: outing
        }, {
          path: 'attend3',
          component: summary
        }]
      }, {
        path: 'punchrequest', //补打卡
        component: punchParent,
        children: [{
          path: 'punchSummary', //补打卡
          component: punchSummary,
        }, {
          path: 'punch',
          component: punch
        }, {
          path: 'punch1',
          component: punchInfo
        }, {
          path: 'punch2',
          component: punchApprove
        }, {
          path: 'punch3',
          component: punchApply
        }, {
          path: 'punch4',
          component: punchDetail
        }]
      }]
    }, {
      path: '/dynamic',
      component: dynamicParent,
      children: [{
        path: '',
        component: dynamic
      }, {
        path: 'iframePage',
        component: iframePage
      }, {
        path: 'dynamicList',
        component: dynamicList
      }, {
        path: 'dynamicList/iframePage',
        component: iframePage
      }]
    }, {
      path: '/announcement',
      component: announcementParent,
      children: [{
        path: '',
        component: announcement
      }, {
        path: 'iframePage',
        component: iframePage
      }, {
        path: 'announcementList',
        component: announcementList
      }, {
        path: 'announcementList/iframePage',
        component: iframePage
      }]
    }, {
      path: '/contact',
      component: contactParent,
      children: [{
        path: '',
        component: contact
      }, {
        path: 'empDetailPage',
        component: empDetailPage
      }, {
        path: 'empDetailPage/cardDetail',
        component: cardDetail
      },{
        path: 'empDetailPage/cardDetail/sendCard',
        component: sendCard
      },{
        path: 'empDetailPage/cardDetail/sendCard/cardType',
        component: cardType
      },{
        path: 'empDetailPage/personalInformation',
        component: personalInformation
      }, {
        path: 'empDetailPage/personalDynamic',
        component: personalDynamic
      }, {
        path: 'empDetailPage/personalBlog',
        component: personalBlog
      }, {
        path: 'empDetailPage/personalWishes',
        component: personalWishes
      }, {
        path: 'empDetailPage/personalLikes',
        component: personalLikes
      }, {
        path: 'empDetailPage/sendLikes',
        component: sendLikes
      }, {
        path: 'empDetailPage/sendWishes',
        component: sendWishes
      }, {
        path: 'empDetailPage/personalDynamic/iframePage',
        component: iframePage
      }]
    }, {
      path: '/activity',
      component: activityParent,
      children: [{
        path: '',
        component: activity
      }, {
        path: 'activityDetail',
        component: activityDetail
      }]
    }, {
      path: '/my',
      component: myParent,
      children: [{
        path: '',
        component: my
      }, {
        path: 'config',
        component: ConfigMenu
      }, {
        path: 'config/languageConfig',
        component: LanguageConfig,
      }, {
        path: 'config/accountSetting',
        component: AccountSetting
      }, {
        path: 'config/feedback',
        component: Feedback
      }, {
        path: 'config/about',
        component: About,
      },{
          path:'sendLikes',
          component:sendLikes,
        },{
        path:'sendWishes',
        component:sendWishes,
      },{
        path: 'myInformation',
        component: myInformation,
      }, {
        path: 'myInformation/editInformation',
        component: editInformation,
      }, {
        path: 'myDynamic',
        component: myDynamic,
      }, {
        path: '/my/myDynamic/addDynamic',
        component: addDynamic,
      }, {
        path: '/my/myDynamic/myDynamicDetail',
        component: myDynamicDetail,
      }, {
        path: '/my/myDynamic/iframePage',
        component: iframePage
      }, {
        path: '/my/myBlog/iframePage',
        component: iframePage
      }, {
        path: 'myBlog',
        component: myBlog,
      }, {
        path: 'myWishes',
        component: personalWishes,
      }, {
        path: 'myLikes',
        component: personalLikes,
      }, {
        path: 'sendLikes',
        component: sendLikes
      }, {
        path: 'sendWishes',
        component: sendWishes
      },{path:'mySkillAdd',
        component: mySkillAdd
      }]
    }, {
      path: '/EP-Portal/',
      redirect: '/login'
    }, {
      path: 'index.html',
      component: login
    }],
  }],

})

export default route;
