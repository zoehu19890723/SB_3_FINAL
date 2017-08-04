<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <EmployeeCard :propTitle="$t('title[0]')" :propItem="employee" :userId="this.$route.query.id"/>
      <div class="content-block">
        <!--<div class="buttons-row">-->
          <!--<router-link :to="{ path: './empDetailPage/sendLikes', query: { id: this.$route.query.id }}" class="button button-big">-->
            <!--<i class="icon iconfont icon-zanzan" style="margin-right: 5px;"></i>{{ $t('settings.like') }}-->
          <!--</router-link>-->
          <!--<router-link :to="{ path: './empDetailPage/sendWishes', query: { id: this.$route.query.id }}" class="button button-big">-->
            <!--<i class="icon iconfont icon-xin" style="margin-right: 5px;"></i>{{ $t('settings.sendWishes') }}-->
          <!--</router-link>-->
        <!--</div>-->
      </div>
      <EmployeeMedals :propItem="medals"/>
      <EmployeeBlessingCard :propTitle="$t('subtitle')[3]" :propItem="cards" :cardDetailPath="cardDetailPath"/>
      <EmployeeSkills :propItems="skills"/>


      <div class="list-block color-black">
        <ul>
          <li>
            <router-link class="item-link item-content" :to="{ path: './empDetailPage/personalInformation', query: { id: this.$route.query.id }}">
              <div class="item-inner">
                <div class="item-title"><i class="icon iconfont icon-geren" style="margin-right: 10px"></i>{{ $t('settings.personalInfo') }}</div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link class="item-link item-content" :to="{ path: './empDetailPage/personalDynamic',query: { id: this.$route.query.id }}">
              <div class="item-inner">
                <div class="item-title"><i class="icon iconfont icon-comment1" style="margin-right: 10px"></i>{{ $t('settings.dynamic') }}</div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link class="item-link item-content" :to="{ path: './empDetailPage/personalBlog',query: { id: this.$route.query.id }}">
              <div class="item-inner">
                <div class="item-title"><i class="icon iconfont icon-wendang" style="margin-right: 10px"></i>{{ $t('settings.blog') }}</div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link class="item-link item-content" :to="{ path: './empDetailPage/personalWishes',query: { id: this.$route.query.id }}">
              <div class="item-inner">
                <div class="item-title"><i class="icon iconfont icon-xin" style="margin-right: 10px"></i>{{ $t('settings.wishes') }}</div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link class="item-link item-content" :to="{ path: './empDetailPage/personalLikes',query: { id: this.$route.query.id }}">
              <div class="item-inner">
                <div class="item-title"><i class="icon iconfont icon-zanzan" style="margin-right: 10px"></i>{{ $t('settings.like') }}</div>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="list-block color-black" v-if="showFavor">
          <ul class="wx-settings">
            <CheckboxItem ref="isFavor" :title="$t('favor')" :changeAction="changeFavor" :checkState="isFavor"></CheckboxItem>
          </ul>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import EmployeeCard from '../../components/EmployeeCard.vue';
  import EmployeeMedals from '../../components/EmployeeMedals.vue';
  import EmployeeSkills from '../../components/EmployeeSkills.vue';
  import EmployeeBlessingCard  from '../../components/EmployeeBlessingCard.vue'
  import CheckboxItem from '../../components/CheckboxItem.vue';
  import _ from 'lodash';
  export default {
    beforeCreate:function(){
    },
    created:function(){
      let self = this;
      if(self.$store.state.moduleMy.empBlessCards[self.$route.query.id]){
        self.cards = self.$store.state.moduleMy.empBlessCards[self.$route.query.id]
        self.$store.dispatch('getEmpBlessCards',{userId:self.$route.query.id})
      }else{
        self.$store.dispatch('getEmpBlessCards',{userId:self.$route.query.id}).then(function () {
          self.cards = self.$store.state.moduleMy.empBlessCards[self.$route.query.id]
        })
      }

      self.$store.dispatch('getEmpSkill',{userId:self.$route.query.id,endorser_id:localStorage.getItem('EP_user_id')}).then(function () {
        self.skills = self.$store.state.moduleMy.empSkills[self.$route.query.id]
      });
      if(self.$store.state.moduleMy.myMedal[self.$route.query.id]){
        self.medals = self.$store.state.moduleMy.myMedal[self.$route.query.id];
        self.$store.dispatch('getMyMedal',{userId:self.$route.query.id});
      }else{
        self.$store.dispatch('getMyMedal',{userId:self.$route.query.id}).then(function () {
          self.medals = self.$store.state.moduleMy.myMedal[self.$route.query.id]
        })
      }

      this.$store.dispatch('getMyMedal',{userId:this.$route.query.id});

        if(!this.$store.state.moduleHome.empDetail[this.$route.query.id]){
          f7.showIndicator()
        }
      this.$store.dispatch('getEmpDetail',{userId:this.$route.query.id}).then(function () {
        self.employee = self.$store.state.moduleHome.empDetail[self.$route.query.id]
        setTimeout(() => {
          f7.hideIndicator()
        },500)
      })
    },
    data(){
      return {
        header:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('title')[0]
        },
        employee:this.$store.state.moduleHome.empDetail[this.$route.query.id]?this.$store.state.moduleHome.empDetail[this.$route.query.id]:{},
        isFavor : this.$route.query.isFavor ? parseInt(this.$route.query.isFavor) : 0,
        showFavor : this.$route.query.fromContact ? true : false,
        medals : [],
        skills:this.$store.state.moduleMy.empSkills[this.$route.query.id],
        cards:[],
        cardDetailPath:'./empDetailPage/cardDetail'+'?empId='+this.$route.query.id
      }
    },
    computed: {

    },
    methods:{
      routerBack(){
        this.$router.back();
      },
      changeFavor(){
        let id = this.$route.query.id;
        let isFavor = this.$refs.isFavor.checked ? 1 : 0;
        let text = this.$refs.isFavor.checked ? this.$t('favorSuccess') : this.$t('cancelFavorSuccess')
        this.$store.commit('setFavor',{id:id,isFavor:isFavor});
        f7.alert('',text);
      }
    },
    components: {
      VContent,
      NavBar,
      EmployeeCard,
      EmployeeMedals,
      EmployeeSkills,
      EmployeeBlessingCard,
      CheckboxItem
    },
    locales: {
      en: {
        text:[
          'Department',
          'Position',
          'Personal profile'
        ],
        settings: {
          personalInfo: 'Personal Information',
          dynamic:'Dynamic',
          blog:'Blog',
          wishes:'Blessing',
          sendWishes:'Send blessings',
          like:'Like',
          collection:'Collection',
          account: 'Password Setting',
          language: 'Language',
          about: 'About CDP Portal',
          version:'Version'
        },
        title:[
            'Employee Detail'
        ],
        subtitle: ['Personal information', 'My medals', 'My achievements','Cards'],
        loadingText : 'Loading',
        favor :'Follow',
        favorSuccess :'Follow succeed!',
        cancelFavorSuccess :'Cancel follow succeed!',
        myMedal:'Medals',
        myMedalEmpty:'There is no medal'
      },

      zh: {
        text:[
          '部门',
          '职位',
          '个人简介'
        ],
        settings: {
          personalInfo: '个人资料',
          dynamic:'动态',
          blog:'博客',
          wishes:'祝福',
          sendWishes:'送祝福',
          like:'点赞',
          collection:'收藏',
          account: '密码设置',
          language: '语言',
          about: '关于 CDP Portal',
          version:'版本'
        },
        title:[
          '员工详情'
        ],
        subtitle: ['个人资料', '我的勋章', '我的成就','卡片'],
        loadingText : '加载中',
        favor :'关注',
        favorSuccess :'关注成功!',
        cancelFavorSuccess :'取消关注成功!',
        myMedal:'勋章',
        myMedalEmpty:'还没有勋章哦'
      },

    },


  }

</script>

<style scoped>
  .medal-box{
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-nav-box{
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    padding: 5px;
    text-align: center;
    font-size: 0.6rem;
  }
  .list-block{
    margin: 15px 0;
  }
  .iconfont{
    font-size: 1.2rem;
  }
  .buttons-row a{
    font-size: 0.9rem;
  }
</style>
