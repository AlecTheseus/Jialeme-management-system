
<template>
  <div >
    <img class="logo" src="/static/img/logo.svg"  />
    <div class="leftBar_tabs">
      <li @click = "switchTab('team')">
        <div :class="{ active: $store.state.page.tab == 'team' }" >
          <img class="" src="/static/img/team.svg"  />团队
        </div>
      </li>

      <li @click = "switchTab('store')" >
        <div :class="{ active: $store.state.page.tab == 'store' }" >
          <img class="" src="/static/img/store.svg"  />店铺
        </div>
      </li>
      <li @click = "switchTab('info')" >
        <div :class="{ active: $store.state.page.tab == 'info' }" >
          <img class="" src="/static/img/personalInfo.svg"  />个人
        </div>
      </li>
    </ul>
    </div>
    <!--对比列表-->
    <ul class="compare">
      <li v-for="(item,index) in $store.state.inCompare"
          @click = "switchTab(index)"
          :class="{ activeCompare: $store.state.page.tab == index }"
      >{{item.username}}&nbsp;
        <span @click.stop = "closeCompare(index)" class="glyphicon glyphicon-remove"></span></li>
    </ul>
  </div>
</template>
<script>
  export default {
  name: 'leftbar',
  data () {
    return {
    }
  },
  methods: {
    //tab选择
    switchTab (item) {
      this.$store.commit('UPDATETITLE', item);
      switch (item){
        case 'team':
          this.$router.push('/My_Team');
          break;
        case 'store':
          this.$router.push('/My_Store');
          break;
        case 'info':
          /*自己*/
          this.$router.push('/My_Info');
          this.$store.commit('ONSHOW', this.$store.state.myInfo);
          break;
        default:
          /*查看对比中的人物*/
          this.$router.push('/My_Info');
          this.$store.commit('ONSHOW', this.$store.state.inCompare[item]);
      }
    },
    closeCompare(item){
      this.$store.commit('REMOVECOMPARE', item);
      if(this.$store.state.inCompare.length ==0){
        this.$store.commit('UPDATETITLE', 'team');
        this.$router.push('/My_Team');
      }else{

      }
    },
    back() {
      this.$router.go(-1)
    },
  },
  mounted(){
    /*应对f5刷新*/
    this.switchTab(this.$store.state.page.tab)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .logo{
    width: 5rem;
    display: block;
    margin: 1rem auto 3rem auto;
  }
  .leftBar_tabs{
    li{
      width: 100%;
      height: 9rem;
      cursor: pointer;
      text-align: center;
      color:white;
      font-size: 1.4rem;
      div{
        padding-left:3px;
      }
    }
    img{
      width: 5rem;
      display: block;
      margin: 1rem auto .2rem auto;
    }
    .active{
      border-left: 3px solid #DA4F4A;
      padding-left:0;
    }
  }
  .compare{
    li{
      color:white;
      padding-left: 8px;
      cursor: pointer;
      position: relative;
    }
    li:hover{
      background-color: #027935;
      .glyphicon{
        display: inline-block;
      }
    }
    .activeCompare{
      border-left:3px solid  #DA4F4A;
      padding-left: 5px;
    }
    .glyphicon{
      position: absolute;
      top:3px;
      right: 1px;
      background-color: #DA4F4A;
      border-radius:50%;
      display:none;
    }
  }


</style>
