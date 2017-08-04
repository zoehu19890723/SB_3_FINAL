<template>
  <div class="page navbar-fixed">
    <NavBar :propTitle=" $t('title') "/>
    <div class="page-content">
      <div class="list-block" style="margin-bottom: 15px">

        <section class="holder" style="background: white; ">
        <div class="content-block">
          <div class="form-group form-group-myinfo">
            <textarea rows="5" class="input" :placeholder="$t('placeholder')" style="min-height: 100px;">                       </textarea>
          </div>
        </div>
      </section>

        <div class="content-block">
          <a  href="#" class="button button-big button-fill">{{$t('button')}}</a>
        </div>

      </div>
      <div class="content-block" v-if="lang">
        <button class="button button-round button-fill response-width" @click="save">{{ $t('button') }}</button>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import NavBar from './ConfigNavbar';
  export default {
    name: 'LanguageConfig',

    components: {
      NavBar,
    },

    data() {
      return {
        lang: '',
      };
    },

    methods: {


    },

    locales: {
      en: {
        title: 'Feedback',
        items: ['English', 'Chinese',],
        button: 'Save',
        placeholder:'Thank you for your valuable suggestion.'
      },

      zh: {
        title: '意见反馈',
        items: ['英文', '中文',],
        button: '保存',
        placeholder:'谢谢你的宝贵意见。'
      },
    },

  };
</script>
