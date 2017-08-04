<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <!--<EmployeeCard :propItem="employee"/>-->

      <div class="content-block-title">{{$t('text')[2]}}</div>
      <!-- This block will be inset only on tablets -->
      <div class="content-block tablet-inset">
        <div class="content-block-inner">
          <p v-if="employee.description.length!=0" v-html="employee.description"></p>
          <p v-else>{{$t('text')[3]}}</p>
        </div>
      </div>

    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import EmployeeCard from '../../components/EmployeeCard.vue';
  import _ from 'lodash';
  export default {
    beforeCreate:function(){
    },
    created:function(){

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
        employee:this.$store.state.moduleHome.empDetail[this.$route.query.id]
      }
    },
    computed: {

    },
    methods:{
      routerBack(){
        this.$router.back();
      }
    },
    components: {
      VContent,
      NavBar,
      EmployeeCard
    },
    locales: {
      en: {
        text:[
          'Department',
          'Position',
          'Introduction',
          'No personal profile',
        ],
        settings: {
          personalInfo: 'Personal Information',
          dynamic:'Dynamic',
          blog:'Blog',
          account: 'Password Setting',
          language: 'Language',
          about: 'About CDP Portal',
          version:'Version'
        },
        title:[
          'Personal Information'
        ]
      },

      zh: {
        text:[
          '部门',
          '职位',
          '简介',
          '暂未个人简介'
        ],
        settings: {
          personalInfo: '个人资料',
          dynamic:'动态',
          blog:'博客',
          account: '密码设置',
          language: '语言',
          about: '关于 CDP Portal',
          version:'版本'
        },
        title:[
          '个人资料'
        ]
      },

    },


  }

</script>

<style>
  .header-img{
    width: 130px;
    border: solid 3px white;
  }
  .header-img-bg{
    position:absolute;
    background-repeat: no-repeat;
    background-size:cover;
    z-index: -1;
    filter: blur(5px);
    width: 100%;
    height: 200px;
  }
  .content-bg{
    background: white;
    position: absolute;
    width: 100%;
    height: 100px;
    z-index: -1;
    margin-top: 200px;
  }
  .emp-detail-bg{
    background: white;
  }
</style>
