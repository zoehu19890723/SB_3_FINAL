<template>
  <div class="panelClass">
    <input type="text" style="width: calc(100% - 24px);" :id="fieldCode" class="weui-input"  value="" sourceValue="" readonly v-model="dataValue" :data-flag = "dataFlag"/>
    <i class="WeStar_iconfont right-down">&#xe610;</i>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    name: 'CompanySelect',

    props: {
      fieldCode:{
        type: String
      },
      avaliableArray : {
        type: Array
      },
      changeAction : {
        type: Function,
        default: null
      },
      closeAction: {
        type: Function,
        default: null
      },
    },
    computed:{
      dataFlag(){
        if(this.avaliableArray !== undefined && this.avaliableArray!== null && this.avaliableArray.length > 0 ){
          this.initPicker();
          return true;
        }else{
          return false;
        }
      }
    },

    mounted : function(){
      if(this.avaliableArray !== undefined && this.avaliableArray!== null && this.avaliableArray.length > 0){
        this.initPicker();
      }
    },

    data(){
      return {
        picker : null,
        dataValue : '',
        pickerInited : false
      }
    },
    locales: {
      zh: {
        'sure' : '确认',
      },

      en: {
        'sure' : 'Sure',
      }
    },

    methods: {
      initPicker(){
        let me = this;
        let avaliableArray = me.avaliableArray;

        me.picker = f7.picker({
          input: '#'+me.fieldCode,
          toolbarTemplate: '<div class="toolbar">' +
              '<div class="toolbar-inner">' +
              '<div class="left">' +
              '<a href="#" class="link toolbar-randomize-link"></a>' +
              '</div>' +
              '<div class="right">' +
              '<a href="#" class="link close-picker">'+this.$t('sure')+'</a>' +
              '</div>' +
              '</div>' +
              '</div>',
          value : [avaliableArray[0]],
          textAlign : 'center',
          cols: [{values : avaliableArray}],
          onChange: function(p, values) {
            if(p.cols[0] !== undefined && p.cols[0] !== null){
              let seleted = p.cols[0].value;
              if(me.changeAction !== undefined && me.changeAction !== null && typeof me.changeAction === 'function'){
                me.changeAction(seleted);
              }
            }
          },
          onClose : function(p){
            if(me.closeAction !== undefined && me.closeAction !== null && typeof me.closeAction === 'function'){
              me.closeAction(p.value[0]);
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
 .panelClass{
    background: rgba(216,0,49,0.03);
    padding: 2px 4px;
    border-radius: 10px;
    width: 100%;
 }
</style>
