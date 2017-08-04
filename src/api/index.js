import {checkToken,appLog,userLogin,userLoginSubSite,appVersion,dynamicMenu,rotateImage,nineLattices,iconNavigation,iconNavigationAll,newPosition,newEmployee,employeeDetail,dynamicCategory,dynamicCategoryList,
  announcementCategory,announcementList,newToShare,enterpriseNews,journalOfEnterprise,mySkills,mySkillsAdd,mySkillsAgree,blessCards,cardPresenter,giveCard,myMedal,myDynamic,myBlog,activityDetail,wishes,likes,likeTypes,blessingTypes,sendLikes,cultureDetail,articleDetail,postsDetail,commentsList,
  commentSubmit,contact,searchContact,articleLike,uploadPhoto,editEmployeeDes,deletePhoto,addDynamic,sendBlessing} from './resources'

export default {
  postCheckToken:function(){
    let domain = localStorage.getItem('EP_user_company')?localStorage.getItem('EP_user_company'):''
    return checkToken.save({origin:domain},{})
  },

  postAppLog:function(data){
    return appLog.save({},data)
  },

  postUserLogin:function(data){
    data.lang = localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'
    return userLogin.save({epLogin:'token'},data)
  },
  postUserLoginSubSite:function(data){
    data.lang = localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'
    let domain = localStorage.getItem('EP_user_company')
    return userLoginSubSite.save({origin:domain},data)
  },
  getAppVersion:function(){
    let domain = localStorage.getItem('EP_user_company')
    return appVersion.get({origin:domain})
  },
  getDynamicMenu:function(){
    let domain = localStorage.getItem('EP_user_company')
    return dynamicMenu.get({origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getRotateImage:function(){
    let domain = localStorage.getItem('EP_user_company')
    return rotateImage.get({origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getNineLattices:function(){
    let domain = localStorage.getItem('EP_user_company')
    return nineLattices.get({origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getIconNavigation:function(){
    let domain = localStorage.getItem('EP_user_company')
    return iconNavigation.get({origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getIconNavigationAll:function(){
    let domain = localStorage.getItem('EP_user_company')
    return iconNavigationAll.get({origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getNewPosition: function () {
    let domain = localStorage.getItem('EP_user_company')
    return newPosition.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getNewEmployee: function () {
    let domain = localStorage.getItem('EP_user_company')
    return newEmployee.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getEmployeeDetail:function(userId){
    let domain = localStorage.getItem('EP_user_company')
    return employeeDetail.get({ origin:domain,userId:userId,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getDynamicCategory:function(){
    let domain = localStorage.getItem('EP_user_company')
    return dynamicCategory.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getDynamicCategoryList:function(id,page){
    let domain = localStorage.getItem('EP_user_company')
    return dynamicCategoryList.get({ origin:domain,id: id,page:page,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getAnnouncementCategory:function(){
    let domain = localStorage.getItem('EP_user_company')
    return announcementCategory.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'})
  },
  getAnnouncementList:function(id){
    let domain = localStorage.getItem('EP_user_company')
    return announcementList.get({ origin:domain,id: id,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getEnterpriseNews:function(){
    let domain = localStorage.getItem('EP_user_company')
    return enterpriseNews.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getJournalOfEnterprise:function(){
    let domain = localStorage.getItem('EP_user_company')
    return journalOfEnterprise.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getNewToShare:function(number){
    let domain = localStorage.getItem('EP_user_company')
    return newToShare.get({ origin:domain,number:number,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getMySkills:function(userId,endorser_id){
    let domain = localStorage.getItem('EP_user_company')
    return mySkills.get({ origin:domain,userId:userId,endorser_id:endorser_id,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  addMySkills:function(data){
    let domain = localStorage.getItem('EP_user_company')
    let userId = localStorage.getItem('EP_user_id')
    return mySkillsAdd.save({origin:domain,userId:userId},data)
  },
  agreeSkills:function(userId,data){
    let domain = localStorage.getItem('EP_user_company')
    return mySkillsAgree.save({origin:domain,userId:userId.id},data)
  },
  deleteMySkills:function(data){
    let domain = localStorage.getItem('EP_user_company')
    let userId = localStorage.getItem('EP_user_id')
    return mySkillsAdd.save({origin:domain,userId:userId},data)
  },
  getBlessCards:function(userId){
    let domain = localStorage.getItem('EP_user_company')
    return blessCards.get({ origin:domain,userId:userId,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getCardPresenter:function(userId,type){
    let domain = localStorage.getItem('EP_user_company')
    return cardPresenter.get({ origin:domain,userId:userId,type:type,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  postGiveCard:function(data){
    let domain = localStorage.getItem('EP_user_company')
    return giveCard.save({origin:domain},data)
  },
  getMyMedal:function(userId){
    let domain = localStorage.getItem('EP_user_company')
    return myMedal.get({ origin:domain,userId:userId,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getMyDynamic:function (userId,page) {
    let domain = localStorage.getItem('EP_user_company')
    return myDynamic.get({ origin:domain,userId:userId,page:page,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getMyBlog:function (userId,page) {
    let domain = localStorage.getItem('EP_user_company')
    return myBlog.get({ origin:domain,userId:userId,page:page,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getMyActivityDetail:function(activityId){
    let domain = localStorage.getItem('EP_user_company')
    return activityDetail.get({ origin:domain,userId:activityId,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getWishes:function(activityId,page){
    let domain = localStorage.getItem('EP_user_company')
    return wishes.get({ origin:domain,userId:activityId,page:page,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getLikes:function(activityId,page){
    let domain = localStorage.getItem('EP_user_company')
    return likes.get({ origin:domain,userId:activityId,page:page,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getLikeTypes:function(){
    let domain = localStorage.getItem('EP_user_company')
    return likeTypes.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getBlessingTypes:function(){
    let domain = localStorage.getItem('EP_user_company')
    return blessingTypes.get({ origin:domain,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },

  postSendLikes:function(data){
    let domain = localStorage.getItem('EP_user_company')
    return sendLikes.save({origin:domain},data)
  },
  postSendBlessing:function(data){
    let domain = localStorage.getItem('EP_user_company')
    return sendBlessing.save({origin:domain},data)
  },

  getContactList:function(page,number,selfId){
    let domain = localStorage.getItem('EP_user_company');
    return contact.get({ origin:domain,page:page,number:number,lang:'ename',selfId:selfId});
  },
  getContactSearchList:function(page,number,key,selfId){
    let domain = localStorage.getItem('EP_user_company');
    return searchContact.get({ origin:domain,page:page,number:number,key:key,lang:'ename',selfId:selfId});
  },
  getCultureDetail:function(cultureId){
    let domain = localStorage.getItem('EP_user_company')
    return cultureDetail.get({ origin:domain,cultureId:cultureId,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getArticleDetail:function (cultureId,type) {
    let domain = localStorage.getItem('EP_user_company')
    return articleDetail.get({ origin:domain,cultureId:cultureId,type:type,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getPostsDetail:function(postsId){
    let domain = localStorage.getItem('EP_user_company')
    return postsDetail.get({ origin:domain,postsId:postsId,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  getCommentsList:function(postsId,page){
    let domain = localStorage.getItem('EP_user_company')
    return commentsList.get({ origin:domain,postsId:postsId,page:page,lang: localStorage.getItem('EP_lang')=='zh'?'zh-hans':'en'});
  },
  postCommentSubmit:function(data){
    let domain = localStorage.getItem('EP_user_company')
    return commentSubmit.save({ origin:domain},data);
  },
  postArticleLike:function(data){
    let domain = localStorage.getItem('EP_user_company')
    return articleLike.save({ origin:domain},data)
  },
  saveDynamicPhoto:function({data,filename,epToken}){
    let domain = localStorage.getItem('EP_user_company')
    return uploadPhoto.save({ origin:domain},{
      'filename' : filename,
      'file' : data,
      'ep_token' : epToken
    })
  },
  saveMyDescription:function(des,id){
    let domain = localStorage.getItem('EP_user_company')
    return editEmployeeDes.save({ origin:domain,userId :id},{description : des});
  },
  deleteDynamicPhoto:function(id){
    let domain = localStorage.getItem('EP_user_company')
    return deletePhoto.delete({ origin:domain,deleteId : id},{force : 1});
  },
  createDynamic:function(text,mediaArr){
    let domain = localStorage.getItem('EP_user_company')
    return addDynamic.save({ origin:domain},{
      'content' : text,
      'rtMedia_attached_files': mediaArr,
      'rtmedia-privacy':''
    });
  },

}
