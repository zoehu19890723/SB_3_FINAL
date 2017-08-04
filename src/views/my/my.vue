<template>
  <div class="page">
    <NavBar :headerInfo="header" rightEnable="true" :rightClick = "rightClick"></NavBar>

  <v-content className="page-content">
    <EmployeeCard  :propItem="employee" :userId="employee.id"/>
    <EmployeeMedals  :propItem="medals"/>
    <EmployeeBlessingCard :propTitle="$t('subtitle')[4]" :propItem="cards" :cardDetailPath="cardDetailPath"/>

    <div class="content-block" style="margin: 0;padding: 0">
      <div class="content-block-inner" style="padding-top: 0;padding-right:0">
        <div class="subtitle-in" style="font-size: 14px;line-height: 30px;padding-left: 15px;">
         <span> {{$t('subtitle')[3]}}</span>
          <span style="float: right;margin-right: 12px">
            <router-link to="/my/mySkillAdd">
              <i class="iconfont icon-plus1 color-red" style="font-size: 14px;"></i>
              </router-link>
          </span>
        </div>
        <div v-if="totalSkills&&totalSkills.length>0" style="padding: 5px 15px;">
          <div class="chip" style="padding-left: 0;margin-right: 5px;" v-for="skill in totalSkills">
            <div class="chip-media bg-red" style="height: 23px; width: 25px;border-radius:5px 0 0 5px;">{{skill.count}}</div>
            <div class="chip-label" style="max-width: 270px;">{{skill.name}}</div>
            <a v-on:click="delateSkill(skill.id)" class="chip-delete"></a>
          </div>
        </div>
        <div v-else>
          <i class="icon iconfont icon-gth color-gray" style="margin: 0 0 0 15px;color:gray!important;font-size: 16px;"></i>
          <span class="color-gray" style="font-size: 14px;">{{$t('mySkillsEmpty')}}</span>
        </div>
      </div>
    </div>

    <div class="list-block" style="margin-bottom:35px; ">
      <ul>
        <li>
          <router-link class="item-link item-content" :to="{ path: '/my/myInformation', query: { id: userId }}">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-geren color-gray" style="margin-right: 10px"></i>
                <span class="color-black">{{ $t('settings.personalInfo') }}</span></div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="item-link item-content" :to="{ path: '/my/myDynamic',query: { id: userId }}">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-comment1 color-gray" style="margin-right: 10px"></i>
                <span class="color-black">{{ $t('settings.dynamic') }}</span>
              </div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="item-link item-content" to="/my/myBlog">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-wendang color-gray" style="margin-right: 10px"></i>
                <span class="color-black">{{ $t('settings.blog') }}</span>
              </div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="item-link item-content" :to="{ path: '/my/myWishes',query: { id: userId }}">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-lipin color-gray" style="margin-right: 10px"></i>
                <span class="color-black">{{ $t('settings.wishes') }}</span>
              </div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link class="item-link item-content" :to="{ path: '/my/myLikes',query: { id: userId }}">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-zanzan color-gray" style="margin-right: 10px"></i>
                <span class="color-black">{{ $t('settings.like') }}</span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </v-content>
 </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import EmployeeCard from '../../components/EmployeeCard.vue';
  import EmployeeMedals from '../../components/EmployeeMedals.vue';
  import EmployeeBlessingCard  from '../../components/EmployeeBlessingCard.vue'
  import {assetsPublicPath,APP_ENV_NOW} from '../../config';
  import { signOut } from '../../utils/authService';
  import {openLink} from '../../utils/tools';
  import api from '../../api'

  export default {
    name: 'Me',
    created(){
        let self = this;
        if(self.$store.state.moduleMy.empBlessCards[self.userId]){
          self.cards = self.$store.state.moduleMy.empBlessCards[self.userId]
          self.$store.dispatch('getEmpBlessCards',{userId:self.userId})
        }else{
          self.$store.dispatch('getEmpBlessCards',{userId:self.userId}).then(function () {
            self.cards = self.$store.state.moduleMy.empBlessCards[self.userId]
          })
        }
      self.$store.dispatch('getSkills',{userId:self.userId,endorser_id:self.userId})

      if(self.$store.state.moduleMy.myMedal[self.userId]){
        self.medals = self.$store.state.moduleMy.myMedal[self.userId];
        self.$store.dispatch('getMyMedal',{userId:self.userId});
      }else{
        f7.showIndicator()
        self.$store.dispatch('getMyMedal',{userId:self.userId}).then(function () {
          self.medals = self.$store.state.moduleMy.myMedal[self.userId]
          f7.hideIndicator()
        })
      }

      if(localStorage.getItem('EP_lang')=='zh'){
        this.title = localStorage.getItem('EP_user_display_name_zh')
        this.position = localStorage.getItem('EP_user_position_zh')
      }else{
        this.title = localStorage.getItem('EP_user_display_name_us')
        this.position = localStorage.getItem('EP_user_position_us')
      }
     },
    data() {
      return {
        header:{
          backShow:false,
          rightShow:true,
          rightIcon:'chuzhenbiaoshezhi',
          iconColor:'gray',
          show:true,
          title:this.$t('header.title')
        },
        employee:{
          email:localStorage.getItem('EP_user_email'),
          abbChar:'',
          gender:localStorage.getItem('EP_user_gender'),
          birthday:localStorage.getItem('EP_user_birthday'),
          likeUrl:'./my/sendLikes',
          sendUrl:'./my/sendWishes',
          displayName_CN:localStorage.getItem('EP_user_display_name_zh')==''?'没找到用户中文姓名':localStorage.getItem('EP_user_display_name_zh'),
          displayName_US:localStorage.getItem('EP_user_display_name_us')==''?'No English name information':localStorage.getItem('EP_user_display_name_us'),
          department_CN:localStorage.getItem('EP_user_department_zh')==''?'未填写部门信息':localStorage.getItem('EP_user_department_zh'),
          department_US:localStorage.getItem('EP_user_department_us')==''?'No department information':localStorage.getItem('EP_user_department_us'),
          description:'',
          hasImg:true,
          id:localStorage.getItem('EP_user_id'),
          mobile:localStorage.getItem('EP_user_mobile')?localStorage.getItem('EP_user_mobile'):'',
          nameTxt:'',
          photo:localStorage.getItem('EP_user_photo'),
          photoColor:'',
          position_CN:localStorage.getItem('EP_user_position_zh')==''?'未填写职位信息':localStorage.getItem('EP_user_position_zh'),
          position_US:localStorage.getItem('EP_user_position_us')==''?'No position information':localStorage.getItem('EP_user_position_us'),
        },
        SETTING_PWD_URL:APP_ENV_NOW.SETTING_PWD,
        isWexin : localStorage.getItem('EP_browser')=='weixin',
        userId:localStorage.getItem('EP_user_id'),
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          pagination : '.swiper-pagination',
          paginationHide :true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
            console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        },
        medals:[],
        skills:[],
        cards:[],
        cardDetailPath:''
      }},

    components: {
      VContent,
      NavBar,
      EmployeeCard,
      EmployeeMedals,
      EmployeeBlessingCard
    },

    computed: {
      totalSkills(){
        return this.$store.state.moduleMy.mySkills;
      }
    },

    methods: {
      rightClick(){
        this.$router.push('/my/config');
      },
      delateSkill(id){
          let deleteDom = event.currentTarget.parentElement
          let self = this;

          f7.confirm(self.$t('deleteSkill'), self.$t('deleteSkillTitle'), function () {
            self.$store.commit('setMask',{show:true,text:self.$t('loadingText')});
            api.deleteMySkills(
              {
                skill_id : id,
                action : 'delete'
              }
            ).then((response) =>{
              self.$store.commit('setDeleteSkill',{userId:self.userId,skillId:id})
              deleteDom.remove()
              self.$store.commit('hideMask');
              f7.alert('',self.$t('deleteSucceed'),()=>{
              })
            },(response) => {
              console.log(response)
            })


        });
      }
    },

    /**
     * @description 多语言
     */
    locales: {
      en: {
        header: {
          title: 'My information',
        },
        settings: {
          dynamic:'Dynamic',
          blog:'Blog',
          wishes:'Wishes',
          like:'Like',
          sendWishes:'Send blessings',
          account: 'Password Setting',
          language: 'Language',
          about: 'About CDP Portal',
          version:'Version',
          personalInfo : 'Personal Information'
        },

        button: {
          feedback: 'My Feedback',
          logout: 'Log Out',
          sentGift:'Give Wish'
        },

        personal: {
          name:'Name',
          email:'E-mail',
          position:'Positioin',
          notice: 'Note',
          msg: 'Message',
          friends: 'Friend',
          follow: 'Follow',
          fans: 'Fans',
          birth: '10d to the birthday.',
        },

        subtitle: ['Personal information', 'My medals', 'My achievements','Skill tag','Cards'],
        medal:['十年之星','CDP之星','高潜员工','百狮学员','优质员工','创新达人','学习达人','绩效达人'],
        cards:['优质服务卡','勇于创新卡','敬业勤思卡','乐于助人卡','领域专家卡','正向能量卡'],

        hello:'',
        close:'Close',
        myMedal:'Medals',
        myMedalEmpty:'There is no medal',
        mySkillsEmpty:'Thers is no skill',
        deleteSkill:'Are you sure you want to delete this skill? ',
        deleteSkillTitle:'Delete Skill Tag',
        deleteSucceed:'Delete succeed',
        loadingText:'Loading'
      },

      zh: {
        header: {
          title: '我的信息'
        },

        settings: {
          dynamic:'动态',
          blog:'博客',
          wishes:'祝福',
          sendWishes:'送祝福',
          like:'点赞',
          account: '密码设置',
          language: '语言',
          about: '关于 CDP Portal',
          version:'版本',
          personalInfo : '个人资料'
        },

        button: {
          feedback: '意见反馈',
          logout: '退出',
          sentGift: '送祝福'
        },

        personal: {
            name:'姓名',
          email:'邮箱',
          position:'职位',
          notice: '通知',
          msg: '消息',
          friends: '朋友',
          follow: '关注',
          fans: '粉丝',
          birth: '距生日还有10天',
        },

        subtitle: ['个人资料', '我的勋章', '我的成就','技能标签','卡片'],
        medal:['十年之星','CDP之星','高潜员工','百狮学员','优质员工','创新达人','学习达人','绩效达人'],
        cards:['优质服务卡','勇于创新卡','敬业勤思卡','乐于助人卡','领域专家卡','正向能量卡'],
        hello:'',
        close:'关闭',
        myMedal:'勋章',
        myMedalEmpty:'还没有勋章哦',
        mySkillsEmpty:'还没有技能标签哦',
        deleteSkill:'确定要删除该技能吗? ',
        deleteSkillTitle:'删除技能标签',
        deleteSucceed:'删除成功',
        loadingText:'删除中'
      }
    },

  }

</script>

<style scoped>
  .iconfont{
    font-size: 25px;
  }
  .common-card-item i{
    position: absolute;
    color: white;
    top: 25%;
    right: 11%;
    font-size: 14px;
  }
  .img-response {
    height: 90px;
    width: 90px;
  }
  #profileImg {
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 50%;
    margin: 10px 0;
  }
  .profileItems:after,
  .item-divider:before,
   ul:after {
    height: 0;
  }
  .list-block{
    margin: 10px 0;
  }
  .subtitle-in:after{
    content: '';
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #c8c7cc;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
</style>
