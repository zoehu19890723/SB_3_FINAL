<template>
  <div>
    <div class="groupCard" v-for="item in salaryData">
      <div class="groupCardTitle">
        <span>{{item.groupTitle}}</span>
      </div>
      <div class="groupItem" v-for="it in item.groupData">
        <div class="groupSubTitle">{{it.subTitle}}</div>
        <div class="groupSubitem" v-for="itt in it.subData">
          <span>{{itt.title}}</span>
          <span>{{itt.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'groupInfoCard',
    props : {
      salaryData : {
        type : Array,
        default : []
      },
    }
  }
</script>

<style scoped>
  .groupCard{
    margin-bottom: 16px;
    background: white;
    padding: 8px 16px;
  }
  .groupCardTitle{
    font-size: 16px;
    padding: 8px 0px;
    color: #333333;
    font-weight: bold;
    border-bottom: 1px solid #dedede;
  }
  .groupSubitem{
    display: flex;
    justify-content: space-between;
    line-height: 38px;
    color: #999999;
  }
  .groupSubTitle{
    color: #333333;
    border-bottom: 1px solid #dedede;
    font-size: 16px;
    line-height: 38px;
  }
  .groupItem{
    margin-left: 16px;
  }
  .groupSubitem:nth-last-of-type(n+2){
    border-bottom: 1px solid #dedede;
  }
  .groupItem:nth-last-of-type(n+2){
    border-bottom: 1px solid #dedede;
  }
</style>
