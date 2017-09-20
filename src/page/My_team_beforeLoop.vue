
<template>
  <div class="flexBase">
    <leftbar class="leftBar"></leftbar>
    <section>
      <header >
        <div class="col-xs-2" style="padding-left: 0">
          <img class="" src="/static/img/team_dark.svg"/>我的团队
          <p class="hint">{{errHint}}</p>
        </div>
        <div class="col-xs-3 ">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="搜索名字/电话号码">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">搜索</button>
            </span>
          </div>
        </div>
      </header>
      <div class="mainInfo">
        <!--一级 supervisor-->
        <div class="level">
          <div v-if="!(myTeam.supervisor<=[])">
            <p class="title"><span>片区经理</span>
              <span class="glyphicon glyphicon-remove" v-if="page.supervisorShow" @click="toggleList('supervisorShow',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('supervisorShow',true)"></span>
            </p>
            <div class="scroller" v-if="page.supervisorShow">
              <div class="list "
                   v-for="(item,index) in myTeam.supervisor"
                   @click="selectPerson('supervisor','supervisor',index,item.uid)"
                   :class="{ listActive: page.supervisor == 'supervisor'+index }">
                <p><span>王冰</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">石油大学店</span></p>
                <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
            <div class="breakLine"></div>
          </div>
          <div v-if="!(myTeam.shopkeeper<=[])">
            <p class="title"><span>店长</span>
              <span class="glyphicon glyphicon-remove" v-if="page.supervisorShow.shopkeeper" @click="toggleList('supervisorShow','shopkeeper',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('supervisorShow','shopkeeper',true)"></span>
            </p>
            <div class="scroller" v-if="page.supervisorShow.shopkeeper">
              <div class="list "
                   v-for="(item,index) in myTeam.shopkeeper"
                   @click="selectPerson('supervisor','shopkeeper',index,item.uid)"
                   :class="{ listActive: page.supervisor == 'shopkeeper'+index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if="!(myTeam.director<=[])">
            <p class="title"><span>总监</span>
              <span class="glyphicon glyphicon-remove" v-if="page.supervisorShow.director" @click="toggleList('supervisorShow','director',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('supervisorShow','director',true)"></span>
            </p>
            <div class="scroller" v-if="page.supervisorShow.director">
              <div class="list "
                   v-for="(item,index) in myTeam.director"
                   @click="selectPerson('supervisor','director',index,item.uid)"
                   :class="{ listActive: page.director == 'director'+index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if="!(myTeam.manager<=[])">
            <p class="title"><span>招生经理</span>
              <span class="glyphicon glyphicon-remove" v-if="page.supervisorShow.manager" @click="toggleList('supervisorShow','manager',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('supervisorShow','manager',true)"></span>
            </p>
            <div class="scroller" v-if="page.supervisorShow.manager">
              <div class="list "
                   v-for="(item,index) in myTeam.manager"
                   @click="selectPerson('supervisor','manager',index,item.uid)"
                   :class="{ listActive: page.manager == 'manager'+index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if="!(myTeam.commissioner<=[])">
            <p class="title"><span>招生专员</span>
              <span class="glyphicon glyphicon-remove" v-if="page.supervisorShow.commissioner" @click="toggleList('supervisorShow','commissioner',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('supervisorShow','commissioner',true)"></span>
            </p>
            <div class="scroller" v-if="page.supervisorShow.commissioner">
              <div class="list "
                   v-for="(item,index) in myTeam.commissioner"
                   @click="selectPerson('supervisor','commissioner',index,item.uid)"
                   :class="{ listActive: page.commissioner == 'commissioner'+index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
        </div>
        <!--二级 shopkeeper-->
        <div class="level">
          <div v-if="!(myTeam.shopkeeper<=[])">
            <p class="title"><span>店长</span>
              <span class="glyphicon glyphicon-remove" v-if="page.shopkeeperShow.shopkeeper" @click="toggleList('shopkeeperShow','shopkeeper',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('shopkeeperShow','shopkeeper',true)"></span>
            </p>
            <div class="scroller" v-if="page.shopkeeperShow.shopkeeper">
              <div class="list "
                   v-for="(item,index) in myTeam.shopkeeper"
                   @click="selectPerson('shopkeeper','shopkeeper',index,item.uid)"
                   :class="{ listActive: page.shopkeeper == index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if="!(myTeam.director<=[])">
            <p class="title"><span>总监</span>
              <span class="glyphicon glyphicon-remove" v-if="page.shopkeeperShow.director" @click="toggleList('shopkeeperShow','director',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('shopkeeperShow','director',true)"></span>
            </p>
            <div class="scroller" v-if="page.shopkeeperShow.director">
              <div class="list "
                   v-for="(item,index) in myTeam.director"
                   @click="selectPerson('shopkeeper','director',index,item.uid)"
                   :class="{ listActive: page.director == index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if="!(myTeam.manager<=[])">
            <p class="title"><span>招生经理</span>
              <span class="glyphicon glyphicon-remove" v-if="page.shopkeeperShow.manager" @click="toggleList('shopkeeperShow','manager',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('shopkeeperShow','manager',true)"></span>
            </p>
            <div class="scroller" v-if="page.shopkeeperShow.manager">
              <div class="list "
                   v-for="(item,index) in myTeam.manager"
                   @click="selectPerson('shopkeeper','manager',index,item.uid)"
                   :class="{ listActive: page.manager == index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
          <div v-if="!(myTeam.commissioner<=[])">
            <p class="title"><span>招生专员</span>
              <span class="glyphicon glyphicon-remove" v-if="page.shopkeeperShow.commissioner" @click="toggleList('shopkeeperShow','commissioner',false)"></span>
              <span class="glyphicon glyphicon-plus" v-else @click="toggleList('shopkeeperShow','commissioner',true)"></span>
            </p>
            <div class="scroller" v-if="page.shopkeeperShow.commissioner">
              <div class="list "
                   v-for="(item,index) in myTeam.commissioner"
                   @click="selectPerson('shopkeeper','commissioner',index,item.uid)"
                   :class="{ listActive: page.commissioner == index }">
                <p><span>{{item.username}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
                <p><span class="basicBlue">{{item.school}}</span></p>
                <p class="people_number"><span>个人（{{item.personalNum}}）</span><span style="margin-left:10px">团队（{{item.teamNum}}）</span></p>
                <div v-if="item.activity==0" class="status">活跃</div>
                <div v-if="item.activity==1"class="status normal">一般</div>
                <div v-if="item.activity==2"class="status negative">消极</div>
              </div>
            </div>
          </div>
        </div>
        <!--三级 director-->
        <div class="level">
          <p class="title"><span>总监</span>
            <span class="glyphicon glyphicon-remove" v-if="page.directorShow" @click="toggleList('directorShow',false)"></span>
            <span class="glyphicon glyphicon-plus" v-else @click="toggleList('directorShow',true)"></span>
          </p>
          <div class="scroller" v-if="page.directorShow">
            <div class="list "
                 v-for="(item,index) in myTeam.director"
                 @click="selectPerson('director',index)"
                 :class="{ listActive: page.director == index }">
              <p><span>王冰</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
              <p><span class="basicBlue">石油大学店</span></p>
              <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
              <div class="status">活跃</div>
            </div>
            <div class="list ">
              <p><span>王冰</span><span class="fr basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
              <p><span class="basicBlue">石油大学店</span></p>
              <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
              <div class="status">活跃</div>
            </div>
            <div class="list listActive">
              <p><span>王冰</span><span class="fr basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
              <p><span class="basicBlue">石油大学店</span></p>
              <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
              <div class="status">不活跃</div>
            </div>
            <div class="list">
              <p><span>王冰</span><span class="fr basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
              <p><span class="basicBlue">石油大学店</span></p>
              <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
              <div class="status">活跃</div>
            </div>
          </div>
          <div class="breakLine"></div>
          <p class="titleBtn"><span>招生经理</span><span class="glyphicon glyphicon-plus"></span></p>
          <div class="breakLine"></div>
          <p class="titleBtn"><span>招生专员</span><span class="glyphicon glyphicon-plus" ></span></p>

        </div>
        <!--四级 manager-->
        <div class="level" >
          <p class="title"><span>招生经理</span>
            <span class="glyphicon glyphicon-remove" v-if="page.managerShow" @click="toggleList('managerShow',false)"></span>
            <span class="glyphicon glyphicon-plus" v-else @click="toggleList('managerShow',true)"></span>
          </p>
          <div class="scroller" v-if="page.managerShow">
            <div class="list "
                 v-for="(item,index) in myTeam.manager"
                 @click="selectPerson('manager',index)"
                 :class="{ listActive: page.manager == index }">
              <p><span>{{item.name}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
              <p><span class="basicBlue">石油大学店</span></p>
              <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
              <div class="status">活跃</div>
            </div>
          </div>
          <div class="breakLine"></div>
          <p class="titleBtn"><span>招生专员</span><span class="glyphicon glyphicon-plus"></span></p>
        </div>
        <!--五级 commissioner-->
        <div class="level" >
          <p class="titleBtn"><span>招生经理</span><span class="glyphicon glyphicon-plus"></span></p>
          <!---->
          <div class="breakLine"></div>
          <p class="title"><span>招生专员</span>
            <span class="glyphicon glyphicon-remove" v-if="page.commissionerShow" @click="toggleList('commissionerShow',false)"></span>
            <span class="glyphicon glyphicon-plus" v-else @click="toggleList('commissionerShow',true)"></span>
          </p>
          <div class="scroller" v-if="page.commissionerShow">
            <div class="list " v-for="(item,index) in myTeam.commissioner">
              <p><span>{{item.name}}</span><span class="fr addCursor basicBlue" @click.stop="addCompare(item,index)">管理详情</span></p>
              <p><span class="basicBlue">石油大学店</span></p>
              <p class="people_number"><span>个人（751）</span><span style="margin-left:10px">团队（888）</span></p>
              <div class="status">活跃</div>
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
        commissionerShow:true
      },
      myTeam:this.$store.state.myTeam,
      errHint:''
    }
  },
  methods: {
    selectPerson(levelA,level,index,uid){
      /*从levelA选择level等级的第index个*/
      this.page[levelA] = level+index;
      console.log(levelA+"-"+this.page[levelA]);
      /*ajax获取人物*/
      this.getPerson(uid,levelA,level,index)
    },
    toggleList(index,index2,status){
      console.log(index+index2+status)
      console.log(this.page[index][index2])
      this.page[index][index2] = status;
    },
    addCompare(item,index){
      this.$store.commit('ADDCOMPARE', item);
      console.log(item)
      console.log(index)
    },
    /*ajax获取人物*/
    getPerson(id,levelA,level,index){
      axios({
        url: '/My_Agent?uid='+id,
        method: 'get',
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
            if(levelA){
                /*读取下线*/

            }else{
                /*读取个人*/
              this.$store.commit('UPDATEMYTEAM', response.data.data);
              this.myTeam = this.$store.state.myTeam;
            }

          }
          return true
        })
        .catch((error) => {
          this.errHint = error
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
      //初始化列表
    this.getPerson(this.$store.state.myInfo.uid)

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
