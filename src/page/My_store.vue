
<template>
  <div class="flexBase">
    <leftbar class="leftBar"></leftbar>
    <section>
      <header>
        <img class="" src="/static/img/store_dark.svg"/>我的店铺
        <p class="hint">{{errHint}}</p>
      </header>
      <div class="mainInfo">
        <!--区域-->
        <div class="area">
          <!--区域遍历-->
          <div class="areaCtn"
               v-for="(area, areaIndex) in $store.state.area"
               v-if="!(area.school<=[])"
               >
            <div @click="toggleArea(areaIndex)">{{area.area}}</div>
            <span class="caret"></span>
            <ul :class="{ collapseArea: !area.collapse}">
              <!--学校遍历-->
              <li v-for="(school,schoolIndex) in area.school"
                  @click="selectSchool(areaIndex,schoolIndex)"
                  :class="{ schoolActive: $store.state.page.store_area_select.area  == areaIndex &&
                    $store.state.page.store_area_select.school  == schoolIndex}"
              >
                <div class="schoolName">
                  {{school.name}}
                </div>
                <div class="schoolNum"><span>{{school.num}}</span></div>
                <!--月份遍历-->
                <div class="month" v-if="$store.state.page.store_area_select.area  == areaIndex &&
                    $store.state.page.store_area_select.school  == schoolIndex">
                  <ul>
                    <li @click = "selectMonth(area.area_id,school.school_id,month.month)"
                        v-for="(month,MonthIndex) in school.month"
                        :class="{ monthActive: $store.state.page.store_area_select.month  == month.month
                                  && $store.state.page.store_area_select.school  == schoolIndex}"
                    >{{month.month}}月<span class="glyphicon glyphicon-chevron-right"></span></li>
                  </ul>
                </div>
                <!--合计-->
                <div v-if="$store.state.storeDetail.data" @click.stop="">
                  <div class="dataTitle" v-if="$store.state.page.store_area_select.area  == areaIndex &&
                      $store.state.page.store_area_select.school  == schoolIndex">
                    <p class="bgLight">{{area.area}}—{{school.name}}&nbsp;&nbsp;&nbsp;
                      <span class="basicBlue">{{$store.state.page.store_area_select.month}}</span>
                      月&nbsp;招生人数：<span class="basicBlue">{{$store.state.storeDetail.RecruitNum}}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;佣金总数：<span class="basicBlue">{{sum}}</span>
                      自动晋升条件：<input v-model="upgradeNum" class="updrage" type="number">人/月&nbsp;<span @click="saveUpgrade(school.school_id)" class="save">保存</span></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!--数据表-->
        <div class="dataSet" v-if="$store.state.storeDetail.data">
          <div class="dataTitleSub" >
            <div class="dataList">
              <ul>
                <li>名字</li>
                <li>招生津贴<input maxlength="4" type="number" v-model="recruitAllowance">元</li>
                <li>管理津贴<input maxlength="4" type="number" v-model="manageAllowance">元</li>
                <li>总计/元</li>
                <li>支付宝</li>
              </ul>
            </div>
          </div>
          <div class="dataList"
               v-for="(level,classIndex) in $store.state.storeDetail.data"
               v-if="!(level.list<=[])"
               >
            <span class="redBG" >{{level.title}}</span>
            <div  v-for="(person,personIndex) in level.list" >
              <ul>
                <li>{{person.name}}</li>
                <li>{{person.numRecruit}}人/{{person.numRecruit*recruitAllowance}}元</li>
                <li>{{person.numManage}}人/{{person.numManage*manageAllowance}}元</li>
                <li>{{person.numRecruit*recruitAllowance+person.numManage*manageAllowance}}元</li>
                <li>{{person.alipayAccount}}</li>
                <div class="crossArea redBG" v-if="person.crossArea!=''">
                  <li>跨区招生</li>
                  <li>{{person.crossArea}}</li>
                </div>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>

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
      recruitAllowance:200,
      manageAllowance:80,
      upgradeNum:this.$store.state.storeDetail.upgradeNum,
      activeArea: true,
      errHint:''
    }
  },
  methods: {
    /*收起/展开区域*/
    toggleArea(index){
    this.$store.commit('TOGGLEAREA', index);
    },
    /*选择学校*/
    selectSchool(area,school){
      this.$store.commit('SELECTSCHOOL', {area:area,school:school});
      this.$store.commit('UPDATESTOREDETAIL', '');
    },
    /*选择月份*/
    selectMonth(areaID,schoolID,month){
      this.$store.commit('SELECTMONTH', {area:areaID,school:schoolID,month:month});
      this.storeDetail(areaID,schoolID,month);
      console.log(areaID+"_"+schoolID+"_"+month)
    },
    /*获取店铺信息*/
    storeDetail(areaID,schoolID,month){
      axios({
        url: '/My_ShopDetail?uid='+this.$store.state.myInfo.uid,
        method: 'post',
        data: {area:areaID,school:schoolID,month:month},
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
          this.$store.commit('UPDATESTOREDETAIL', response.data.data);
          this.upgradeNum = this.$store.state.storeDetail.upgradeNum
        }
        return true
      })
      .catch((error) => {
        this.errHint =error
        return error
      })
    },
    /*保存自动升级条件*/
    saveUpgrade(school_id){
        console.log(school_id)
      /*axios({
        url: '/?????uid='+this.$store.state.myInfo.uid,
        method: 'post',
        data: {
          upgradeNum:this.upgradeNum,
          school_id:school_id
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
            this.upgradeNum = this.$store.state.storeDetail.upgradeNum
          }else{
            this.errHint = ''
          }
          return true
        })
        .catch((response) => {
          if (response instanceof Error) {
            this.errHint = '错误：'+ response.message;
          } else {
            console.log(response);
          }
        })
*/
    }

  },
  computed:{
    sum: function(){
      var c = 0;
      for(var i  in this.$store.state.storeDetail.data) {
        for(var j  in this.$store.state.storeDetail.data[i].list) {
        c += this.$store.state.storeDetail.data[i].list[j].numManage*this.manageAllowance
            +this.$store.state.storeDetail.data[i].list[j].numRecruit*this.recruitAllowance
        }
      }
      if(c>0){
        return c;
      }else {
          return ''
      }
    }
  }
  ,
  components:{
    leftbar
  },
  mounted(){
    /*获取店铺初始信息*/
    axios({
      url: '/My_Shop?uid='+this.$store.state.myInfo.uid,
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
          this.errHint = '';
          this.$store.commit('UPDATESTORE', response.data.data);
        }
        return true
      })
      .catch((response) => {
        if (response instanceof Error) {
          // Something happened in setting up the request that triggered an Error
          this.errHint = '';
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.config);
        }
      })

  }

}
</script>
<!-- Add "scoped" atulibute to limit CSS to this component only -->
<style lang="scss" scoped>
  .area{
    width: 260px;
    float: left;
  }
  .areaCtn{
    width: 260px;
    color:white;
    line-height: 30px;
    text-align: center;
    background-color: #047935;
    margin-bottom: 20px;

    .caret{
      position: absolute;
      right:5px;
      top:14px;
    }

  }
  .areaCtn>ul>li{
    border-top: 2px solid white;
    padding-left: 3px;
    height: 30px;
    background-color: #34D377;
    .schoolName{
      text-align: left;
      width: 85%;
      height: 30px;
      overflow:hidden;
      padding-left: 5%;
      float: left;
    }
    .schoolNum{
      width: 10%;
      float: left;
      margin-top: 4px;
      margin-right: 2px;
      line-height: 20px;
      top:5px;
      text-align: left;
      span{
        padding: 0 3px;
        border-radius: 6px;
        background-color:#DA4F4A;
      }

    }
  }
  .areaCtn>ul>li:hover{
    background-color: #047935;
  }
  .collapseArea{
    height: 0;
    overflow: hidden;
  }
  .schoolActive{
    border-left: 3px solid #DA4F4A;
    padding-left:0!important;
  }
  .month{
    position: absolute;
    top: 20px;
    left: 300px;
  }
  .dataSet{
    float: left;
    margin-left: 180px;
  }
  .dataTitle{
    position: absolute;
    top:20px;
    left:460px;
    width: 850px;
    color: black;
    display:-webkit-flex;
    display: flex;
    p{
      flex:1;
      padding: 5px 10px;
    }
  }
  .dataTitleSub{
    margin: 65px 0 10px 0;
    label{
      padding-left: 10px;
      color: #DA4F4A;
    }
    input{
      width: 50px;
      height: 20px;
      line-height: 20px;
      margin: 5px 5px 0 5px;
    }
    button{
      background-color: #34D377;
      color:white;
      border: none;
      border-radius: 4px;
      outline: none;
      padding: 2px 10px;
      margin-left: 25px;
    }
  }
  .dataList{
    .redBG{
      padding: 2px 20px;
      line-height: 24px;
    }
      width: 855px;
      li{
        width:170px;
        text-align: center;
        margin:0 1px 1px 0;
        float: left;
        background: #F6F6F6;
        line-height: 30px;
      }
      li:hover{
        color: #DA4F4A;
        cursor: default;
      }
      ul{
        height: 31px;
        position: relative;
      }
      ul>li:first-child{
        background: #CAC9CF;
      }
    .crossArea{
      position: absolute;
      top:0;
      width:202px;
      padding: 0;
      right: -200px;
      background-color: transparent;
      border-bottom: 1px solid white;
      li{
        margin: 0;
        background-color: #DA4F4A;
        border-right: 1px solid white;
        width:100px;
        height:30px;
      }
      li:hover{
        color: white;
      }
    }
  }
  .updrage{
    width: 35px;
    display: inline;
    line-height: 20px;
  }
  .save{
    cursor: pointer;
    color: #DA4F4A;
  }

</style>
