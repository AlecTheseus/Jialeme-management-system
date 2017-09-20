
<template>
  <div class="flexBase">
    <leftbar class="leftBar"></leftbar>
    <section>
      <header>
        <img class="" src="/static/img/personalInfo_dark.svg"/>个人信息
        <p class="hint">{{errHint}}</p>
      </header>
      <div class="mainInfo">
        <!--区域-->
        <div class="infoShow">
          <div class="portrait" :style="{backgroundImage: 'url(' + $store.state.onShow.portrait + ')'}"></div><div></div>
          <div v-if="$store.state.page.tab!='info'">备&nbsp;&nbsp;&nbsp;注：</div>
          <div v-if="$store.state.page.tab!='info'">{{$store.state.onShow.remark}}&nbsp;</div>
          <div>昵&nbsp;&nbsp;&nbsp;称：</div><div>{{$store.state.onShow.username}}&nbsp;</div>
          <div>推荐码：</div><div>{{$store.state.onShow.inviteCode}}&nbsp;</div>
          <div>电&nbsp;&nbsp;&nbsp;话：</div><div>{{$store.state.onShow.mobile}}&nbsp;</div>
          <div>店&nbsp;&nbsp;&nbsp;铺：</div><div>{{$store.state.onShow.school}}&nbsp;</div>
          <div  v-if="$store.state.page.tab!='info'">活跃度：</div>
          <div v-if="$store.state.page.tab!='info' && $store.state.onShow.activity=='0'">活跃</div>
          <div v-if="$store.state.page.tab!='info' && $store.state.onShow.activity=='1'">一般</div>
          <div v-if="$store.state.page.tab!='info' && $store.state.onShow.activity=='2'">消极</div>
          <div>级&nbsp;&nbsp;&nbsp;别：</div>
          <div v-if="$store.state.onShow.level=='0'">BOSS</div>
          <div v-if="$store.state.onShow.level=='1'">片区经理</div>
          <div v-if="$store.state.onShow.level=='2'">店长</div>
          <div v-if="$store.state.onShow.level=='3'">总监</div>
          <div v-if="$store.state.onShow.level=='4'">招生经理</div>
          <div v-if="$store.state.onShow.level=='5'">招生专员</div>


          <div @click="startChange" class="basicBlue btnInfo">修改信息</div>
          <div @click="logout" v-if="$store.state.page.tab=='info'" class="basicBlue btnInfo">退出登陆</div>
          <div style="clear: both"></div>
        </div>

        <!--月份遍历-->
        <div v-if="$store.state.page.tab=='info'">
          <div class="month" v-if="$store.state.onShow.month">
            <ul>
              <li @click = "selectMonth(month.month)"
                  v-for="(month,MonthIndex) in $store.state.onShow.month"
                  :class="{ monthActive: $store.state.page.selectedMonth  == month.month}"
              >{{month.month}}月<span class="glyphicon glyphicon-chevron-right"></span>
                <div class="monthDetail" v-if="$store.state.page.selectedMonth == month.month">
                  <p>个人招生：<span class="basicBlue">{{month.data.personalRecruitNum}}</span></p>
                  <div class="inList">
                    <div class="listItem" v-for="school in month.data.personalRecruit">
                      {{school.school}}
                      <span class="fr">{{school.num}}</span>
                    </div>
                  </div>
                  <p style="clear: both">团队招生：<span class="basicBlue">{{month.data.teamRecruitNum}}</span></p>
                  <div class="inList">
                    <div class="listItem" v-for="school in month.data.teamRecruit">
                      {{school.school}}
                      <span class="fr">{{school.num}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <!--different v-if-->
          <div class="month" v-if="$store.state.inCompare">
            <ul>
              <li @click = "selectMonth(month.month,'inCompare')"
                  v-for="(month,MonthIndex) in $store.state.onShow.month"
                  :class="{ monthActive: $store.state.page.selectedMonth  == month.month}"
              >{{month.month}}月<span class="glyphicon glyphicon-chevron-right"></span>
                <div class="monthDetail" v-if="$store.state.page.selectedMonth == month.month">
                  <p>个人招生：<span class="basicBlue">{{month.data.personalRecruitNum}}</span></p>
                  <div class="inList">
                    <div class="listItem" v-for="school in month.data.personalRecruit">
                      {{school.school}}
                      <span class="fr">{{school.num}}</span>
                    </div>
                  </div>
                  <p style="clear: both">团队招生：<span class="basicBlue">{{month.data.teamRecruitNum}}</span></p>
                  <div class="inList">
                    <div class="listItem" v-for="school in month.data.teamRecruit">
                      {{school.school}}
                      <span class="fr">{{school.num}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div v-if="changeStatus" class="cover"></div>
    <div v-if="changeStatus" class="changeBox">
      <p class="title">信息修改</p>
      <div class="infoShow">
        <div v-if="$store.state.page.tab=='info'" style="padding-top: 20px" >头&nbsp;&nbsp;&nbsp;像：</div>
        <div v-if="$store.state.page.tab=='info'" >
          <div class="portraitChange" :style="{backgroundImage: 'url(' + portrait + ')'}" onclick="$('#portraitInput').click()"></div>
          <form enctype="multipart/form-data">
            <input id="portraitInput" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="uploaderImg" style="display: none">
          </form>
        </div>
        <div v-if="$store.state.page.tab!='info'">备&nbsp;&nbsp;&nbsp;注：</div>
        <div v-if="$store.state.page.tab!='info'"><input v-model="remark"></div>
        <div v-if="$store.state.page.tab=='info'">昵&nbsp;&nbsp;&nbsp;称：</div>
        <div v-if="$store.state.page.tab=='info'"><input v-model="username"></div>
        <div v-if="$store.state.page.tab!='info'">活跃度：</div>
        <div v-if="$store.state.page.tab!='info'">
          <select v-if="$store.state.page.tab!='info'" v-model="activity" >
            <option value="0">活跃</option>
            <option value="1">一般</option>
            <option value="2">消极</option>
          </select>
        </div>
        <div v-if="$store.state.page.tab!='info' && level>2">级&nbsp;&nbsp;&nbsp;别：</div>
        <div v-if="$store.state.page.tab!='info'">
          <select v-if="$store.state.page.tab!='info' && level>2" v-model="level" >
            <option value="3">总监</option>
            <option value="4">招生经理</option>
            <option value="5">招生专员</option>
          </select>
        </div>
        <p class="hint">{{windowHint}}</p>
        <p v-if="$store.state.page.tab!='info'" class="hint">注：每人每月只能修改级别一次，津贴关系下月生效</p>

        <div  @click="confirmChange" class="basicBlue btnInfo">确定</div>
        <div  @click="closeChange" class="basicBlue btnInfo">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import leftbar from '../components/leftbar'
  import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      page:{
      },
      /*弹出框*/
      changeStatus:false,
      /*修改项*/
      portrait:'',
      remark:'',
      activity:'',
      username:'',
      level:'',
      /*提示信息*/
      errHint:'',
      windowHint:""
    }
  },
  methods: {
    /*选择月份，获取当月数据*/
    selectMonth(month,inCompare){
      let id
      if(inCompare == 'inCompare'){
        //对比中的
        id=this.$store.state.onShow.uid
      }else{
        //我的信息
        id=this.$store.state.myInfo.uid
      }
      this.$store.commit('SELECTMONTH_MYINFO',month)
      axios({
        url: '/My_Info?uid='+id,
        method: 'post',
        data: {
          month:month

        },
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      })
        .then((response) => {
          if(response.data.err !=0){
            this.errHint = response.data.msg
          }else{
            this.errHint =''
            if(inCompare == 'inCompare'){
              this.$store.commit('GETMONTHDETAILCOMPARE', {data:response.data.data,month:month});
            }else{
              this.$store.commit('GETMONTHDETAIL', {data:response.data.data,month:month});
            }
          }
          return true
        })
        .catch((error) => {
          this.errHint =error
          return error
        })

    },
    startChange(){
      this.remark=this.$store.state.onShow.remark;
      this.portrait=this.$store.state.myInfo.portrait;
      this.activity=this.$store.state.onShow.activity;
      this.username=this.$store.state.myInfo.username;
      this.level=this.$store.state.onShow.level;
      this.changeStatus = true
    },
    confirmChange(){
      /*ajax提交修改*/
      let submitData
      let submitUrl
      if(this.$store.state.page.tab=='info'){
          /*个人修改*/
        submitData ={
          username :this.username,
          portrait :this.portrait
        }
        submitUrl = '/update_myInfo?uid='+this.$store.state.myInfo.uid
      }else{
          /*下线修改*/
        submitData ={
          remark   :this.remark,
          activity :this.activity,
          level :this.level,
          uid:this.$store.state.onShow.uid,
          myid:this.$store.state.myInfo.uid
        }
        submitUrl = '/update_info?uid='+this.$store.state.onShow.uid
      }
      axios({
        url: submitUrl,
        method: 'post',
        data: submitData,
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      })
        .then((response) => {
          if(response.data.err !=0){
            this.windowHint = response.data.msg
          }else{
            this.windowHint = ''
            if(this.$store.state.page.tab=='info'){
              this.$store.commit('UPDATEMYINFONEW', submitData)
            }else {
              this.$store.commit('UPDATESUBINFONEW', submitData)
            }
            this.changeStatus = false
          }
          return true
        })
        .catch((response) => {
          if (response instanceof Error) {
            // Something happened in setting up the request that triggered an Error
            this.windowHint = '错误：'+ response.message;
          } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            console.log(response.config);
          }
        })

    },
    closeChange(){
      this.changeStatus = false
    },
    logout(){
      if(window.confirm('恁确定要退出登录吗？')){
        //alert("确定");
        localStorage.clear();
        this.$router.push('/');
        location.reload();
        return true;
      }else{
        //alert("取消");
        return false;
      }
    },
    uploaderImg() {
      var file = $('#portraitInput')[0].files[0];
      var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/svg|image\/png|image\/tiff)$/i;
      var iMaxFilesize = 1097152; // 1M
      var _this = this;
      if(file) {
        // 表示正在上传
        console.log(file)
        //this.$store.commit("SETLOADING", true);
        /*if(!rFilter.test(file.type)) {
         alert("文件格式必须为图片");
         return;
         }*/
        if(file.size > iMaxFilesize) {
          this.$status('noRes','',this,'图片大小不能超过1M')
          return;
        }

        // 注：定义FormData一定在设置数据之后。
        var form = new FormData()	//简历请求和数据;
        form.append("myfile", file);
        axios({
          url: '/update_portrait?uid='+this.$store.state.myInfo.uid,
          method: 'post',
          data: form,
        })
          .then((response) => {
            console.log(response)
            this.windowHint = ''
            this.portrait = response.data.myfile.path
            return response
          })
          .catch((response) => {
            if (response instanceof Error) {
              // Something happened in setting up the request that triggered an Error
              this.windowHint = '错误：'+ response.message;
            } else {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              console.log(response.data);
              console.log(response.status);
              console.log(response.headers);
              console.log(response.config);
            }
          })
      } else {
        console.log("没有选择");
      }


    },

  },
  computed:{

  },
  components:{
    leftbar
  },
  mounted(){
    /*获取我的初始信息*/
    axios({
      url: '/My_Info?uid='+this.$store.state.myInfo.uid,
      method: 'post',
      data: {
      },
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
      .then((response) => {
        if(response.data.err !=0){
          this.errHint = response.data.msg
        }else{
          this.$store.commit('UPDATEMYINFO', response.data.data);

          if(this.$store.state.page.tab=='info'){
            this.$store.commit('ONSHOW', response.data.data);
          }

        }
        return true
      })
      .catch((error) => {
        this.errHint =error
        return error
      })
    }




}
</script>
<!-- Add "scoped" atulibute to limit CSS to this component only -->
<style lang="scss" scoped>
  .infoShow{
    width: 200px;
    overflow: auto;
    padding-bottom: 30px;
  }
  .infoShow>div{
    float: left;
  }
  .infoShow>div:nth-child(even){
    width: 70%;

  }
  .infoShow>div:nth-child(odd){
    width: 30%;
  }
  .month{
    width: 200px;
  }
  .month .glyphicon-chevron-right {
    margin-left: 90px;
  }
  .monthDetail{
    position: absolute;
    left:260px;
    top:30px;
    background-color: #EEEEEE;
    width: 590px;
    padding: 10px;
    font-size: 15px;
    p{
      color:#333;
      margin:5px 0;
    }
    .inList{
      .listItem{
        padding: 0 10px;
        width: 280px;
        background-color: #34D377;
        margin-bottom: 5px;
        margin-right: 5px;
        float: left;
        color:white;
      }
    }
  }
  .btnInfo{
    width: 50%!important;
    text-align: center;
    cursor: pointer;
  }
  .portrait{
    width: 60px;
    height:60px;
    margin: 20px 70px;
    background-size: cover;
    background-position: center;
  }
  .portraitChange{
    width: 60px;
    height:60px;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
  }

</style>
