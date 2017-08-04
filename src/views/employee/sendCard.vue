<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <div class="list-block color-black" style="margin-top:65px; ">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-geren color-red" style="margin-right: 10px"></i>{{ $t('sendTo') }}</div>
              <div class="item-after">{{sendToInfo}}</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><i class="icon iconfont icon-lipin color-red" style="margin-right: 10px"></i>{{ $t('cardType') }}</div>
              <div class="item-after">{{cardNameInfo}}</div>
            </div>
          </div>
        </li>
      </ul>
      <TextareaItem ref="textContent" :dataPlaceholder="$t('plsInput')" style="padding: 8px 16px;margin:10px 0;background-color: white;" :rows="5"> </TextareaItem>
    </div>
    <SubmitBtn :btnText="btn.text" :submitAction="updateField" :clx="btn.clx" :disabled="disabled"></SubmitBtn>
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
        this.sendToInfo = localStorage.getItem('EP_lang')=='zh'?this.$store.state.moduleHome.empDetail[this.$route.query.toEmp].displayName_CN:this.$store.state.moduleHome.empDetail[this.$route.query.toEmp].displayName_US
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
        sendToInfo:'',
        cardTypeInfo:'',
        btn :{
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red',
        },
        disabled:this.$store.state.moduleConfig.sendCard.recurring_id?false:true
      }
    },
    computed:{
      cardNameInfo(){
          return  this.$store.state.moduleConfig.sendCard.name
      }
    },
    destroyed(){
      this.$store.commit('clearSendCard');
    },
    methods:{

      updateField(){
        let self = this;
        let content = self.$refs.textContent.dataValue;

        api.postGiveCard(
          {
            recurring_id:self.$store.state.moduleConfig.sendCard.recurring_id,
            type:self.$store.state.moduleConfig.sendCard.type,
            pay_to:self.$route.query.toEmp,
            user_id:localStorage.getItem('EP_user_id'),
            reference:'donation',
            message:content,
          }
        ).then(response =>{
          self.$store.commit('changeEmpBlessCards',{
            empId:self.$route.query.toEmp,
            type:self.$store.state.moduleConfig.sendCard.type,
            action:'add'
          });
          self.$store.commit('changeEmpBlessCards',{
            empId:localStorage.getItem('EP_user_id'),
            type:self.$store.state.moduleConfig.sendCard.type,
            action:'reduce'
          });
          self.$store.commit('addEmpCardPresenter',response.data);
          f7.alert(self.$store.state.moduleConfig.sendCard.name,self.$t('successTitle'),function(){
              self.$router.back();
          })
        },(response) => {
          f7.alert(self.$store.state.moduleConfig.sendCard.name,self.$t('failTitle'))
        })
      },

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
        'sendTo':'赠送给',
        'cardType':'卡片类型',
        'plsInput' : '请说一些祝福的话吧',
        'commitButton' : '提交',
        'selectCard':'请选择一张卡',
        'successTitle':'发送成功',
        'failTitle':'发送失败'
      },

      en: {
        'sendCard' : 'Send card',
        'sendTo':'Presented to',
        'cardType':'Card type',
        'plsInput' : 'Please say some words of blessing',
        'commitButton' : 'Submit',
        'selectCard':'Please select a card',
        'successTitle':'Send successfully',
        'failTitle':'Send fail'
      }
    }


  }

</script>

<style scoped>

</style>
