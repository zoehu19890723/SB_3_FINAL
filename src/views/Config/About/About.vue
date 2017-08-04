<template>
  <div class="page navbar-fixed">
    <NavBar :propTitle=" $t('title') "/>
    <div class="page-content bg-white">
      <article>
        <img class="img1" :src="baseImgUrl+'/static/img/about/about.png'">
        <section class="section1">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;EP is a great platform for employee communication, caring and motivation, and it is also a platform for social workers to help themselves.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;EP breakthrough in the past only to provide employees with a HRIS based self-service framework, representing the future of CDP employee self-service platform product direction.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;EP is the unified entrance of CDP one stop service!</p>
        </section>
      </article>
    </div>
  </div>
</template>
<style scoped>
.section1 {
  font-size: 16px;
  color: rgb(125, 125, 125);
  padding: 5px;
}
.img1 {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
<script>
  import NavBar from '../ConfigNavbar';
  import {assetsPublicPath} from '../../../config'
  export default {
    name: 'About',

    data() {
      return {
        baseImgUrl: assetsPublicPath
      }
    },
    computed: {

    },

    components: {
      NavBar,
    },

    locales: {
      en: {
        title: 'About CDP Portal',
      },

      zh: {
        title: '关于CDP Portal',
      },
    },
  };
</script>
