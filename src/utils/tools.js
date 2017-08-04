import _ from 'lodash';
import {APP_ENV_NOW} from '../config';
import {signOut} from './authService';
import Vue from 'vue';
import PY from 'pinyin';
/**
 * deal image to pointed size
 * @param {Number} maxSize max size(width and height is the same)
 * @param {Object} objImg  image object
 */

export function AutoResizeImage(maxSize, src) {

    var img = new Image();
    img.src = src;
    var hRatio;
    var wRatio;
    var Ratio = 1;
    var w = img.width;
    var h = img.height;
    wRatio = maxSize / w;
    hRatio = maxSize / h;
    if (wRatio < 1 || hRatio < 1) {
      Ratio = (wRatio > hRatio ? wRatio : hRatio);
    }
    if (Ratio < 1) {
      w = w * Ratio;
      h = h * Ratio;
    }
    return {width : w,height : h};

}

export function compactDetail(data, struct, isgroup, generalID) {
  let new_form = cloneArray(struct);
  new_form.forEach((item, index) => {
    let code = item.field_code;
    let selectObj = _.find(data, {
      field_code: code
    });
    if ((generalID === undefined || generalID === null || generalID === '') && parseInt(item.permission_code) >= 3) {
      item.editAble = true;
    }
    item.value = ((selectObj === undefined || selectObj === null) ? null : selectObj.value);
    if (item.permission_code < 3 || isgroup === true) {
      item = convertType(item);
    }
  });
  return new_form;
};

export function compactGroupDetail(data, struct, generalID) {
  let result = [];
  let desObj = {};
  data.forEach((item, index) => {
    let groupdata = compactDetail(item.groupData, cloneArray(struct), true);
    desObj = {
      groupTitle: item.groupTitle || null,
      groupId: item.id || null,
      permission_code: item.permission_code,
      groupData: groupdata
    }
    result.push(desObj);
  })
  return result;
};

function cloneObj(old_obj) {
  let Constructor = old_obj.constructor;
  let obj = new Constructor();

  for (let attr in old_obj) {
    if (old_obj.hasOwnProperty(attr)) {
      if (typeof(old_obj[attr]) !== "function") {
        if (old_obj[attr] === null) {
          obj[attr] = null;
        } else {
          let type = typeof old_obj[attr];
          switch (type) {
            case 'object':
              {
                obj[attr] = cloneObj(old_obj[attr]);
                break;
              }
            case 'array':
              {
                obj[attr] = cloneArray(old_obj[attr]);
                break;
              }
            default:
              {
                obj[attr] = cloneCommon(old_obj[attr]);
                break;
              }
          }
        }
      }
    }
  }
  return obj;
};

export function cloneArray(old_array) {
  let thisArr = old_array.valueOf();
  let newArr = [];
  for (let i = 0; i < thisArr.length; i++) {
    newArr.push(cloneObj(thisArr[i]));
  }
  return newArr;
};

function cloneCommon(old_value) {
  return old_value.valueOf();
};

function convertType(item) {
  let lan = localStorage.getItem('EP_lang');
  let language = 'chinese';
  if(lan === 'en'){
    language =  'english';
  }

  let languageObj = {
    'zh' : {
      'checkboxT' : '是',
      'checkboxF' : '否',
    },
    'en' : {
      'checkboxT' : 'YES',
      'checkboxF' : 'NO',
    }
  }
  if (item === null) {
    return null;
  }
  if (item.type !== undefined && item.type.input !== undefined && item.type.input !== null) {
    var type = item.type.input;
    switch (type) {
      case 'selector':
        {
          var avaliableValues = item.type.avaliableValue;
          var isNormal = false;
          for (var i = 0; i < avaliableValues.length; i++) {
            var temp_item = avaliableValues[i];
            if (typeof temp_item === 'object' && temp_item.value == item.value) {
              item.value = temp_item.display;
              isNormal = true;
              break;
            } else if (temp_item == item.value) {
              item.value = temp_item;
              isNormal = true;
              break;
            }
          }
          if (isNormal === false) {
            item.value = null;
          }
          break;
        }
      case 'checkbox':
        {
          if (item.value === 1 || item.value === '1') {
            item.value = languageObj[lan].checkboxT;
          } else {
            item.value = languageObj[lan].checkboxF;
          }
          break;
        }
    }
    return item;
  }
}

