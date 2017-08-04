<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <v-list  :propItems="annoncementCategory"/>
    </v-content>
    </div>
</template>

<script>
  import VContent from '../components/Content';
  import NavBar from '../components/NavBar';
  import VList from '../components/List';
  import { API_ROOT } from '../config';

  export default {
    created:function(){
      this.$store.dispatch('getAnnouncementCategory')
    },
    data() {
      return {
        header:{
          backShow:false,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('header[0].title')
        },
      }
    },
    computed: {
      annoncementCategory() {
        return this.$store.state.moduleAnnouncement.announcementCategory;
      }
    },
    components: {
      VContent,
      NavBar,
      VList
    },
    locales: {
      en: {
        header: [{
          title: 'Announcement'
        }]
      },

      zh: {
        header: [{
          title: '公告'
        }]
      }
    }
  }

</script>

<style>
</style>
