<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <ul>
        <li class="item-divider"></li>
        <li>
          <div class="item-content">
            <div class="item-media" id="profileImg">
              <img class="img-response" :src="emp.img">
            </div>
            <div class="item-inner profileItems">
              <div class="item-title-row">
                <div class="item-title color-black">{{ title }}</div>
              </div>
              <div class="item-title-row">
                <div class="item-subtitle color-black">{{emp.department}}</div>
              </div>
              <div class="item-title-row">
                <div class="item-subtitle color-black">{{emp.position}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="header-img-bg" v-bind:style="{ backgroundImage: 'url(' + emp.img + ')' }"></div>
      <div class="content-bg"></div>
      <div class="content-block" style="text-align: center;margin-top: 100px;">
        <div class="row">
          <div class="col-100 tablet-33"><img class="header-img" :src="emp.img"></div>
        </div>
        <span>{{emp.subtitle}}</span>
      </div>
      <div class="list-block">
      <div class="list-group">
        <ul>
          <li class="item-content">
            <div class="item-media"><i class="f7-icons size-22" style="color: rgb(0,122,255)">home</i></div>
            <div class="item-inner">
              <div class="item-title">{{$t('text')[0]}}</div>
              <div class="item-after">{{emp.department}}</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-media"><i class="f7-icons size-22" style="color: rgb(0,122,255)">layers</i></div>
            <div class="item-inner">
              <div class="item-title">{{$t('text')[1]}}</div>
              <div class="item-after">{{emp.position}}</div>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div class="content-block">
        <div class="content-block-title">
            <p>{{$t('text')[2]}}</p>
        </div>
        <div class="content-block-inner">
            <p v-html="emp.description"></p>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../components/Content';
  import NavBar from '../components/NavBar';
  import _ from 'lodash';
  export default {
    beforeCreate:function(){
    },
    created:function(){
      this.$store.dispatch('getPostsDetail',{userId:this.$route.query.id})
    },
    props:{

    },
    data:function(){
      return {
        header:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$route.query.title
        }
      }
    },
    computed: {
      emp() {
        return  _.find(this.$store.state.moduleHome.emps, { 'id': this.$route.query.id});
      }
    },
    methods:{
      routerBack(){
          this.$router.back();
        }
    },
    components: {
      VContent,
      NavBar
    },
    locales: {
        en: {
      text:[
        'Department',
        'Position',
        'Personal profile'
      ]
    },

      zh: {
        text:[
          '部门',
          '职位',
          '个人简介'
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