export function dealImage(array, withoutInfo) {
  if (array && array.length !== 0) {
    array.forEach(function(item, index) {
      let subItem = withoutInfo ? item : item.userInfo;

      if (subItem && subItem.image && subItem.image !== "" && subItem.image.indexOf(APP_ENV_NOW.WSIMG) < 0) {
        let image = subItem.image.replace(/\s/g, '%20');
        subItem.image = APP_ENV_NOW.WSIMG + image;

        if (withoutInfo) {
          item = subItem;
        } else {
          item.userInfo = subItem;
        }
      }
    });
  }
  return array;
}

export function getSessionID(){
  return localStorage.getItem('EP_session_id');
}

export function getLanguage(){
  let lan = localStorage.getItem('EP_lang');
  if(lan === 'en'){
    return 'english';
  }else{
    return 'chinese';
  }
}

export function getWestarAjax(url, param) {
  let lan = localStorage.getItem('EP_lang');
  let language = 'chinese';
  if(lan === 'en'){
    language =  'english';
  }

  let languageObj = {
    'zh' : {
      'loading' : '数据加载中...',
      'sessionout' : '会话超时，请重新登陆',
      'neterror' : '网络错误，请稍后重试',
      'checkboxT' : '是',
      'checkboxF' : '否',
    },
    'en' : {
      'loading' : 'Loading...',
      'sessionout' : 'Session out, please login again',
      'neterror' : 'Net error , please try again',
      'checkboxT' : 'YES',
      'checkboxF' : 'NO',
    }
  }

  let params = {
    format: 'jsonp',
    cubi_sess_id: localStorage.getItem('EP_session_id'),
    lan: language
  }
  if (param !== undefined && param !== null) {
    params.argsJson = JSON.stringify(param);
  }
  epApp.$store.commit('setMask',{show:true,text:languageObj[lan].loading});

  return Vue.http.jsonp(url, {
    params: params
  }).then(
    (response) => {
      epApp.$store.commit('hideMask');
      if (response.body.status === 555) {
        signOut();
        localStorage.removeItem('EP_token');
        localStorage.removeItem('EP_user_company');
        localStorage.removeItem('EP_user_login_pwd');
        localStorage.removeItem('EP_user_login_name');
        localStorage.removeItem('EP_access_idp_token');

        f7.alert('', languageObj[lan].sessionout, function() {
          epApp.$router.push('/login');
        })
      }else if(response.body.status === 9999){
        f7.alert('', response.body.message);
      }else{
        return response;
      }
    },
    (error) => {
      epApp.$store.commit('hideMask');
      f7.alert('', languageObj[lan].neterror);
    }
  )
}

export function convertTimeValue(value){
  return (value < 10) ? ('0'+value) : value;
}

