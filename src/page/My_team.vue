
<template>
  <div class="flexBase">
    <leftbar class="leftBar"></leftbar>
    <section>
      <header >
        <div class="col-xs-2" style="padding-left: 0">
          <img class="" src="/static/img/team_dark.svg"/>
          我的团队
          <p class="hint">{{errHint}}</p>
        </div>
        <div class="col-xs-3 ">
          <!--<div class="input-group">
            <input type="text" class="form-control" placeholder="搜索名字/电话号码">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">搜索</button>
            </span>
          </div>-->
        </div>
      </header>
      <div class="mainInfo">
        <div v-for="(level,index) in $store.state.myTeam" class="level">
          <div v-if="!(level.supervisor<=[])">
            <p class="title"><span>片区经理</span>
              <span class="glyphicon glyphicon-remove" v-if="page.toggle[index].supervisor" @click="toggleList(index,'supervisor',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList(index,'supervisor',true)"></span>
            </p>
            <div class="scroller" v-if="page.toggle[index].supervisor">
              <div class="list "
                   v-for="(item,index2) in level.supervisor"
                   @click="selectPerson(index,1,index2,item.uid)"
                   :class="{ listActive: page.selectedList[index].itemS == index2
                    && page.selectedList[index].level == 1}">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index2)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}&nbsp;</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
            <!--<div class="breakLine"></div>-->
          </div>

          <div v-if="!(level.shopkeeper<=[])">
            <p class="title"><span>店长</span>
              <span class="glyphicon glyphicon-remove" v-if="page.toggle[index].shopkeeper" @click="toggleList(index,'shopkeeper',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList(index,'shopkeeper',true)"></span>
            </p>
            <div class="scroller" v-if="page.toggle[index].shopkeeper">
              <div class="list "
                   v-for="(item,index2) in level.shopkeeper"
                   @click="selectPerson(index,2,index2,item.uid)"
                   :class="{ listActive: page.selectedList[index].itemS == index2
                   && page.selectedList[index].level == 2 }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index2)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}&nbsp;</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>

          <div v-if="!(level.director<=[])">
            <p class="title"><span>总监</span>
              <span class="glyphicon glyphicon-remove" v-if="page.toggle[index].director" @click="toggleList(index,'director',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList(index,'director',true)"></span>
            </p>
            <div class="scroller" v-if="page.toggle[index].director">
              <div class="list "
                   v-for="(item,index2) in level.director"
                   @click="selectPerson(index,3,index2,item.uid)"
                   :class="{ listActive: page.selectedList[index].itemS == index2
                   && page.selectedList[index].level == 3}">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index2)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}&nbsp;</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>

          <div v-if="!(level.manager<=[])">
            <p class="title"><span>招生经理</span>
              <span class="glyphicon glyphicon-remove" v-if="page.toggle[index].manager" @click="toggleList(index,'manager',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList(index,'manager',true)"></span>
            </p>
            <div class="scroller" v-if="page.toggle[index].manager">
              <div class="list "
                   v-for="(item,index2) in level.manager"
                   @click="selectPerson(index,4,index2,item.uid)"
                   :class="{ listActive: page.selectedList[index].itemS == index2
                   && page.selectedList[index].level == 4}">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index2)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}&nbsp;</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>

          <div v-if="!(level.commissioner<=[])">
            <p class="title"><span>招生专员</span>
              <span class="glyphicon glyphicon-remove" v-if="page.toggle[index].commissioner" @click="toggleList(index,'commissioner',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList(index,'commissioner',true)"></span>
            </p>
            <div class="scroller" v-if="page.toggle[index].commissioner">
              <div class="list "
                   v-for="(item,index2) in level.commissioner"
                   @click="selectPerson(index,5,index2,item.uid)"
                   :class="{ listActive: page.selectedList[index].itemS == index2
                   && page.selectedList[index].level == 5}">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index2)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}&nbsp;</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if=" ((level.supervisor<=[]))&&
                      ((level.shopkeeper<=[]))&&
                      ((level.director<=[]))&&
                      ((level.manager<=[]))&&
                      ((level.commissioner<=[]))" style="padding-left: 20px;color: #CAC9CF">没有更多下级</div>

        </div>
      <!--<div style="margin-top: 500px ; position: absolute; margin-left: 500px">{{page.selectedList}}</div>-->
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
        //片区经理级 level1看到的
        supervisorShow: {
          supervisor:true,
          shopkeeper:true,
          director:true,
          manager:true,
          commissioner:true
        },
        //选择记录
        supervisor:'',
        //店长级 level2看到的
        shopkeeperShow: {
          shopkeeper:true,
          director:true,
          manager:true,
          commissioner:true
        },
        shopkeeper:'',
        directorShow:true,
        director:'',
        managerShow:true,
        manager:'',
        commissionerShow:true,
        /*newList*/
        toggle: {
          '0': {supervisor: true, shopkeeper: true, director: true, manager: true, commissioner: true},
          "1": {shopkeeper: true, director: true, manager: true, commissioner: true},
          "2": {director: true, manager: true, commissioner: true},
          "3": {director: true, manager: true, commissioner: true},
          "4": {director: true, manager: true, commissioner: true},
          "5": {director: true, manager: true, commissioner: true},
          "6": {director: true, manager: true, commissioner: true},
        },
        selectedList:{
          '0':{//第几列
            level:-1,//等级
            itemS:-1//选择的第几项
          },
          '1':{
            level:-1,
            itemS:-1
          },
          '2':{
            level:-1,
            itemS:-1
          },
          '3':{
            level:-1,
            itemS:-1
          },
          '4':{
            level:-1,
            itemS:-1
          },
          '5':{
            level:-1,
            itemS:-1
          },
          '6':{
            level:-1,
            itemS:-1
          },

        }
      },
      myTeam:'',
      errHint:''
    }
  },
  methods: {
    selectPerson(levelA,level,index,uid){
      if(this.$store.state.myTeam.length == levelA+1){
        this.page.selectedList[levelA+1] = {level:-1, itemS:-1}
      }
      console.log(levelA+"_"+level+"_"+index)
      console.log(this.page.selectedList[levelA]);
      this.page.selectedList[levelA] = {level:level, itemS:index}

      /*从levelA选择level等级的第index个*/
      /*ajax获取人物*/
      this.getPerson(uid,levelA,level,index)

    },
    toggleList(index,index2,status){
      this.page.toggle[index][index2] = status;
    },
    addCompare(item,index){
      console.log(item)
      console.log(index)
      axios({
        url: '/My_Info?uid='+item.uid,
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
            /*初始月份*/
            this.$store.commit('SELECTMONTH_MYINFO',response.data.data.selectedMonth);
            /*push对比数据*/
            this.$store.commit('ADDCOMPARE', response.data.data);
          }
          return true
        })
        .catch((error) => {
          this.errHint =error
          return error
        })
    },
    /*ajax获取人物*/
    getPerson(id,levelA,level,index){
      axios({
        url: '/My_Agent?uid='+id,
        method: 'post',
        data: {
//          uid:this.$store.state.myInfo.uid
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
            if(levelA!=undefined){
              /*读取下线*/
              console.log('读取下线')
              /*右侧加数组，添加toggle*/
              if(levelA+1 == this.$store.state.myTeam.length){
                this.page.toggle[levelA+1] = {supervisor:true,
                  shopkeeper:true,
                  director:true,
                  manager:true,
                  commissioner:true}
              }
              this.$store.commit('ADDMYTEAM', {data:response.data.data,levelA:levelA,level:level,index:index});
              let level_;//刷新界面，必要，否则更新延迟）
              switch  (level){
                case 1:
                  level_ = 'supervisor'
                  break
                case 2:
                  level_ = 'shopkeeper'
                  break
                case 3:
                  level_ = 'director'
                  break
                case 4:
                  level_ = 'manager'
                  break
                case 5:
                  level_ = 'commissioner'
                  break
              }
              this.toggleList(levelA,level_,false);this.toggleList(levelA,level_,true);

            }else{
              /*读取个人 in team*/
              this.$store.commit('UPDATEMYTEAM', response.data.data);
              /*/!*储存个人 in myInfo*!/
              this.$store.commit('UPDATEMYTEAM', response.data.data);*/
              this.myTeam[0] = this.$store.state.myTeam;
//              this.myTeamList = this.$store.state.myTeam;
            }

          }
          return true
        })
        .catch((error) => {
          this.errHint = " "
          return error
        })
    }


  },
  computed: {
  },
  components:{
    leftbar
  },
  mounted(){
    /*强制登陆*/
    if(localStorage.uid==undefined){
      console.log('未登录')
      this.$router.push('/');
//      location.reload()
    }
      //初始化列表
    this.getPerson(this.$store.state.myInfo.uid)
//    this.myTeamList[0] = this.$store.state.myTeam

    },


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .level{
    float: left;
    width:280px;
    background-color: #F6F6F6;
    border-radius:7px;
    padding-top: 8px;
    padding-bottom: 5px;
    margin-right: 10px;
  }
  .list{
    background-color: white;
    padding: 7px;
    position: relative;
    border: 10px solid #F6F6F6;
    margin-top: -10px;
/*    border-left: 10px solid #F6F6F6;
    border-right: 10px solid #F6F6F6;*/
  }
  .listActive{
    border: 10px solid #CAC9CF;
    z-index: 10;
  }
  .mainInfo .title{
    position: relative;
    height: 30px;
    font-size: 16px;
    padding-left:10px;
    color:#0178FF;
  }
  .glyphicon{
    position: absolute;
    right:10px;
    top:5px;
  }
  .titleLine{
    border-top: 1px solid #B5B5B5;
  }
  .breakLine{
    margin-bottom: 10px;
    border-top: 1px solid #B5B5B5;
  }
  .status{
    position: absolute;
    bottom: 2px;
    right: 15px;
    width: 40px;
    height:40px;
    line-height: 40px;
    color:white;
    text-align: center;
    font-size: 13px;
    border-radius: 50%;
    background-color: #34D377;
  }
  .normal{
    background-color: #FF9341;
  }
  .negative{
    background-color: #DA4F4A;
  }
  .people_number{
    color:#A9A9A9
  }
  .titleBtn{
    position: relative;
    height: 30px;
    font-size: 16px;
    padding-left: 10px;
    color: #0178FF;
  }
  .scroller{
    padding-top: 10px;
    max-height: 75vh;
    overflow-y: auto;
  }
  .addCursor{
    cursor: cell;
    border-radius: 3px;
  }
  .addCursor:active{
    background-color: #34D377;
  }
</style>
