import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import modules from './modules'
import axios from 'axios'

Vue.use(Vuex)
const state = {
  page:{
    tab:'team',
    /*--店铺--*/
    /*选择的学校*/
    store_area_select:{
      area:0,
      school:0,
      month:0
    },
    /*myinfo - 我的信息/对比中*/
    selectedMonth:'-1'
  },
  /*我的团队*/
  myTeam:[],
  myTeamList:[],
  /*个人*/
  myInfo:{
    "uid":localStorage.uid,
    /*"mobile":"18428305624",
    portrait: '../static/img/socialanarchism.png',
    remark:'马库斯',
    username:'西塞罗',
    inviteCode:'12312',
    number:'13422224444',
    school:'西南石油',
    level:'片区经理',*/
    /*data:[
      {
        month:'01',
        personalRecruitNum:2354,
        personalRecruit:[{
          school:'我的',
          num:52
          },
          {
            school:'荷尔斯泰因',
            num:123
          },
          {
            school:'郑姆斯特丹',
            num:52
          },],
        teamRecruitNum:1354,
        teamRecruit:[{
          school:'我的',
          num:1333
          },
          {
            school:'荷尔斯泰因',
            num:514
          },
          {
            school:'郑姆斯特丹',
            num:666
          },]
      },
      {
        month:'02',
        personalRecruitNum:222,
        personalRecruit:[{
          school:'我的',
          num:52
        },
          {
            school:'荷尔斯泰因1',
            num:123
          },
          {
            school:'郑姆斯特丹1',
            num:52
          },],
        teamRecruitNum:223,
        teamRecruit:[{
          school:'我的',
          num:1333
        },
          {
            school:'荷尔斯泰因2124',
            num:514
          },
          {
            school:'郑姆斯特丹1243',
            num:666
          },]
      },
      {
        month:'03',
        personalRecruitNum:335,
        personalRecruit:[{
          school:'我的',
          num:52
        },
          {
            school:'荷尔斯泰因1',
            num:123
          },
          {
            school:'郑姆斯特丹1',
            num:52
          },],
        teamRecruitNum:336,
        teamRecruit:[{
          school:'我的',
          num:1333
        },
          {
            school:'荷尔斯泰因2',
            num:514
          },
          {
            school:'郑姆斯特丹3',
            num:666
          },]
      }
    ]*/
  },
  /*myInfoDetail:[
     {
     month:'01',
     personalRecruitNum:2354,
     personalRecruit:[{
     school:'我的',
     num:52
     },
     {
     school:'荷尔斯泰因',
     num:123
     },
     {
     school:'郑姆斯特丹',
     num:52
     },],
     teamRecruitNum:1354,
     teamRecruit:[{
     school:'我的',
     num:1333
     },
     {
     school:'荷尔斯泰因',
     num:514
     },
     {
     school:'郑姆斯特丹',
     num:666
     },]
     },
     {
     month:'02',
     personalRecruitNum:222,
     personalRecruit:[{
     school:'我的',
     num:52
     },
     {
     school:'荷尔斯泰因1',
     num:123
     },
     {
     school:'郑姆斯特丹1',
     num:52
     },],
     teamRecruitNum:223,
     teamRecruit:[{
     school:'我的',
     num:1333
     },
     {
     school:'荷尔斯泰因2124',
     num:514
     },
     {
     school:'郑姆斯特丹1243',
     num:666
     },]
     },
     {
     month:'03',
     personalRecruitNum:335,
     personalRecruit:[{
     school:'我的',
     num:52
     },
     {
     school:'荷尔斯泰因1',
     num:123
     },
     {
     school:'郑姆斯特丹1',
     num:52
     },],
     teamRecruitNum:336,
     teamRecruit:[{
     school:'我的',
     num:1333
     },
     {
     school:'荷尔斯泰因2',
     num:514
     },
     {
     school:'郑姆斯特丹3',
     num:666
     },]
     }
   ],*/
  /*store左侧展示的*/
  onShow:{
    portrait: '../static/img/socialanarchism.png',
    /*remark:'马库斯',
    username:'西塞罗',
    inviteCode:'12312',
    mobile:'13422224444',
    school:'西南石油',
    level:'片区经理'*/
  },
  /*店铺*/
  area:[
  ],
  /*店铺详情*/
  storeDetail:{
  },
  /*--个人 对比--*/
  /*对比列表*/
  inCompare:[
  ]

}
const actions = {
}
const getters = {
  infoShow: function (state) {
    return state.onShow
  }
}

