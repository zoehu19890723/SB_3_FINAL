<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <TextareaItem ref="textContent" :dataPlaceholder="$t('plsInput')" style="padding: 8px 16px;" :rows="5" :defaultV="defaultV"> </TextareaItem>
      <SubmitBtn :btnText="btn.text" :submitAction="updateField" :clx="btn.clx"></SubmitBtn>
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
        },
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

        api.addMySkills(
          {
            skill_name : value,
            action : 'add'
          }
        ).then((response) =>{
          this.$store.commit('hideMask');
            if(response.body.status==200){
              f7.alert('',this.$t('modifySucceed'),()=>{
                this.$router.back();
              })
            }else{
              f7.alert('',this.$t('modifyfailure'),()=>{
                this.$router.back();
              })
            }
        },(response) => {
          console.log(response)
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
        'edit' : '编辑技能标签',
        'commitButton' : '提交',
        'modifySucceed' : '添加成功',
        'modifyfailure':'该技能已经存在了',
        'plsInput' : '请输入',
        'loadingText':'加载中...',
      },

      en: {
        'edit' : 'Edit Skill Tag',
        'commitButton' : 'Submit',
        'modifySucceed' : 'Add succeed!',
        'modifyfailure':'The skills already exist',
        'plsInput' : 'Please enter',
        'loadingText' : 'Loading...',
      }
    }


  }

</script>

<style scoped>

</style>
