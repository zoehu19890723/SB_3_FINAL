<template>
  <router-link :to="{path:'/contact/empDetailPage',query:{id :newItem.id,isFavor:newItem.isFavor ? 1 :0,fromContact:fromTab}}" class="contactItem-panel">
    <div class="content-text">
      <span class="wx-icon cut-img">
        <img v-lazy="newItem.photo" style="width:36px;height:36px" v-if="newItem.hasImg"/>
        <div :style="'background-color:'+newItem.photoColor" class="photo-text" v-else>{{newItem.abbChar}}</div>
      </span>
      <div class="wx-name">{{newItem.displayName}}</div>
      <i class="f7-icons favor-icon" v-if="newItem.isFavor">star_fill</i>
    </div>
    <i class="WeStar_iconfont" style="color:rgb(138,138,138)">&#xe624;</i>
  </router-link>
</template>

<script>
  export default {
    name : 'ContactItem',
    props : {
      item : {},
      fromTab : {
        type : String,
        default : 'favor'
      }
    },
    computed:{
      newItem(){
        let temp = this.item;
        if(temp.fullName_zh && temp.fullName_en){
          temp.displayName = temp.fullName_en+' | '+temp.fullName_zh
        }else if(temp.fullName_zh && !temp.fullName_en){
          temp.displayName = temp.fullName_zh;
        }else if(!temp.fullName_zh && temp.fullName_en){
          temp.displayName = temp.fullName_en
        }else{
          temp.displayName = temp.name || 'unkonw'
        }
        return temp;
      }
    }
  }
</script>

<style scoped>
.contactItem-panel{
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.contactItem-panel .content-text{
  display: flex;
  align-items: center;
}
.photo-text{
  color: white;
  font-size: 16px;
}
.favor-icon{
  font-size: 16px;
  margin-left: 11px;
  color: rgb(255,204,1);
}
</style>
