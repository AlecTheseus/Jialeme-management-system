
<template>
  <div>
    <div class="container myContainer">
      <p class="title">登录 </p>
      <div class="form-group">
        <label >用户名</label>
        <input type="text" class="form-control"  v-model="userId">
      </div>
      <div class="form-group">
        <label >密码</label>
        <input type="password" class="form-control"  v-model="password">
      </div>
      <p class="hint">{{hint}}</p>
      <button @click="submit" id="submit" class="btn btn-default">登录</button>
    </div>
  </div>
</template>
<script>
  export default {
  name: 'hello',
  data () {
    return {
      userId:Cookies.get('userId'),
      password:Cookies.get('password'),
      userIdFlag:false,//user id validate
      passwordFlag:false,//password validate
      vCoolDown:0,
      hint:''
    }
  },
  methods: {
    // 检查手机与密码正确
    validate(){
      if(this.userIdFlag&&this.passwordFlag){
          return true;
      }else{
        return false;
      }
    },
    //发送验证请求
    submit() {
      console.log(this.userIdFlag+"___"+this.passwordFlag);
      if(this.validate()){
        let _this = this;
        //AJAX
        axios({
          url: '/Agent_Login',
          method: 'post',
          data: {
            mobile:this.userId,
            password:md5(this.password)
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
            if(response.data.err != 0){
              _this.hint=response.data.msg;
            }else{
                console.log(response.data.data)
                this.$router.push('/My_Team');
                this.$store.commit('LOGIN', response.data.data.uid);
                localStorage.uid = response.data.data.uid
//              this.myTeam = this.$store.state.myTeam;
            }
            return true
          })
          .catch((error) => {
            console.error(error)
            return error
          })

      }
    },
  },
  watch:{
    userId(curVal,oldVal){
      let reg = /^1[34578]\d{9}$/;
      if(reg.test(curVal)){
        this.userIdFlag = true;
        this.hint='';
      }else{
        this.userIdFlag = false;
        this.hint=''
      }
    },
    password(curVal,oldVal){
      let _this = this;
      if(curVal.length>5){
        _this.passwordFlag = true;
        _this.hint='';
      }else{
        _this.passwordFlag = false;
        _this.hint='';
      }
    },
  },
  mounted(){
      if(Cookies.get('userId')!=undefined && Cookies.get('password')!=undefined){
        this.passwordFlag = true;
        this.userIdFlag = true;
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
  .myContainer{
    max-width: 500px;
    background-color: #027935;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 40px;
    border-radius: 10px;
  }
  .myContainer label{
    color:white;
    margin-bottom: 10px;
  }
  .title{
    margin-bottom: 30px;
    color:#FFF;
    font-size: 3rem;
  }
  #submit{
    background-color:white;
    margin-top: 20px;
    color:#027935;
    padding: 3px 20px;
  }
  .hint{
    height: 20px;
    color: white;
    position: relative;
    top:0;
    left:0;
  }

</style>
