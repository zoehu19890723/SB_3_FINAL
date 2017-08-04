<template>
  <div class="page navbar-fixed">
    <NavBar :propTitle=" $t('title') "/>
    <div class="page-content">
      <div class="list-block" style="margin-bottom: 15px">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"></div>
              <div class="item-inner">
                <div class="item-input">
                  <input id="orgPwd" type="password" :placeholder="$t('placeholder01')">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"></div>
              <div class="item-inner">
                <div class="item-input">
                  <input id="newPwd" type="password" :placeholder="$t('placeholder02')">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"></div>
              <div class="item-inner">
                <div class="item-input">
                  <input id="new2Pwd" type="password" :placeholder="$t('placeholder03')">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="content-block" style="margin-top: 15px;margin-bottom: 25px;line-height: 20px;">
              <h3>{{$t('rules01')}}</h3>
              <p>{{$t('rules02')}}</p>
              <p>{{$t('rules03')}}</p>
      </div>

      <div class="row" style="margin:5%;text-align: center;">
        <div class="col-50">
          <a href="#" class="button button-big button-cancel">{{$t('save')}}</a>
        </div>
        <div class="col-50">
          <a href="#" class="button button-big button-submit active">{{$t('cancel')}}</a>
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
        placeholder01:'Original password',
        placeholder02:'New password',
        placeholder03:'Confirm new password',
        rules01:'Password rules',
        rules02:'1.The length is 8 to 18 bits.',
        rules03:'2.Can only contain characters, numbers and underscores.',
        title: 'Account Setting',
        items: ['English', 'Chinese',],
        save: 'Save',
        cancel:'Cancel'
      },

      zh: {
        placeholder01:'原始密码',
        placeholder02:'新密码',
        placeholder03:'确认新密码',
        rules01:'密码规则',
        rules02:'1. 长度为8到18位。',
        rules03:'2. 只能包含字符、数字和下划线。',
        title: '账户设置',
        items: ['英文', '中文',],
        save: '保存',
        cancel:'取消'
      },
    },

  };
</script>
