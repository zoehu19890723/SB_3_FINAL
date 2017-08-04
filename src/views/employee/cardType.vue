<template>
  <div class="page navbar-fixed">
    <NavBar :headerInfo="head"></NavBar>
    <div class="page-content">
      <div class="list-block">
        <ul v-if="items.length>0">
          <li v-for="item in items">
            <input type="radio" :id="item.cardType" :value="item.cardType" v-model="picked" style="display: none;">
            <label class="label-radio item-content"  :for="item.cardType" v-on:click="select(item.cardId,item.cardType,item.cardName)">
              <div class="item-inner">
                <div class="item-title">{{ item.cardName }} </div>
                <i v-show="picked==item.cardType" class="f7-icons size-25 color-red">check</i>
              </div>
            </label>
          </li>
        </ul>
        <ul v-else>
          <li>
            <label class="label-radio item-content" >
              <div class="item-inner">
                <div class="item-title">{{ $t('noCard') }}</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import SubmitBtn from '../../components/SubmitBtn';
  import NavBar from '../../components/NavBar';
  import api from '../../api'

  export default {
    name:'cardType',
    created(){
        let self = this;
      if(self.$store.state.moduleMy.empBlessCards[self.userId]){
        self.cards = self.$store.state.moduleMy.empBlessCards[self.userId]
        this.$store.dispatch('getEmpBlessCards',{userId:this.userId})
      }else{
        f7.showIndicator()
        self.$store.dispatch('getEmpBlessCards',{userId:self.userId}).then(function () {
          self.cards = self.$store.state.moduleMy.empBlessCards[self.userId]
          f7.hideIndicator()
        })
      }
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('selectCard'),
        },
        cards:[],
        recurring_id:'',
        cardType:'',
        picked:'',
        userId:localStorage.getItem('EP_user_id')
      }
    },
    computed:{
        items(){
          let selectItems = _.remove(this.cards, function(n) {
            return n.cardAvailables == true;
          });
            return selectItems
        }
    },
    destroyed(){
      this.$store.dispatch('getEmpBlessCards',{userId:this.userId})
    },
    methods:{
      select(id,type,name){
          this.$store.commit('setSendCard', {
            recurring_id:id,
            type:type,
            name:name
          });
        this.$router.back();
      }
    },

    components: {
      SubmitBtn,
      VContent,
      NavBar
    },

    locales: {
      zh: {
        'selectCard' : '选择一张卡片',
        'sendTo':'赠送给',
        'cardType':'卡片类型',
        'plsInput' : '请说一些祝福的话吧',
        'commitButton' : '提交',
        'noCard':"没有可赠送的卡片了"
      },

      en: {
        'selectCard' : 'Choose a card',
        'sendTo':'Presented to',
        'cardType':'Card type',
        'plsInput' : 'Please say some words of blessing',
        'commitButton' : 'Submit',
        'noCard':"There is no card available"
      }
    }


  }

</script>

<style scoped>

</style>
