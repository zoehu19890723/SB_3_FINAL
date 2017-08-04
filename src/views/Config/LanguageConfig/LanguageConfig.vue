<template>
  <div class="page navbar-fixed">
    <NavBar :headerInfo="head"></NavBar>
    <div class="page-content">
      <div class="list-block">
        <ul>
          <li>
            <label class="label-radio item-content" v-on:click="changeLan('en')">
              <div class="item-inner">
                <div class="item-title">{{ $t('items[0]') }} </div>
                <i v-show="lang=='en'" class="f7-icons size-25 color-red">check</i>
              </div>
            </label>
          </li>
          <li>
            <label class="label-radio item-content" v-on:click="changeLan('zh')">
              <div class="item-inner">
                <div class="item-title">{{ $t('items[1]') }} </div>
                <i v-show="lang=='zh'" class="f7-icons size-25 color-red">check</i>
              </div>
            </label>
          </li>
        </ul>

      </div>
      <div class="content-block">
        <button class="button button-big button-fill" @click="save" style="width: 100%">{{ $t('button') }}</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .response-width {
    width: 100%;
    height: auto;
  }
</style>
<script>
  import NavBar from '../../../components/NavBar';

  export default {
    name: 'LanguageConfig',

    components: {
      NavBar,
    },

    data() {
      return {
        lang: localStorage.getItem('EP_lang'),
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('title')
        },
      };
    },

    methods: {
      changeLan(e){
        this.lang=e;
      },
      save() {
        const newLang = this.lang;
        this.$store.commit('setLang', newLang);
        this.$store.commit('clearProfileStruct');

        localStorage.setItem('EP_lang',newLang);
        f7.params.modalButtonOk = this.$t('buttonOK');
        f7.params.modalButtonCancel = this.$t('buttonCancel');

        this.$router.back();
      },

    },

    locales: {
      en: {
        title: 'Language',
        items: ['English', 'Chinese'],
        button: 'Save',
        buttonOK : 'OK',
        buttonCancel : 'Cancel'
      },

      zh: {
        title: '语言',
        items: ['英文', '中文'],
        button: '保存',
        buttonOK : '确定',
        buttonCancel : '取消'
      },
    },

  };
</script>