const mutations = {
  /*页面选择/初始化tab位置*/
  UPDATETITLE (state, page) {
    state.page.tab = page
  },
  /*登陆完成*/
  LOGIN (state, uid) {
    state.myInfo.uid= uid
  },
  /*我的团队*/
  UPDATEMYTEAM(state, data) {
    state.myTeam[0] = data
  },
  ADDMYTEAM(state, data) {
    console.log(data.levelA+"A"+state.myTeam.length)
    /*增加*/
    if(data.levelA+1 == state.myTeam.length){
      state.myTeam.push(data.data)
      console.log('增加')
    } else if(data.levelA+1 == state.myTeam.length -1){
      console.log(state.myTeam[data.levelA+1])
      state.myTeam[data.levelA+1] = data.data
      console.log('覆盖')
    } else if(data.levelA+1 < state.myTeam.length -1){
      console.log('删除')
      state.myTeam[data.levelA+1] = data.data
      let g = state.myTeam.length
      for( let i = data.levelA+2;i< g ;i++){
        state.myTeam.pop()
      }
    }
    /*覆盖*/

    /*删除*/

  },
  /*删除对比*/
  REMOVECOMPARE(state, item) {
    state.inCompare.splice(item,1)
    if(state.page.tab == state.inCompare.length ){
      /*删除最后一个*/
      state.page.tab -=1;
      state.onShow = state.inCompare[item-1];
    }
    else{
      if(state.page.tab>item){
        /*删除选中项前面的*/
        state.page.tab -=1;
      }
      else if(state.page.tab==item)
        {
          /*删除选中项*/
          state.onShow = state.inCompare[item];
        }
    }
  },
  /*添加对比*/
  ADDCOMPARE(state, item) {
    state.inCompare.push(item)
    /*ajax请求人物细节，并加入inCompare最后一项*/
    // state.inCompare[state.inCompare.length-1].detail = state.inCompareDetail
  },
  /*对比中的*/
  ONSHOW(state, data) {
    state.onShow = data
  },
  /*店铺*/
  /*展开/收起区域*/
  UPDATESTORE(state, data) {
    console.log(data)
    state.area = data
  },
  TOGGLEAREA(state, index) {
    state.area[index].collapse = !state.area[index].collapse
  },
  /*选择学校*/
  SELECTSCHOOL(state, data) {
    state.page.store_area_select.area = data.area
    state.page.store_area_select.school = data.school
  },
  /*选择月份，清除当前数据*/
  SELECTMONTH(state, data) {
    state.storeDetail = ''
    state.page.store_area_select.area = data.area
    state.page.store_area_select.school = data.school
    state.page.store_area_select.month = data.month
  },
  /*选择学校/月份，加载新数据*/
  UPDATESTOREDETAIL(state, data) {
    state.storeDetail = data
  },
  /*我的信息*/
  UPDATEMYINFO(state, data) {
    state.myInfo = data
    state.page.selectedMonth = data.selectedMonth
  },
  /*我的信息 - 选择月份*/
  SELECTMONTH_MYINFO(state, index) {
    state.page.selectedMonth = index
  },
  /*我的信息 - 月份数据*/
  GETMONTHDETAIL(state, data) {
    for(let i in state.myInfo.month){
      if(state.myInfo.month[i].month == data.month){
        state.myInfo.month[i].data = data.data
        break
      }
    }
  },
  /*对比信息 - 月份数据*/
  GETMONTHDETAILCOMPARE(state, data) {
    for(let i in state.inCompare[state.page.tab].month){
      if(state.inCompare[state.page.tab].month[i].month == data.month){
        state.inCompare[state.page.tab].month[i].data = data.data
        break
      }
    }
  },
  /*上传头像*/
  UPDATEPORTRAIT(state, data) {
    state.myInfo.portrait = data
    state.onShow.portrait = data
  },
  /*更新个人信息成功*/
  UPDATEMYINFONEW(state, data) {
    state.myInfo.portrait = data.portrait
    state.onShow.portrait = data.portrait
    state.myInfo.username = data.username
    state.onShow.username = data.username
  },
  /*更新下线信息成功*/
  UPDATESUBINFONEW(state, data) {
    state.inCompare[state.page.tab].remark = data.remark
    state.onShow.remark = data.remark
    state.inCompare[state.page.tab].activity = data.activity
    state.onShow.activity = data.activity
    state.inCompare[state.page.tab].level = data.level
    state.onShow.level = data.level
  },
  /*更新昵称*/
  UPDATEUSERNAME(state, data) {
    state.myInfo.username = data
    state.onShow.username = data
  },
  /*更新备注*/
  UPDATEREMARK(state, data) {
    state.onShow.remark = data
  },
  /*更新活跃*/
  UPDATEACT(state, data) {
    state.onShow.activity = data
  },
  UPDATELEVEL(state, data) {
    state.onShow.level = data
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,// Object {products: Object, user: Object},后面每个object含有actions，getters等
  strict: process.env.NODE_ENV !== 'production'
})
