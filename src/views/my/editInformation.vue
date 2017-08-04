<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <TextareaItem ref="textContent" :dataPlaceholder="$t('plsInput')" style="padding: 8px 16px;" :rows="20" :defaultV="defaultV"> </TextareaItem>
      <SubmitBtn :btnText="btn.text" :submitAction="updateField" :clx="btn.clx"></SubmitBtn>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import TextareaItem from '../../components/TextareaItem';
  import SubmitBtn from '../../components/SubmitBtn';
  import NavBar from '../../components/NavBar';

  export default {
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:this.$t('edit'),
        },
        btn :{
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red',
        }
      }
    },
    computed:{
      defaultV(){
        return this.$route.query.value;
      },
    },
    methods:{
      updateField(){
        let value = this.$refs.textContent.dataValue;
        this.$store.commit('setMask',{show:true,text:this.$t('loadingText')});
        this.$store.dispatch('saveMyDescription',{
          des : value,
          id : this.$route.query.id
        }).then((res)=>{
          this.$store.commit('hideMask');
          this.$store.commit('updateDes',{id : this.$route.query.id,des : res});
          f7.alert('',this.$t('modifySucceed'),()=>{
            this.$router.back();
          })
        })
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
        'edit' : '编辑个人简介',
        'commitButton' : '提交',
        'modifySucceed' : '更新成功',
        'plsInput' : '请输入',
        'loadingText':'加载中...',
      },

      en: {
        'edit' : 'Edit Personal Information',
        'commitButton' : 'Submit',
        'modifySucceed' : 'Update Succeed!',
        'plsInput' : 'Please enter',
        'loadingText' : 'Loading...',
      }
    }


  }

</script>

<style scoped>

</style>
