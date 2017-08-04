<template>
  <div class="page">
    <NavBar :headerInfo="header"></NavBar>
    <v-content className="page-content">
      <div class="content-block-title">{{$t('likeType')}}</div>
      <div class="list-block">
        <ul>
          <li v-for="(likeType, index) in likeTypes">
            <label class="label-radio item-content"  v-on:click="changeOne(likeType.id)">
              <div class="item-media">
                <img class="icon" :src="likeType.img" style="width: 1.5rem">
              </div>
              <div class="item-inner">
                <div v-if="lang=='zh'" class="item-title">
                  {{likeType.title_CN}}
                </div>
                <div v-else class="item-title">
                  {{likeType.title_US}}
                </div>
                <i v-show="like.type==likeType.id" class="f7-icons size-25 color-red">check</i>
              </div>
            </label>
          </li>
        </ul>

      </div>
      <textarea :placeholder="$t('likeContent')" v-model="like.content">
          </textarea>
      <div class="content-block">
        <button :disabled="like.type==''||disabled" class="button button-big button-fill" style="width:100%;" @click="send">{{done}}</button>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import EmployeeCard from '../../components/EmployeeCard.vue';
  import CheckboxItem from '../../components/CheckboxItem.vue';
  import api from '../../api';
  import _ from 'lodash';
  export default {
    created:function(){
      this.$store.dispatch('getBlessingTypes',{});
    },
    data(){
      return {
        lang:localStorage.getItem('EP_lang'),
        done:this.$t('done'),
        disabled:false,
        header:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('title')[0]
        },
        like:{
          type:'',
          content:''
        },
      }
    },
    computed: {
      likeTypes(){
        const typeList = this.$store.state.moduleMy.blessingTypes
        if(typeList.length>0){
          this.like.type = typeList[0].id
        }
        return typeList;
      },

    },
    methods:{
      routerBack(){
        this.$router.back();
      },
      changeOne(e){
        this.like.type = e
      },
      send(){
        let self = this;
        self.disabled = true;
        self.done = self.$t('submitting')
        api.postSendBlessing(
          {
            receiver_id:self.$route.query.id,
            term_id:self.like.type,
            content:self.like.content,
          }
        ).then(response =>{
          self.done = self.$t('successfully')

          const blessingObj = {
            'id':self.$route.query.id,
            'content':{
              'id': response.body.sent.sender_ID,
              'senderName':response.body.sent.sender_name,
              'senderImg':response.body.sent.sender_avatar_url,
              'likeName':response.body.sent.wish_name,
              'likeIcon':response.body.sent.wish_icon_url,
              'content': response.body.sent.message,
              'dateDay':response.body.sent.date.split('T')[0],
              'dateTime':response.body.sent.date.split('T')[1]
            }}

        self.$store.commit('setIncreaseBlessing',blessingObj);

          setTimeout(() => {
            self.$router.back();
          }, 500)

        },(response) => {
          self.done = self.$t('Failed')
          console.log('error:'+response)
        })
      }
    },
    components: {
      VContent,
      NavBar,
      EmployeeCard,
      CheckboxItem
    },
    locales: {
      en: {
        title:[
          'Send blessing'
        ],
        loadingText : 'Loading',
        likeType:'Please choose one blessing',
        likeContent:'Please fill in the content',
        done:'Done',
        submitting:'submitting',
        successfully:'successfully',
        Failed:'Failed'
      },

      zh: {
        title:[
          '送祝福'
        ],
        loadingText : '加载中...',
        likeType:'请选择一个祝福',
        likeContent:'请填写祝福的内容',
        done:'确定',
        submitting:'提交中',
        successfully:'提交成功',
        Failed:'提交失败'
      },
    },
  }

</script>

<style scoped>
  .list-block{
    margin: 15px 0;
  }
  textarea{
    width: 100%;
    height: 150px;
    font-size: 0.9rem;
    border: none;
    margin: 0;
    padding: 10px;
    resize: none;
    box-sizing: border-box;
    border-radius: 0;
    color: black;
  }
</style>
