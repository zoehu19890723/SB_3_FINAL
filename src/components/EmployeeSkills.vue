<template>
  <div class="content-block" style="margin: 0;padding: 0">
    <div class="content-block-inner" style="padding-top: 0;padding-right:0">
      <div class="subtitle-in" style="font-size: 14px;line-height: 30px;padding-left: 15px;">
        <span> {{$t('subtitle')}}</span>
      </div>
      <div v-if="items&&items.length>0"  style="padding: 5px 15px;">
      <div class="chip" style="padding-left: 0;margin-right: 5px;" v-for="skill in items">
        <div class="chip-media bg-red" style="height: 23px; width: 25px;border-radius:5px 0 0 5px;">{{skill.count}}</div>
        <div class="chip-label" style="max-width: 270px;">{{skill.name}}</div>
        <a v-if="skill.clicked" v-on:click="agreeSkill(skill.id,'remove')">
          <i class="f7-icons color-white" style="font-size: 16px;margin: 3px 0 3px 5px">delete_round</i>
        </a>
        <a v-else v-on:click="agreeSkill(skill.id,'add')">
          <i class="f7-icons color-white" style="font-size: 16px;margin: 3px 0 3px 5px">add_round</i>
        </a>

      </div>
      </div>
      <div v-else>
        <i class="icon iconfont icon-gth color-gray" style="margin: 0 0 0 15px;color:gray!important;font-size: 16px;"></i>
        <span class="color-gray" style="font-size: 14px;">{{$t('skillsEmpty')}}</span>
      </div>
    </div>
</div>
</template>

<script>
  import api from '../api'
  export default {
    name: 'EmployeeSkills',
    props: [ 'propItems'],

    data() {
      return {
      };
    },
    created:function(){


    },
    mounted:function() {

    },
    methods:{
      agreeSkill(skill_id,operate){
        let self = this;
        f7.confirm(self.$t(operate+'Info'), self.$t(operate+'Title'),function () {
          self.$store.commit('setMask',{show:true,text:self.$t('loadingText')});
          api.agreeSkills(
            {id:localStorage.getItem('EP_user_id')},
            {
              skill_id:skill_id,
              action : 'endorse',
              operate:operate,
              endorsed_user_id:self.$route.query.id
            }
          ).then((response) =>{
            self.$store.commit('hideMask');
            self.$store.commit('addOrRemoveSkills',{skill_id:skill_id,operate:operate,skills:self.propItems});
            f7.alert('',self.$t(operate+'Succeed'),()=>{
            })
          },(response) => {
            console.log(response)
          })
        })

      }
    },
    /**
     * @description 多语言
     */
    locales: {
      en: {
        subtitle:'Skill tag',
        skillsEmpty:'Thers is no skill',
        addTitle:'Agree',
        addInfo:'Are you sure to agree with this skill?',
        addSucceed:'Identify success',
        removeInfo:'Are you sure to disassemble this skill?',
        removeTitle:'Disassociate',
        removeSucceed:'Cancel successful',
        loadingText:'Loading'
      },
      zh:{
        subtitle:'技能标签',
        skillsEmpty:'还没有技能',
        addInfo:'你确定认同该技能吗？',
        addSucceed:'认同成功',
        addTitle:'认同',
        removeInfo:'你确定取消认同该技能吗?',
        removeTitle:'取消认同',
        removeSucceed:'取消成功',
        loadingText:'加载中'
      }
    },
    computed: {
      items() {
        return this.propItems;
      },
    },
    components: {

    },
  }
</script>

<style scoped>
  .subtitle-in:after{
    content: '';
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #c8c7cc;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
</style>
