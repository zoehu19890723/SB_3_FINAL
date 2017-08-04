import Vue from 'vue'
import VueResource from 'vue-resource'
import {APP_ENV_NOW} from '../config'
import {getCookie,signOut} from '../utils/authService';
import {getRandomNumber} from '../utils/tools';

Vue.use(VueResource)

// HTTP相关
Vue.http.options.crossOrigin = true
Vue.http.options.credentials = false
Vue.http.options.emulateJSON = true

Vue.http.interceptors.push((request, next) => {

	// 这里对请求体进行处理
	request.headers = request.headers || {}
  		//request.headers.set("app-version",localStorage.getItem('EP_version'))
	  	//request.method == "POST"
  	if (localStorage.getItem('EP_token') != '' && localStorage.getItem('EP_token') != null && request.url.indexOf('epLogin')<0 &&request.method == "POST") {
		request.headers.map["Authorization"] = ['Bearer ' + localStorage.getItem('EP_token').replace(/(^\")|(\"$)/g, '')]
  	}else if(request.method == "GET"&&request.url.indexOf('user')>0){
    	request.headers.map["Authorization"] = ['Bearer ' + localStorage.getItem('EP_token').replace(/(^\")|(\"$)/g, '')]
  	}else{

  	}

  	if(request.method == "POST"&&request.url.indexOf('media')>=0){
      request.headers.map["Authorization"] = ['Bearer ' + localStorage.getItem('EP_token').replace(/(^\")|(\"$)/g, '')]
  	}else if((request.method == "DELETE"&&request.url.indexOf('media')>=0) || (request.method == "POST"&&request.url.indexOf('activity')>=0)){
      request.headers.map["Authorization"] = ['Bearer ' + localStorage.getItem('EP_token').replace(/(^\")|(\"$)/g, '')]
      request.headers.map["Content-Type"] = ['application/x-www-form-urlencoded'];
    }

	next((response) => {

    if(response.status< 200 || response.status > 299){
      setTimeout(() =>{
        f7.hidePreloader()
      },5000)
    }else {
      if(!response.body){
        f7.alert('地址：'+response.url+'内容：'+response.bodyText.substring(0,30),'接口异常')
      }
    }
		// 这里可以对响应的结果进行处理
		return response;
	})
})



// api： per_page-每页条数 page-页 cdp_culture_category-新闻类别
export const checkToken = Vue.resource(APP_ENV_NOW.RequestProtocol  + '{origin}' +'/wp-json/jwt-auth/v1/token/validate') //token 验证

export const appLog = Vue.resource(APP_ENV_NOW.RequestProtocol  + APP_ENV_NOW.EP +'app-log/app-log.php')// 错误日志页面

export const userLogin = Vue.resource(APP_ENV_NOW.RequestProtocol  + APP_ENV_NOW.EP + 'wp-json/jwt-auth/v1' + '{/epLogin}') //登陆

export const userLoginSubSite = Vue.resource(APP_ENV_NOW.RequestProtocol  + '{origin}' + '/wp-json/jwt-auth/v1/token') //登陆子站点

export const appVersion = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'?App-Version=1')//app 版本控制

export const dynamicMenu = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/app_settings') //动态菜单


export const rotateImage = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/cdp_slide?slide_type=image') //轮播图片
export const nineLattices = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-master/v1/icon') //九宫格
export const iconNavigation = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-master/v2/icons?type=hot') //自定义图标导航栏
export const iconNavigationAll = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-master/v2/icons') //全部图标导航栏
export const newPosition = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/job_listing?page=1') //热门职位
export const newEmployee = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/users?type=new') //新进员工列表
export const employeeDetail = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/users/'+'{userId}'+'?context=edit') //员工个人详情
export const dynamicCategory = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/cdp_culture_category?show_posts=1') //动态页面分类请求
export const dynamicCategoryList = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}'  + '/wp-json/wp/v2/'+'{id}' + '?per_page=10&page='+'{page}'+'&context=embed') //动态页面分类list请求
export const announcementCategory = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/cdp_hr_notice_category') //公告页面分类
export const announcementList = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/cdp_hr_notice?cdp_hr_notice_category=' + '{id}') //公告页面分类列表
export const newToShare = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/posts?context=embed&per_page=' + '{number}') //新鲜事分享
export const enterpriseNews = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/cdp_culture/?cdp_culture_category=48&context=embed&per_page=3') //cdp_culture_category=48企业新闻
export const journalOfEnterprise = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/cdp_culture?cdp_culture_category=59&context=embed&per_page=3')
//cdp_culture_category=59企业内刊
//我的页面

export const mySkills = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-skills/v1/user/' + '{userId}'+'?endorser_id={endorser_id}') //技能标签
export const mySkillsAdd = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-skills/v1/user/' + '{userId}') //添加技能标签
export const mySkillsAgree = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-skills/v1/user/' + '{userId}') //技能标签同意和取消

export const blessCards = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-mycred/v1/user/' + '{userId}')//用户祝福卡片及数量
export const cardPresenter = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-mycred/v1/transfer?user_id=' + '{userId}'+'&type='+'{type}')// 祝福卡赠送人列表
export  const giveCard = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-mycred/v1/transfer')//送卡片
export const myMedal = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/cdp-master/v1/mycred_badges/' + '{userId}')//勋章
export const myDynamic = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/buddypress/v1/activity?author='+'{userId}'+'&per_page=10&page='+'{page}') //动态
export const myBlog = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/cdp_emp_blog?author='+'{userId}'+'&per_page=10&page='+'{page}')//博客

export const activityDetail = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/buddypress/v1/activity/'+'{userId}') //动态博客详情

export const wishes = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/wishes/'+'{userId}'+'?per_page=10&page='+'{page}') //祝福
export const likes = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/likes/'+'{userId}'+'?per_page=10&page='+'{page}') //点赞
export const likeTypes = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/cdplike') //点赞类型
export const sendLikes = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/likes') //送点赞

export const blessingTypes = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/compliment')//送祝福类型
export const sendBlessing = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/wishes') //送祝福


export const contact = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/users?page='+'{page}'+'&per_page=' + '{number}'+'&sort='+'{lang}'+'&exclude='+'{selfId}'+'&roles=subscriber') //同事列表
export const searchContact = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/users?meta_search='+'{key}'+'&page='+'{page}'+'&per_page=' + '{number}'+'&sort='+'{lang}'+'&exclude='+'{selfId}'+'&roles=subscriber') //同事列表
//动态页面
export const cultureDetail = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/cdp_culture/'+'{cultureId}') //动态详情页culture
export const articleDetail = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/'+'{type}'+'/'+'{cultureId}') //动态详情页

export const postsDetail = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/posts/'+'{postsId}') //动态详情页culture

export const commentsList = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/comments?post='+'{postsId}'+'&per_page=10&page='+'{page}') //文章评论
export const commentSubmit = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/comments')//提交评论

export const articleLike = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/thumb_up')//提交评论

export const uploadPhoto = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/cdp-master/v1/media')//上传图片
export const deletePhoto = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/wp/v2/media/'+'{deleteId}')//删除图片
export const editEmployeeDes = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' + '/wp-json/wp/v2/users/'+'{userId}') //编辑个人简介
export const addDynamic = Vue.resource(APP_ENV_NOW.RequestProtocol + '{origin}' +'/wp-json/buddypress/v1/activity')//创建新的动态