export function unescapeHtml(str) {
  return str.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g,"'")
    .replace(/&#8230;/g,"...")
    .replace(/&#039;/g, "'");
}

export function dealSpecChar(str){
  return str.replace(/%40/g, '@')
  .str.replace(/%23/g, '#')
  .str.replace(/%2e/g, '.')
  .str.replace(/%2d/g, '-')
  .str.replace(/%21/g, '!');
}

export function openLink(link,title,path){
  let browser = localStorage.getItem('EP_browser');
  let backBtn = (localStorage.getItem('EP_lang') === 'en')?'Close':'关闭';
  let paraSymbol = link.indexOf('?')>0?'&':'?'
  if(typeof cordova === 'undefined' || browser === 'wexin'){
    epApp.$router.push({ path: path, query: {redirect:link,title:title}});
  }else if(browser === "android"){
    let ref = cordova.InAppBrowser.open(link+paraSymbol+'token='+localStorage.getItem('EP_token'), '_blank', 'location=yes,toolbar=yes');
    ref.show();
  }else{
    let ref = cordova.InAppBrowser.open(link+paraSymbol+'token='+localStorage.getItem('EP_token'), '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption='+backBtn);
    ref.show();
  }
}

export function getRandomNumber(){
  let timestamp = (new Date()).valueOf();
  let num = Math.ceil(Math.random() * 1000);
  let result = timestamp + "_" + num;
  return result;
}

export function showToast(text,afterAction){
  if(window.plugins !== undefined && window.plugins.toast !== undefined){
    window.plugins.toast.showShortCenter(text);
    afterAction();
  }else{
    f7.alert('', text,function() {
      afterAction();
    });
  }
}

function testNullable(str){
  if(str !== undefined && str !== null && str.trim() !== ''){
    return true;
  }else{
    return false;
  }
}
function getChar(chara){
  let reg = /^[A-Za-z0-9]*$/;
  let chinesReg = /[\u4e00-\u9fa5]+/;
  if(reg.test(chara)){
    return chara.toUpperCase();
  }else{
    if(chinesReg.test(chara)){
      let tempChar = PY(chara,{
        style: PY.STYLE_FIRST_LETTER
      });
      if(reg.test(tempChar[0][0])){
        return tempChar[0][0].toUpperCase()
      }else{
        return ''
      }
    }else{
      return '';
    }
  }
}
export function dealUsrInfo(item){
  let photo = null;
  if(item.meta.emp_photo_prefix && item.meta.emp_photo){
    photo = item.meta.emp_photo_prefix + item.meta.emp_photo;
  }
  let newObj = {
    name : item.name,
    id : item.id,
    emp_code : item.meta.code,
    gender : item.meta.emp_gender || 2,
    fullName_zh : item.meta.emp_fullname_zh_CN,
    fullName_en : item.meta.emp_fullname_en_US,
    photo : photo
  };

  let favorList = store.get('favorList') || [];
  let existIndex = _.findIndex(favorList,{
    id : newObj.id
  });
  if(existIndex > -1){
    newObj.isFavor = true;
  }else{
    newObj.isFavor = false;
  }

  let photoText = '';
  if(testNullable(newObj.fullName_zh)){
    photoText = newObj.fullName_zh;
  }else if(testNullable(newObj.fullName_en)){
    photoText = newObj.fullName_en;
  }else if(testNullable(newObj.name)){
    photoText = newObj.name;
  }
  newObj.nameTxt = photoText;

  return dealUsrPhoto(newObj,newObj.nameTxt);
}

export function dealUsrPhoto(item,text){

  if(!testNullable(item.photo)){
    item.hasImg = false;
    let gender = parseInt(item.gender);
    switch(gender){
      case 0 :{
        item.photoColor = 'rgb(167,23,191)';
        break;
      }
      case 1 :{
        item.photoColor = 'rgb(68,114,196)';
        break;
      }
      default:{
        item.photoColor = 'rgb(7,209,175)';
        break;
      }
    }
    let pyStr = '';
    if(text.length === 1){
      pyStr += getChar(text.charAt(0));
    }
    if(text.length > 1){
      pyStr = getChar(text.charAt(0)) + getChar(text.charAt(1));
    }
    item.abbChar = pyStr;
  }else{
    item.hasImg = true;
  }
  return item;
}


export function showMore(){
  let moreContentArray = epApp.$store.state.moduleProfile.more.content;
    if(moreContentArray !== undefined && moreContentArray.length !== 0){
      let popoverHTML = '<div class="popover"><div class="popover-inner">';
      moreContentArray.forEach(
        (item)=>{
          popoverHTML += '<a class="specDiv" href="#">'+ item.title +'</a>';
        })
      popoverHTML += '</div></div>'
      f7.popover(popoverHTML, $('div.right i'));

      $('.specDiv').on('click',function(e){
        e.preventDefault();
        f7.closeModal();
        epApp.$router.push({ path: '/home/helpDoc', query: { title : moreContentArray[0].title,content : moreContentArray[0].text}});
      })
    }
}

export function PIWIKstatistics(info){
  //参数一:category,参数二action：页面title，参数三name：点击按钮的title，参数四value：1
  if(window._paq){
    window._paq.push([info.trackType,info.category, info.action, info.name,info.value]);
    window._paq.push(['trackContentInteraction', info.action, info.name, 'Content Piece', window.location.href]);
  }
}

//JS判断闰年代码
export function isLeapYear(Year) {
  if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
    return (true);
  } else { return (false); }
}

export function TotalDays(year,month,days) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days += 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days += 30;
      break;
    case 2:
      if (isLeapYear(year)) {
        days += 29;
      } else {
        days += 28;
      }
      break;
    default:
      if (isLeapYear(year)) {
        days = 366;
      } else {
        days = 365;
      }
      break;
  }
  return days;
}
  
//将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
function rad(d) {  
  return d * Math.PI / 180.0;  
}  

/** 
 * 谷歌地图计算两个坐标点的距离 
 * @param lng1  经度1 
 * @param lat1  纬度1 
 * @param lng2  经度2 
 * @param lat2  纬度2 
 * @return 距离（千米） 
 */  
export function getDistance(lng1, lat1, lng2, lat2) { 
  let EARTH_RADIUS = 6378.137; //地球半径   
  let radLat1 = rad(lat1);  
  let radLat2 = rad(lat2);  
  let a = radLat1 - radLat2;  
  let b = rad(lng1) - rad(lng2);  
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)  
          + Math.cos(radLat1) * Math.cos(radLat2)  
          * Math.pow(Math.sin(b / 2), 2)));  
  s = s * EARTH_RADIUS;  
  s = Math.round(s * 10000) / 10000;  
  return s*1000;  
}
