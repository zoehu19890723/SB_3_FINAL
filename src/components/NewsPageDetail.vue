<template>
  <div>
    <div class="content-block">
      <p class="article-title color-black" v-html="item.title"></p>
    </div>
    <!-- This block will be inset only on tablets -->
    <div class="content-block tablet-inset">

      <div class="content-block-inner">
        <!--<div  v-bind:style="{ backgroundImage: 'url(' + item.img + ')' }" valign="bottom" class="header-pic"></div>-->
        <p class="content-block-inner-p" v-html="item.content"></p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'NewsPageDetail',
    props: ['propTitle', 'propContent'],
    data() {
      return {

      };
    },

    /**
     * @description 多语言
     */
    locales: {
      en: {
        header: [{
          backInfo: 'Back',
        }]
      },

      zh: {
        header: [{
          backInfo: '返回',
        }]
      },
    },
    computed: {
      item() {
        return this.propContent;
      },
    }
  }
</script>

<style scoped>
.article-title{
  font-size: 1.2rem;
}

.content-block-inner-p img{
  height: 100% !important;
  width: 100% !important;
}
</style>
