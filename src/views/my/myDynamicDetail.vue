<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <div class="page-content">

    <div class="content-block" v-html="myDynamicItemDetail.title" > </div>
    <!-- This block will be inset only on tablets -->
    <div class="content-block tablet-inset">
      <div class="content-block-inner">
        <p v-html="myDynamicItemDetail.content"></p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../../components/NavBar';
  export default {
    name: 'hello',

    created:function(){
      this.$store.dispatch('getMyDynamicDetail',{activityId:this.$route.query.id})
    },

    data () {
      return {
        lang: '',
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('title')
        }
      }
    },
    computed: {
      myDynamicItemDetail() {
        return this.$store.state.moduleMy.myDynamicDetail;
      }
    },
    components: {
      NavBar
    },
    locales: {
      en: {
        title: 'Blog details',
        header: [{
          backInfo: 'Back',
        }],
        text:[

        ]
      },

      zh: {
        title: '博客详情',
        header: [{
          backInfo: '返回',
        }],
        text:[

        ]
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
