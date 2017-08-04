<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <div style="height: 10px;"></div>
      <IconNavList :propItems="iconNavigationAll" />
  </div>
</template>

<script>
  import NavBar from '../components/NavBar';
  import IconNavList from '../components/Icon-Navigation-List';
  export default {
    name: 'more',
    created(){
      this.$store.dispatch('getIconNavAll');
    },
    data () {
      return {
        header:{
          backShow:true,
          backHref:'',
          backInfo: this.$t('backInfo'),
          rightShow: false,
          rightInfo: '',
          rightLink:'',
          title:this.$t('title'),
          backHref :'/home'
        },
        lang:'',
      }
    },
    computed: {
      iconNavigationAll(){
        return this.$store.state.moduleHome.iconNavigationAll
      }
    },
    components: {
      NavBar,
      IconNavList,
    },
    locales: {
      en: {
        title:'More',
        backInfo:'Back'
      },

      zh: {
        title:'更多',
        backInfo:'返回'
      }
    }
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
