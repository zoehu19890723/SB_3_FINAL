<template>
  <div class="list-block" style="margin:5px 0">
    <div class="wx-group">
    <ul class="wx-settings" v-if="!isGroup">
      <li v-for="item in items" :class="['item-content',item.permission_code > 2 ? 'edit-item item-link':'']" @click="editItem(item)">
        <div class="item-inner">
          <div class="item-title">{{item.title}}</div>
          <div class="item-after" v-if="item.permission_code > 2">
            <label class="label-switch" v-if="item.type.input ==='checkbox'"> 
                <input v-if="item.value === 1" type = "checkbox" checked="on"/>
                <input v-else type = "checkbox"/>
                <div class="checkbox"></div>
            </label>
            <input type="text" v-if="item.type.input.indexOf('selector') > -1" class="weui-input edit-selector-input" readonly :data-type="item.type.input" :value="item.displayValue"/>
          </div>
          <span class="ess-item-value" v-if="item.permission_code <= 2 || (item.permission_code > 2 && item.type.input.indexOf('text')>-1)">{{item.value}}</span>
        </div>
      </li>
    </ul>
    <ul class="wx-settings editable-group" v-for="group in groupList" v-if="isGroup" @click="editGroup(group)">
      <div class="wx-title group-split-block border-color">{{group.groupTitle}}</div>
      <li v-for="it in group.groupData" class="item-content">
        <div class="item-inner">
          <div class="item-title">
            <span>{{it.title}}</span>
          </div>
          <span class="ess-item-value">{{it.value}}</span>
        </div>
      </li>
      <li v-if="group.permission_code > 2">
        <div class="item-inner font-color-with-imp edit-container" style="padding-right:0px;height: 2em;background: #efefef;">
            <i class="WeStar_iconfont edit-group">&#xe624;</i>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import {cloneArray} from '../utils/tools';
  export default {
    props: {
      propList : {},
      groupID : '',
      groupTitle : '',
      typeTitle : ''
    },
    computed: {
      items() {
        if(this.propList.isGroup === false){
          let tempList = cloneArray(this.propList.data);
          tempList.forEach((item)=>{
            if(item.type.input === 'selector'){
              let tempValue = _.find(item.type.avaliableValue,{
                value : item.value
              });
              if(tempValue){
                item.displayValue = tempValue.display;
              }
              
            }
          })
          return tempList;
        }else{
          return null;
        }
      },
      isGroup(){
        return this.propList.isGroup;
      },
      rightLevel(){
        return this.propList.permission_code;
      },
      groupList(){
        if(this.propList.isGroup === true){
          let destData = this.propList.data;
          destData.forEach((item) => {
            if(item.groupTitle !== undefined && item.groupTitle !== null){
              item.hasTitle = true;
            }else{
              item.hasTitle = false;
            }
          })
          return destData;
        }else{
          return null;
        }
      }
    },

    methods : {
      editItem(item){
        if(item.permission_code > 2){
          if(item.type.input.indexOf('text')>-1){
            console.log(1,item.type.input);
            this.$router.push({ 
              path: 'esshrdetail2', 
              query: { 
                field_code: item.field_code,
                value : item.value || null,
                title : item.title,
                nullable: item.nullable,
                groupId: this.groupID
              }
            });
          }else if(item.type.input.indexOf('selector')>-1){
            console.log(2,item.type.input);
            this.$router.push({ 
              path: 'esshrdetail5', 
              query: { 
                field_code: item.field_code,
                value : item.value || null,
                title : item.title,
                avaliableArray : item.type.avaliableValue || [],
                nullable: item.nullable,
                groupId: this.groupID
              }
            });
          }
          
        }
      },
      editGroup(group){
        if(group.permission_code > 2){
          group.groupData.forEach(function(item){
            if(item.type.input === 'selector'){
              item.display_value = _.find(item.type.avaliableValue,{
                'display' : item.value
              }).value;
            }
          })
          this.$router.push({ 
            path: 'esshrdetail3', 
            query: {
              data : group,
              groupId: this.groupID,
              title : this.typeTitle
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
.item-inner{
  height: 3em;
}
</style>
