<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <!--<EmployeeCard :propItem="employee"/>-->

      <div class="content-block-title">{{$t('text')[2]}}</div>
      <div class="content-block tablet-inset">
        <div class="content-block-inner external" @click="editDes">
          <div v-if="employee.description && employee.description.length!=0" style="flex:1">
            <pre class="textPre">{{employee.description}}</pre>
          </div>
          <div v-else style="flex:1">{{$t('text')[3]}}</div>
          <i class="WeStar_iconfont">&#xe624;</i>
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
    created:function(){
      let me = this;
      if(!me.$store.state.moduleHome.empDetail[me.$route.query.id]){
        f7.showPreloader(this.$t('loadingText'));
      }
      me.$store.dispatch('getEmpDetail',{userId:me.$route.query.id}).then(function () {
        me.employee = me.$store.state.moduleHome.empDetail[me.$route.query.id];
        setTimeout(() =>{
          f7.hidePreloader()
        },1500)
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
        employee : this.$store.state.moduleHome.empDetail[this.$route.query.id]?this.$store.state.moduleHome.empDetail[this.$route.query.id]:{},
      }
    },
    computed: {
    },
    methods:{
      editDes(){
        this.$router.push({
          path :'/my/myInformation/editInformation',
          query : {
            value : this.employee.description || null,
            id : this.$route.query.id
          }
        });
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
        title:[
          'Personal Information'
        ],
        loadingText : 'Loading',
      },

      zh: {
        text:[
          '部门',
          '职位',
          '简介',
          '暂无个人简介'
        ],
        title:[
          '个人资料'
        ],
        loadingText : '加载中...',
      },

    },


  }

</script>

<style scoped>
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
  .external{
    display: flex;
    color: #999999;
  }
  .textPre{
    width: 100%;
    font-size: 16px;
    color: #666;
    white-space: pre-wrap;
    font-family: Tahoma, Arial, Roboto, "Droid Sans", "Helvetica Neue", "Droid Sans Fallback", "Heiti SC", "Microsoft YaHei", sans-self;
  }
</style>
