<template>
  <div class="content-block" style="padding: 0;margin: 10px 0">
    <div class="content-block-inner" style="padding:0px 0px 15px 15px;">
      <div class="subtitle-in" style="font-size: 14px;line-height: 30px;padding-left: 15px;">{{$t('subtitle')}}</div>
      <div v-if="propItem.length > 0" class="row" style="justify-content: flex-start;">
        <div class="col-25 icon-nav-box" style="width: 25%;"  v-for="medal in propItem">
          <div class="medal-box">
            <img class="swiper-img"  :src="medal.img" style="width: 40px;margin: 5px 0;">
            <span>{{medal.title}}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <i class="icon iconfont icon-gth color-gray" style="margin: 0 0 0 15px;color:gray!important;font-size: 16px;"></i>
        <span class="color-gray" style="font-size: 14px;">{{$t('myMedalEmpty')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EmployeeMedals',
    props: [ 'propItem'],

    data() {
      return {
      };
    },
    created:function(){


    },
    mounted:function() {

    },
    methods:{
    },
    /**
     * @description 多语言
     */
    locales: {
      en: {
        subtitle: 'My medals',
        myMedalEmpty:'There is no medal'
      },
      zh: {
        subtitle: '我的勋章',
        myMedalEmpty:'还没有勋章哦'
      }
    },
    computed: {
    },
    components: {

    },
  }
</script>

<style scoped>
  .medal-box{
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-nav-box{
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    padding: 5px;
    text-align: center;
    font-size: 0.6rem;
  }
  .subtitle-in:after{
    content: '';
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #c8c7cc;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
</style>
