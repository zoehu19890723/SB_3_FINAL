<template>
    <f7-swiper :params="params" :pagination="pagination" :init="true" :zoom="true">
      <f7-swiper-slide v-for="(propItem, index) in items">
        <img class="swiper-img"  :src="propItem.medium_img" >
      </f7-swiper-slide>
    </f7-swiper>
</template>
<style scoped>
  .swiper-img{
    width: 100%;
  }
</style>
<script>
  export default {
    name: 'F7-swiper',

    /**
     * @type {number} autoplay
     * @type {{swiperSRCs: [obj], pagination: string}[]} propItems
     */
    props: ['params','pagination', 'propItems'],

    data() {
      return {

      };
    },

    /**
     * @description 多语言
     */
    locales: {

    },

    computed: {
      items() {
        return this.propItems;
      },
    },

  };
</script>
