<template>
  <div class="page">
    <NavBar :headerInfo="head"></NavBar>
    <v-content className="page-content">
      <div class="topPanel">
        <div class="topPanel-1">
          <div class="left-panel">
            <i class="icon iconfont">&#xe649</i>
            <CompanySelect fieldCode="workCmp" :avaliableArray ="companyArray" :closeAction="changeCompany"></CompanySelect>
          </div>
        </div>
        <div class="work-day">
          <span>{{$t('workDay')}}</span>
          <span>{{attendInfo.workDay}}</span>
        </div>
        <div class="work-order">
          <span>{{$t('workType')}}</span>
          <span>{{attendInfo.workType}}</span>
        </div>
      </div>
      <div class="attendance-panel">
        <div class="current-time">{{$t('currentTime')}}{{currentTime}}</div>
        <div :class= "['work', workActive ? 'active' : '',showPunchPanel ? 'showPunchPanel' : '']">
          <div class="hint">
            <i class="icon iconfont">&#xe64b</i>
            <span class="label">{{$t('workSign')}} {{attendInfo.attendTime}}</span>
          </div>
          <div class="success-hint">
            <span v-if="workRecord.time">{{$t('punchTime')}} {{workRecord.time}}</span>
            <span v-if="workRecord.address"><i class="icon iconfont">&#xe646</i>{{workRecord.address}}</span>
          </div>
          <div :class="['attendence-action-panel',(inPosition === 3)? '':'disable']">
            <div class="attendence-action back-color-not-imp" @click="punch(0)">
              <div class="action-text">{{$t('workPunch')}}</div>
              <div class="attendance-back linear-back"></div>
            </div>
            <span>{{posHint}}</span>
          </div>
          <div class='showPunch' @click="togglePanel(true)">{{$t('showPunch')}}<i class="WeStar_iconfont right-down">&#xe610;</i></div>
        </div>
        <div :class= "['work', leaveActive ? 'active' : '',showPunchPanel ? '' : 'showPunchPanel']" style="margin-top:16px">
          <div class="hint">
            <i class="icon iconfont">&#xe647</i>
            <span class="label">{{$t('leaveSign')}} {{attendInfo.leaveTime}}</span>
          </div>
          <div class="success-hint">
            <span v-if="leaveRecord.time"> {{$t('punchTime')}} {{leaveRecord.time}}</span>
            <span v-if="leaveRecord.address"><i class="icon iconfont">&#xe646</i>{{leaveRecord.address}}</span>
          </div>
          <div :class="['attendence-action-panel',(inPosition === 3) ? '':'disable']">
            <div class="attendence-action back-color-not-imp" @click="punch(1)">
              <div class="action-text">{{$t('leavePunch')}}</div>
              <div class="attendance-back linear-back"></div>
            </div>
            <span>{{posHint}}</span>
          </div>
          <div class='showPunch' @click="togglePanel(false)">{{$t('showPunch')}}<i class="WeStar_iconfont right-down">&#xe610;</i></div>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import VContent from '../../components/Content';
  import NavBar from '../../components/NavBar';
  import NoDataCard from '../../components/NoDataCard';
  import CompanySelect from '../../components/CompanySelect';
  import { mapGetters } from 'vuex';
  import {convertTimeValue,getDistance} from '../../utils/tools';
  import _ from 'lodash';

  export default {
    created:function(){
      this.$store.dispatch('getAttendInfo');
      this.setCurrentTime();
      this.getPosition();
      console.log(1)
    },
    mounted:function(){
    },
    computed : {
      ...mapGetters(['attendInfo']),
      
      companyArray(){
        let companyInfo = this.attendInfo.companyInfo;
        if(companyInfo && companyInfo.length >0){
          this.currentCompany = companyInfo[0];
        }
        return _.map(companyInfo, 'name');
      },

      workActive(){
        let attendBeginTime = this.attendInfo.attendBeginTime;
        let leaveTime = this.attendInfo.leaveTime;
        if(attendBeginTime && leaveTime && this.formatTime(attendBeginTime) <= this.formatTime(this.currentTime) && this.formatTime(leaveTime) >= this.formatTime(this.currentTime)){
          return true;
        }else{
          return false;
        }
      },

      leaveActive(){
        let attendTime = this.attendInfo.attendTime;
        let leaveEndTime = this.attendInfo.leaveEndTime;
        if(attendTime && leaveEndTime && this.formatTime(attendTime) <= this.formatTime(this.currentTime) && this.formatTime(leaveEndTime) >= this.formatTime(this.currentTime)){
          return true;
        }else{
          return false;
        }
      },
      posHint(){
        if(this.inPosition === 3){
          return this.$t('inPos');
        }else if(this.inPosition === 2){
          return this.$t('outPos');
        }else if(this.inPosition === 0){
          return this.$t('posing');
        }else{
          return this.$t('posFailed');
        }
      },

      workRecord(){
        if(this.workSuccessHint.time){
          return this.workSuccessHint;
        }else{
          let workRecord = this.attendInfo.workRecord;
          if(workRecord){
            return workRecord;
          }else {
            return {noRecordHit : this.$t('lostWork')}
          }
        }
      },

      leaveRecord(){
        if(this.leaveSuccessHint.time){
          return this.leaveSuccessHint;
        }else{
          let leaveRecord = this.attendInfo.leaveRecord;
          if(leaveRecord){
            return leaveRecord;
          }else{
            return {noRecordHit : this.$t('lostLeave')}
          }
        }
      },

      showPunchPanel(){
        if(this.showWork === null){
          if((!this.workActive && this.leaveActive) || this.attendInfo.workRecord){
            return false;
          }else{
            return true;
          }
        }else{
          return this.showWork;
        }
        
      },

    },
    beforeDestroy(){
      clearInterval(this.timeInterval);
      clearInterval(this.positionInterval);
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title: this.$t('myAttendance'),
          backHref : '/home/navMore'
        },
        currentTime : 0,
        timeInterval : null,
        positionInterval : null,
        currentCompany : {},
        inPosition : 0,
        currentLoc : {},
        workSuccessHint : {},
        leaveSuccessHint : {},
        showWork : null
      }
    },
    methods:{
      setCurrentTime(){
        this.timeInterval = setInterval(()=>{
          let ctTime = new Date();
          this.currentTime = ctTime.getFullYear() + '-' + convertTimeValue(ctTime.getMonth()+1) + '-' + convertTimeValue(ctTime.getDate())+ '  ' + convertTimeValue(ctTime.getHours())+':'+convertTimeValue(ctTime.getMinutes())+ ':' +convertTimeValue(ctTime.getSeconds());
        },1000)
      },
      formatTime(time){
        if(time){
          let temp = time.split(/[-|:|\s]+/);
          if(temp.length > 4){
            let sec = temp[5] || 0;
            let date = new Date(parseInt(temp[0]),(parseInt(temp[1])-1),parseInt(temp[2]),parseInt(temp[3]),parseInt(temp[4]),parseInt(sec));
            return date.getTime();
          }else{
            return 0;
          }
        }else{
          return 0;
        }
      },
      onPosSuccess(position){
        let usrLng = position.coords.longitude;
        let usrLat = position.coords.latitude;
        this.dealSuccessPos(usrLng,usrLat);
      },
      onPosError(){
        this.inPosition = 1;
      },
      getPosition(){
        this.positionInterval = setInterval(()=>{
          navigator.geolocation.getCurrentPosition(this.onPosSuccess, this.onPosError, {
              enableHighAccuracy: true,
              maximumAge: 3000,
              timeout: 3000
          });
        },5000);
      },
      dealSuccessPos(lng,lat){
        let BPoint = new BMap.Point(lng,lat);
        let convertor = new BMap.Convertor();
        convertor.translate([BPoint], 1, 5, this.translateCallback);//把原始gps坐标转化为百度坐标
      },

      translateCallback(data){
        this.currentLoc = data.points[0];
        let map = new BMap.Map();
        let cmpPoint = new BMap.Point(this.currentCompany.loc.lng,this.currentCompany.loc.lat);
        let distance = (map.getDistance(data.points[0],cmpPoint)).toFixed(1);
        
        if(distance <= this.currentCompany.radius){
          this.inPosition = 3;
        }else{
          this.inPosition = 2;
        }
      },
      changeCompany(name){
        if(name !== this.currentCompany.name){
          this.currentCompany = _.find(this.attendInfo.companyInfo,{
            name : name
          });
          this.inPosition = 0;
        }
      },
      punch(type){
        let point = new BMap.Point(this.currentLoc.lng,this.currentLoc.lat);
        let geoc = new BMap.Geocoder(); 
        geoc.getLocation(point, (rs)=>{
          let addComp = rs.addressComponents;
          let address = addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
          let sign_time = this.currentTime.substr(0,this.currentTime.lastIndexOf(':'))
          this.$store.dispatch('saveSignInRecord',{
            args : {
              location_lat : this.currentLoc.lat,
              location_lng : this.currentLoc.lng,
              sign_address : address,
              signin_time : sign_time,
              signin_type : type,
              equipment_serial_number : ''
            }
          }).then((res)=>{
            let tempHint = {
              time : sign_time,
              address : address
            }
            if(type === 0){
              this.workSuccessHint = tempHint;
            }else{
              this.leaveSuccessHint = tempHint;
            }
          });
        });
      },
      togglePanel(flag){
        this.showWork = flag;
      }
      
    },
    components: {
      VContent,
      NavBar,
      NoDataCard,
      CompanySelect
    },

    locales: {
      zh: {
        'myAttendance' : '考勤打卡',
        'workDay' : '工作日:',
        'workType' : '班次:',
        'currentTime' : '当前时间:',
        'workSign' : '上班签到',
        'leaveSign' : '下班签到',
        'punchTime' : '上次打卡 :',
        'workPunch' : '上班打卡',
        'leavePunch' : '下班打卡',
        'inPos' : '已经进入打卡范围',
        'outPos' : '还未进入打卡范围',
        'lostWork' : '未打上班卡',
        'lostLeave' : '未打下班卡',
        'posing' : '定位中...',
        'posFailed' : '定位失败,暂时不能打卡',
        'showPunch':'显示打卡'
      },

      en: {
        'myAttendance' : 'My Attendance',
        'workDay' : 'Work Day:',
        'workType' : 'Attendance Shift:',
        'currentTime' : 'Current Time:',
        'workSign' : 'Work Punch',
        'leaveSign' : 'Leave Punch',
        'punchTime' : 'Punch Time :',
        'workPunch' : 'workPunch',
        'leavePunch' : 'leavePunch',
        'inPos' : 'Entered the punch range',
        'outPos' : 'It hasn\'t entered the punch range yet',
        'lostWork' : 'Have not punch to work',
        'lostLeave' : 'Have not punch to leave',
        'posing' : 'In positioning...',
        'posFailed' : 'Seek failed',
        'showPunch':'Show punch'
      }
    }
  }
