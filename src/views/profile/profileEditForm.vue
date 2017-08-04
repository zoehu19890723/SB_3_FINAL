<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content page-background">
      <div class="mobileframe">
        <div class="wx-group" style="margin-top:8px">
          <ul class="wx-settings">
            <li class="wx-item" v-for="item in group.groupData">
              <SelectorItem :ref="item.field_code" v-if="item.type.input === 'selector'" :title="item.title" :nullable="item.nullable" :fieldCode="item.field_code" :defaultValue="item.display_value" :avaliableArray="item.type.avaliableValue"></SelectorItem>
              <CheckboxItem :ref="item.field_code" v-if="item.type.input === 'checkbox'" :title="item.title" :nullable="item.nullable" :checkState="item.value"></CheckboxItem>
              <TextItem :ref="item.field_code" v-if="item.type.input === 'text'" :title="item.title" :nullable="item.nullable" :defaultV="item.value" :dataPlaceholder = "item.placeholder"></TextItem>
              <TextareaItem :ref="item.field_code" v-if="item.type.input === 'textarea'" :title="item.title" :nullable="item.nullable" :defaultV="item.value" :dataPlaceholder = "item.placeholder"></TextareaItem>
              <DateSelectorItem :ref="item.field_code" v-if="item.type.input === 'dateTimeSelector'" :title="item.title" :nullable="item.nullable" :fieldCode="item.field_code" :defaultValue="item.value"></DateSelectorItem>
            </li>
          </ul>
        </div>
        <div>
          <SubmitBtn :btnText="updatebtn.text" :submitAction="doSubmit" :clx="updatebtn.clx" class="SubmitBtn"></SubmitBtn>
          <SubmitBtn :btnText="deletebtn.text" :submitAction="doDelete" :clx="deletebtn.clx" class="SubmitBtn" v-if="group.permission_code>3"></SubmitBtn>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import InputText from '../../components/InputText';
  import SubmitBtn from '../../components/SubmitBtn';
  import SelectorItem from '../../components/SelectorItem';
  import CheckboxItem from '../../components/CheckboxItem';
  import TextItem from '../../components/TextItem';
  import TextareaItem from '../../components/TextareaItem';
  import NavBar from '../../components/NavBar';
  import DateSelectorItem from '../../components/DateSelectorItem';

  export default {
    created:function(){
      this.group =  this.$route.query.data;
      this.groupId = this.$route.query.groupId;
      this.head.title = this.$route.query.title;
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:''
        },
        updatebtn :{
          text : this.$t('commitButton'),
          clx : 'weui_btn bg-red'
        },
        deletebtn :{
          text : this.$t('delete'),
          clx : 'weui_btn bg-red'
        },
        group : {},
        groupId : ''
      }
    },
    computed:{
      title(){
        return this.$t('edit') + this.$route.query.title || '';
      }
    },
    methods:{
      doSubmit(){
        let resultMap = [];
        let me = this;
        for(let index in this.group.groupData){
          let item = this.group.groupData[index];
          let itemType = item.type.input;
          let resultValue = '';
          let cmp = me.$refs[item.field_code][0];
          let resObj = {
            field_code : item.field_code
          }
          switch(itemType){
            case 'selector' : {
              resObj.value = (cmp.picker.cols.length > 0 ) ? cmp.picker.cols[0].value : cmp.picker.value[0];
              break;
            }
            case 'text' :
            case 'textarea' : {
              resObj.value = cmp.dataValue;
              break;
            }
          }
          if(item.nullable === false && (resObj.value === null || resObj.value === '')){
            f7.alert('',item.title+this.$t('cannot-null'));
            break;
          }else{
            resultMap.push(resObj);
          }
        };
        this.$store.dispatch('updateForm',{
          groupId : this.groupId,
          value : resultMap,
          dataId : this.group.groupId
        }).then((response)=>{
          if(response.body.status === 1){
            let me = this;
            f7.alert('',me.$t('modifySucceed'),()=>{
              me.$router.back();
            });
          }else{
            f7.alert('',response.body.message);
          }
        },(error)=>{
          f7.alert(error);
        });
      },
      doDelete(){
        this.$store.dispatch('deleteForm',{
          groupId : this.groupId,
          dataId : this.group.groupId
        }).then((response)=>{
          if(response.body.status === 1){
            let me = this;
            f7.alert('',me.$t('deleteSucceed'),function(){
              me.$router.back();
            });

          }else{
            f7.alert('',response.body.message);
          }
        },(error)=>{
          f7.alert(error);
        });
      }
    },

    components: {
      InputText,
      SubmitBtn,
      VContent,
      SelectorItem,
      CheckboxItem,
      TextItem,
      TextareaItem,
      NavBar,
      DateSelectorItem
    },

    locales: {
      zh: {
        'add' : '添加',
        'edit' : '编辑',
        'commitButton' : '提交',
        'delete' : '删除',
        'cannot-null' : '不能为空',
        'modifySucceed' : '修改成功',
        'deleteConfirm' : '确定要删除吗？',
        'deleteSucceed' : '删除成功！',
        'loading' : '数据加载中...',
        'submitting':'提交中...',
        'deleting' : '删除中...'
      },

      en: {
        'add' : 'Add ',
        'edit' : 'Edit ',
        'commitButton' : 'Submit',
        'delete' : 'Delete',
        'cannot-null' : 'can not be null',
        'modifySucceed' : 'Modify Succeed!',
        'deleteConfirm' : 'Are you sure to delete?',
        'deleteSucceed' : 'Delete Success!',
        'loading' : 'Loading...',
        'submitting':'Submitting...',
        'deleting' : 'Deleting...'
      }
    }
  }
</script>

<style scoped>
  .SubmitBtn{
    margin: 20px;
    color: white;
    -webkit-box-flex: 1;
  }

</style>
