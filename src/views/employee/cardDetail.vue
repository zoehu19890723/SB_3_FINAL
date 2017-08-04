<template>
  <div class="page">
    <NavBar :headerInfo="head" rightEnable="true" :rightClick = "rightClick"></NavBar>
    <v-content className="page-content page-background">

      <scroller style="margin-top: 44px"  :on-infinite="infinite" ref="dynamic_scroller">
      <div class="row" style="margin-top:10px; ">
        <div class="col-20"></div>
        <div class="col-60" style="display: flex;flex-direction: column;align-items: center;border-radius: 5px;padding: 30px;" :style="{background:cardInfo.cardColor}">
          <i class="iconfont" :class="cardInfo.cardIcon" style="color:white;font-size: 1.5rem">×{{cardInfo.cardNumber}}</i>
          <span style="color:white;font-size: 0.9rem;">{{cardInfo.cardName}}</span>
        </div>
        <div class="col-20"></div>
      </div>

        <div v-if="cardInfo.cardNumber>1" class="list-block media-list">
          <ul class="comment-list">
            <li v-for="presenter in presenters">
              <div class="item-content">
                <div class="item-media">
                  <img  v-lazy="presenter.img" width="44" height="44" style="border-radius:50%">
                </div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title comment-text">{{presenter.nameCN}}</div>
                  </div>
                  <div class="item-title-row">
                    <div class="item-title color-gray comment-text">
                      {{presenter.datetime}}
                    </div>
                  </div>
                  <div class="item-title-row">
                    <div class="item-title color-gray comment-text">
                      {{employeeName}}{{presenter.textInfo}}
                    </div>
                  </div>
                  <div class="comment-text color-black" v-html="presenter.message" ></div>
                </div>
              </div>
            </li>
          </ul>
          <!--<div class="infinite-scroll-preloader" style="margin-bottom: 100px">-->
          <!--<p v-if='noData' class="color-gray">{{$t('noMoreData')}}</p>-->
          <!--<p v-else class="preloader"></p>-->
          <!--</div>-->
        </div>
        <div style="margin: 12px 0;padding: 12px;background: white;font-size: 12px;" v-else>
          <p class="color-gray">{{$t('noData')}}</p>
        </div>
  </scroller>

    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import SubmitBtn from '../../components/SubmitBtn';
  import NavBar from '../../components/NavBar';
  import api from '../../api'

  export default {
    name:'cardSend',
    created(){
        let self = this;

      if(self.$store.state.moduleMy.empCardPresenter[self.$route.query.empId]&&self.$store.state.moduleMy.empCardPresenter[self.$route.query.empId][self.cardInfo.cardType]){
        self.presenters = self.$store.state.moduleMy.empCardPresenter[self.$route.query.empId][self.cardInfo.cardType]
        self.$store.dispatch('getCardPresenter',{userId:self.$route.query.empId,type:self.cardInfo.cardType})
      }else{
        f7.showIndicator()
        self.$store.dispatch('getCardPresenter',{userId:self.$route.query.empId,type:self.cardInfo.cardType}).then(function () {
          f7.hideIndicator()
          self.presenters = self.$store.state.moduleMy.empCardPresenter[self.$route.query.empId][self.cardInfo.cardType]
        })
      }
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:this.$t('gift'),
          show:true,
          title:this.$t('cardDetail'),
        },
        btn :{
          text : this.$t('sendCard'),
          clx : 'weui_btn bg-red',
        },
        cardName:this.$route.query.cardName,
        cardTypeValue:this.$route.query.cardType,
        personName:this.$route.query.personName,
        cardInfo:this.$store.state.moduleMy.empBlessCards[this.$route.query.empId][this.$route.query.index],
        presenters:[],
        noData:false,
        userId:localStorage.getItem('EP_user_id'),
      }
    },
    computed:{
      employeeName(){
        let emp = this.$store.state.moduleHome.empDetail[this.$route.query.empId]
        return localStorage.getItem('EP_lang')=='zh'?emp.displayName_CN:emp.displayName_US
      }
    },
    methods:{
      rightClick(){
        let self = this;
        if(self.$store.state.moduleMy.empBlessCards[self.userId]){
            _.forEach(self.$store.state.moduleMy.empBlessCards[self.userId],function(n,key){
              if(self.cardInfo.cardType==n.cardType){
                  if(n.cardAvailables){
                    self.$store.commit('setSendCard', {
                      recurring_id:n.cardId,
                      type:n.cardType,
                      name:n.cardName
                    });
                    self.$router.push('./cardDetail/sendCard?toEmp='+self.$route.query.empId+'&cardName='+self.cardInfo.cardName)
                  }else{
                    f7.alert(self.$t('notCard'),self.$t('CannotPresent'))
                  }
              }
            })
          self.$store.dispatch('getEmpBlessCards',{userId:this.userId})
        }else{
          f7.showIndicator()
          self.$store.dispatch('getEmpBlessCards',{userId:self.userId}).then(function () {
            _.forEach(self.$store.state.moduleMy.empBlessCards[self.userId],function(n,key){
              if(self.cardInfo.cardType==n.cardType){
                if(n.cardAvailables){
                  self.$store.commit('setSendCard', {
                    recurring_id:n.cardId,
                    type:n.cardType,
                    name:n.cardName
                  });
                  self.$router.push('./cardDetail/sendCard?toEmp='+self.$route.query.empId+'&cardName='+self.cardInfo.cardName)
                }else{
                  f7.alert(self.$t('notCard'),self.$t('CannotPresent'))
                }
              }
            })
            f7.hideIndicator()
          })
        }
          //this.$router.push('./cardDetail/sendCard?toEmp='+this.$route.query.empId+'&cardName='+this.cardInfo.cardName)
      },
      refresh(){

      },
      infinite(done) {
        let self = this;
        setTimeout(() => {
          self.noData = true;
          done(true)
        }, 1500)
        return;
      },
    },

    components: {
      SubmitBtn,
      VContent,
      NavBar
    },

    locales: {
      zh: {
        'cardDetail' : '卡片详情',
        'sendCard' : '送卡片',
        'commitButton' : '提交',
        'modifySucceed' : '添加成功',
        'modifyfailure':'该技能已经存在了',
        'plsInput' : '请输入',
        'loadingText':'加载中...',
        'presentTo':'赠送给',
        'cardType':'卡片类型',
        'noMoreData':'没有更多人送卡片了',
        'noData':'还没有人送卡片',
        'gift':'赠送',
        'CannotPresent':'无法赠送',
        'notCard':'你没有这个卡片了'
      },

      en: {
        'cardDetail' : 'Card detail',
        'sendCard' : 'Send card',
        'commitButton' : 'Submit',
        'modifySucceed' : 'Add succeed!',
        'modifyfailure':'The skills already exist',
        'plsInput' : 'Please enter',
        'loadingText' : 'Loading...',
        'presentTo':'Present to',
        'cardType':'Card type',
        'noMoreData':'No more presenter',
        'noData':'No one has sent a card',
        'gift':'Present',
        'CannotPresent':'Can not present',
        'notCard':"You don't have this card"
      }
    }


  }

</script>

<style scoped>
  .comment-text{
    font-size: 12px;
  }
</style>
