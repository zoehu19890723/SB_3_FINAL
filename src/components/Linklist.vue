<template>
  <div class="wx-group" style="margin: 5px 0;">
    <ul class="wx-settings">
      <router-link tag="li" v-for="item in items" class="wx-item we-star-person" :to="{path:item.path,query:item.query}">
        <span class="wx-content"> 
            <i class="WeStar_iconfont"  style="font-size:18px" v-if="item.edit" >&#xe626;</i> 
            <span :class="['badge', item.noteColor, item.noteShape]" style="margin-left:8px" v-if="item.note">{{item.note}}</span>
            <i class="WeStar_iconfont">&#xe624;</i>
        </span>
        <div class="wx-name">{{item.title}}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      propList : {},
    },
    computed: {
      items() {
        return this.propList;
      }
    }
  }
</script>

<style>
.red{
  background-color: red;
}
.wheat{
  background-color: rgb(204,203,178);
}
.grey{
  background-color: rgb(215,215,215);
}
.square{
  border-radius: 4px!important;
}
</style>