</script>

<style scoped>
.page-content{
  background-color: white;
}
.topPanel{
  border-bottom: 1px solid #999;
  color: #666;
  padding: 8px 0px;
  margin:0px 8px;
}
.topPanel-1{
  display: flex;
  align-items: center;
  color: #666
}
.left-panel{
  align-items: center;
  display: flex;
  flex:1;
}
.left-panel i{
  margin-right: 8px;
}
.right-panel{
  font-size: 14px;
  line-height: 20px;
}
.work-order span:first-child{
  word-spacing: 10px;
}
.work-day{
  font-size: 14px;
}
.work-order{
  color: #999;
  font-size: 14px;
}
.attendance-panel{
  padding:8px;
  font-size: 14px;
}
.current-time{
  margin-bottom: 8px;
}
.work{
  padding: 8px;
}
.work .attendence-action-panel{
  text-align: center;
  display: none;
  overflow: hidden;
  transition: all 0.2s linear;
}
.work .hint{
  display: flex;
  align-items: center;
}
.hint .point{
  color: white;
  border-radius: 50%;
  padding: 3px 6px 5px 6px;
  font-size: 12px;
  margin-right: 8px;
}
.hint .icon{
  margin-right: 8px;
  font-size: 22px;
}
.active .hint .icon{
  color: rgb(216,0,49);
}
.point{
  background-color: #999;
}
.attendence-action-panel .attendence-action{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  position: relative;
  margin: 20px 0px 20px calc(50% - 60px);
  background-color: rgb(216,0,49);
  color: white;
}
.attendance-back {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: -1;
  background: -webkit-gradient(linear, 0 100%, 0 0, from(rgba(216,0,49,.6)), to(rgba(216,0,49,.2)));
}
.work.active{
  background: rgba(216,0,49,0.03);
}
.work.active .attendence-action-panel{
  display: block;
}
.success-hint{
  margin-left: 36px;
  line-height: 18px;
  font-size: 14px;
  color: rgb(58,203,75);
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}
.action-text{
  font-size: 20px;
}
.success-hint .icon{
  font-size: 16px;
}
.success-hint span:last-child{
  color: #999;
}
.attendence-action-panel.disable .attendence-action{
  background-color: #c1c1c1;
  pointer-events: none;
}
.attendence-action-panel.disable .attendence-action .attendance-back{
  background: #cecece;
  opacity: 0.5;
}
.active.showPunchPanel .showPunch,.showPunch{
  display: none;
}
.active .showPunch{
  text-align: right;
  display: block;
}
.active .attendence-action-panel{
  height: 0px;
}
.active.showPunchPanel .attendence-action-panel{
  height: 160px;
}
</style>
