<template>
  <div>
    <span class="wx-content">
      <input type="text" :id="fieldCode" class="weui-input"  value="" sourceValue="" readonly v-model="dataValue" :placeholder="placeholder" :data-value="dataVal"/>
      <i class="WeStar_iconfont right-arrow">&#xe624;</i>
      <slot></slot>
    </span>
    <div class="wx-name">
      {{title}}
      <span class="font-red" v-if="!nullable">*</span>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    name: 'DateSelectorItem',

    props: {
      title : {
        type: String,
      },
      nullable:{
        type: Boolean,
        default: true
      },
      fieldCode:{
        type: String
      },
      defaultValue : '',
      placeholder : '',
      format : {
        type : String,
        default : 'yyyy-MM-dd hh:mm'
      },
      closeAction :{
        type: Function,
        default: null
      }
    },

    computed : {
      dataVal(){
        this.initPicker();
        return this.defaultValue;
      },
      inputVal(){
        let value = $('#'+this.fieldCode);
        return value;
      }
    },
    mounted : function(){
      this.initPicker();
    },

    data(){
      return {
        picker : null,
        dataValue : '',
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
        let valueArr = [];
        if(this.defaultValue !== undefined && this.defaultValue !== null && this.defaultValue !== ''){
          valueArr = _.without(this.defaultValue.split(/[:|\s+|-]/),'');
        }else{
          let nowDate = new Date();
          valueArr.push(nowDate.getFullYear(),nowDate.getMonth()+1,nowDate.getDate(),'18','00');
        }
        this.picker = this.initPickerWithFormat(this.format,valueArr);
        this.dataValue = this.defaultValue;
      },

      initPickerWithFormat(format,valueArr){
        let me = this;
        let toolbarTemplate = '<div class="toolbar">' +
          '<div class="toolbar-inner">' +
          '<div class="left">' +
          '<a href="#" class="link toolbar-randomize-link"></a>' +
          '</div>' +
          '<div class="right">' +
          '<a href="#" class="link close-picker" id="myDate-sure">'+me.$t('sure')+'</a>' +
          '</div>' +
          '</div>' +
          '</div>';

        let YYYYcol = {
            textAlign: 'left',
            values: (function() {
                let arr = [];
                let nowDate = new Date();
                for (let i = nowDate.getFullYear() - 10; i <= nowDate.getFullYear() +10; i++) {
                    arr.push(i);
                }
                return arr;
            })()
          };

        let MMcol = {
          values: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
          displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
        };

        let ddcol = {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          displayValues: ('01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31').split(' '),
        };

        let hhcol = {
          values: (function() {
              let arr = [];
              for (var i = 0; i <= 23; i++) {
                  arr.push(i < 10 ? '0' + i : i);
              }
              return arr;
          })()
        };

        let mmcol = {
          values: (function() {
              let arr = [];
              for (var i = 0; i <= 59; i++) {
                  arr.push(i < 10 ? '0' + i : i);
              }
              return arr;
          })(),
        };

        let dateDivider = {
            divider: true,
            content: '-'
        };
        let timeDivider = {
            divider: true,
            content: ':'
        };
        let blankDivider = {
            divider: true,
            content: '&nbsp;&nbsp;'
        };

        let picker = null;

        switch(format){
          default:
          case 'YYYY-MM-dd mm:hh' : {
            picker = f7.picker({
              input: '#'+me.fieldCode,
              toolbarTemplate: toolbarTemplate,
              value: [parseInt(valueArr[0]), parseInt(valueArr[1]), parseInt(valueArr[2]), valueArr[3],valueArr[4]],
              cols: [YYYYcol,dateDivider,MMcol,dateDivider,ddcol,blankDivider,hhcol,timeDivider,mmcol],
              formatValue: function(p, values) {
                  let date = values[0];
                  if (values[1] < 10) {
                      date += "-0" + values[1];
                  } else {
                      date += "-" + values[1];
                  }
                  if (values[2] < 10) {
                      date += "-0" + values[2];
                  } else {
                      date += "-" + values[2];
                  }
                  date += '   ' + values[3] + ':' + values[4];
                  return date;
              },
              onClose : function(p){
                if(me.closeAction !== undefined && me.closeAction !== null && typeof me.closeAction === 'function'){
                  me.closeAction(p.value);
                }
              }
            });
            break;
          }
          case 'YYYY-MM-dd':{
            picker = f7.picker({
              input: '#'+me.fieldCode,
              toolbarTemplate: toolbarTemplate,
              value: [parseInt(valueArr[0]), parseInt(valueArr[1]), parseInt(valueArr[2])],
              cols: [YYYYcol,dateDivider,MMcol,dateDivider,ddcol],
              formatValue: function(p, values) {
                let date = values[0];
                if (values[1] < 10) {
                    date += "-0" + values[1];
                } else {
                    date += "-" + values[1];
                }
                if (values[2] < 10) {
                    date += "-0" + values[2];
                } else {
                    date += "-" + values[2];
                }
                return date;
              },
              onClose : function(p){
                if(me.closeAction !== undefined && me.closeAction !== null && typeof me.closeAction === 'function'){
                  me.closeAction(p.value);
                }
              }
            });
            break;
          }
          case 'hh:mm' :{
            picker = f7.picker({
              input: '#'+me.fieldCode,
              toolbarTemplate: toolbarTemplate,
              value: [valueArr[0], valueArr[1]],
              cols: [hhcol,timeDivider,mmcol],
              formatValue: function(p, values) {
                return values[0] + ':' + values[1];
              },
              onClose : function(p){
                if(me.closeAction !== undefined && me.closeAction !== null && typeof me.closeAction === 'function'){
                  me.closeAction(p.value);
                }
              }
            });
            break;
          }
        }
        return picker;
      },
    }

  }
</script>

<style scoped>
</style>
