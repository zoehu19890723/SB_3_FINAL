<template>
  <div class="navbar">
    <div class="navbar-inner">
      <div class="left">
        <a class="link icon-only" @click="goBack"><i class="f7-icons">chevron_left</i>
          <span>{{$t('header.backInfo')}}</span>
        </a>

      </div>
      <div class="center">
        <div class="color-gray">{{propTitle}}</div>
      </div>
      <div class="right">
        <a class="link icon-only" style="color: rgba(0,0,0,0);"><i class="f7-icons">gear</i></a>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  /**
  * @description 可返回导航
  */
  export default {
    name: 'GoBackNavbar',

    /**
    * @type {string} propTitle
    */
    props: ['propTitle'],

    locales: {
      en: {
        header:{
          backInfo: 'Back',
        },
      },

      zh: {
        header:{
          backInfo: '返回',
        },
      }
    },

    methods: {
      goBack() {
        this.$router.back();
      },

    },

  };
</script>
