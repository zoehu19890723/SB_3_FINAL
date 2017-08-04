<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="list-block">
        <ul>
          <!-- Smart select item -->
          <li>
            <div class="item-content">
            <div class="item-inner">
              <div class="item-title">{{ $t('cardType') }}</div>
              <div class="item-after">{{cardName}}</div>
            </div>
            </div>
          </li>
          <li>
            <!-- Additional "smart-select" class -->
            <router-link class="item-link item-content" to="/my/sendCard/myAddressBooks">
              <div class="item-inner">
                <div class="item-title">{{ $t('presentTo') }}</div>
                <div class="item-after">{{personName}}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <SubmitBtn :btnText="btn.text" :submitAction="sendCard" :clx="btn.clx" :disable="false"></SubmitBtn>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import TextareaItem from '../../components/TextareaItem';
  import SubmitBtn from '../../components/SubmitBtn';
  import NavBar from '../../components/NavBar';
  import api from '../../api'

  export default {
    name:'cardSend',
    created(){

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('sendCard'),
        },
        btn :{
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red',
        },
        cardName:this.$route.query.cardName,
        cardTypeValue:this.$route.query.cardType,
        personName:this.$route.query.personName
      }
    },
    computed:{

    },
    methods:{
      sendCard(){
          console.log('sendCard')
      }
    },

    components: {
      TextareaItem,
      SubmitBtn,
      VContent,
      NavBar
    },

    locales: {
      zh: {
        'sendCard' : '送卡片',
        'commitButton' : '提交',
        'modifySucceed' : '添加成功',
        'modifyfailure':'该技能已经存在了',
        'plsInput' : '请输入',
        'loadingText':'加载中...',
        'presentTo':'赠送给',
        'cardType':'卡片类型'
      },

      en: {
        'sendCard' : 'Send card',
        'commitButton' : 'Submit',
        'modifySucceed' : 'Add succeed!',
        'modifyfailure':'The skills already exist',
        'plsInput' : 'Please enter',
        'loadingText' : 'Loading...',
        'presentTo':'Present to',
        'cardType':'Card type'
      }
    }


  }

</script>

<style scoped>

</style>
