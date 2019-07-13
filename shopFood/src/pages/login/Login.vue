<template>
    <div>
      <div class="l_back" @click="back">
        <i class="iconfont icon-jiantou2"></i>
      </div>

      <div class="l_title">
        kim外卖
      </div>


      <button id="infor_login" :class="{on}" @click="to_login">短信登陆</button>

      <div class="infor" v-if="on">
        <form>
          <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
          <a class="get" href="javascript:;" @click="getCode" :class="{rightPhone}">
            {{
            this.waitTime?"已发送("+this.waitTime+"s)":"获取验证码"
            }}
          </a>
          <input type="text" maxlength="6" placeholder="验证码" v-model="code">
          <p>温馨提示：未注册kim外卖帐号的手机号，登录时将自动注册，
            且代表已同意 <a class="person_server" href="javascript:;">《用户服务协议》</a> </p>
          <input type="submit" value="登陆" @click.prevent="i_login">
          <!--禁止提交的默认行为-->
        </form>
        <a  class="about_us" href="javascript:;">关于我们</a>
      </div>



      <button id="pass_login" :class="{on:!on}" @click="to_login">密码登陆</button>

      <div class="pass" v-if="!on">
        <form>
          <input type="text" placeholder="手机/邮箱/用户名" v-model="name">

          <div class="p_btn">
              <input id="checkbox" type="checkbox" v-model="showPwd">
              <label for="checkbox">
              <span></span>
              </label>
          </div>

          <input type="password" placeholder="密码" v-show="!showPwd" v-model="pwd">
          <input type="text" placeholder="密码" v-show="showPwd" v-model="pwd">


          <div class="p_img" @click="getNew">
            <img ref="captcha" src="http://localhost:4000/captcha" alt="">
          </div>
          <input type="text" placeholder="验证码" v-model="captcha">
          <input type="submit" value="登陆" @click.prevent="p_login">
        </form>
        <a  class="about_us" href="javascript:;">关于我们</a>
      </div>

      <Toast v-show="showToast" :infor="infor" :back="back_login"/>
    </div>
</template>

<script>

  import Toast from "../../components/toast/Toast"
  import {reqPhoneLogin,reqPwdLogin,reqPhoneCode} from  "../../api/index"
  export default {
    name: 'Login',
    data(){
      return {
        on:false,//true:短信登陆
        showPwd:false,//是否显示密码
        showToast:false,//是否显示提示框
        infor:"",//提示信息

        phone:"",//电话号码
        waitTime:0,//等待验证码时间
        code:"",//电话验证码

        name:"",
        pwd:"",
        captcha:""

      }
    },
    components:{
     Toast
    },
    computed:{
      rightPhone(){
        return /^1[0-9]{10}$/.test(this.phone)
      }//判断输入的电话号码是否合格
    },
    methods:{
      to_login(el){
        if (el.target.className==="on"){
          return ;
        }
        else{
          this.on=!this.on;
        }
      },
      back(){
        this.$router.back();
      },
      async getCode(){
        if (!this.rightPhone){
          return ;
        } else{
          var timer;
          if (this.waitTime===0) {//代表计时未开始或者已经结束
            this.waitTime=30;
           timer=setInterval(()=>{
             this.waitTime--;
             if (this.waitTime<=0){
               this.waitTime=0;
               clearInterval(timer);
             }
           },1000)

            var phone=this.phone;
            var response=await reqPhoneCode(phone)
            var result=response.data;
            if (result.code===1){
               this.toast("验证码发送失败")
               clearInterval(timer)
               this.waitTime=0;
            }
          }
        }
      },
      toast(infor){
        this.showToast=true;
        this.infor=infor;
      },
      async i_login(){
        var {phone,code,rightPhone}=this;
        if (!phone){
          this.toast("请输入手机号")
        }
        else if(!rightPhone){
          this.toast("请输入正确手机号")
        }
        else if (!code){
          this.toast("请输入验证码")
        }
        else{
          var response=await reqPhoneLogin({phone,code})
          var result=response.data;
          var user=result.data;
          if (result.code===1){
            this.toast("手机或验证码不符")
           }
           else{
            this.$store.dispatch("saveUser",{user})
            console.log(user)
            this.$router.replace("/personal")
          }
        }
      },
      async p_login(){
        var {name,captcha,pwd}=this;
        if (!name){
          this.toast("请输入账号")
        }
        else if (!pwd){
          this.toast("请输入密码")
        }
        else if(!captcha){
          this.toast("请输入验证码")
        }
        else{
          var response=await reqPwdLogin({name,pwd,captcha})
          var result=response.data;
          var user=result.data;
          if (result.code===1){
            if (result.msg.indexOf("验证码")===-1) {
              this.toast("账号或密码不符")
            }
            else{
              this.toast(result.msg)
            }
            this.getNew();
            this.captcha="";
          }
          else{
            this.$store.dispatch("saveUser",{user})
            this.$router.replace("/personal")
          }
        }
      },
      back_login(){
        this.showToast=false;
      },
      getNew(){//点击通过不同的query参数（时间戳）更新验证码captcha
        this.$refs.captcha.src="http://localhost:4000/captcha?"+Date.now()+"";
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .l_back{
    position: absolute;
    margin: 2/@r;
    i{
      font-size: 25/@r;
      color: #999;
    }
  }
  .l_title{
    text-align: center;
    padding-top: 60/@r;
    font-size: 42/@r;
    font-weight: bold;
    letter-spacing: 4/@r;
    color: lightcoral;
  }
  button{
    padding: 2/@r;
    color: lightcoral;
    background: white;
    border: none;
    font-weight: bold;
    font-size: 18/@r;
  }
  #infor_login{
    position: absolute;
    top: 130/@r;
    left: 94/@r;
  }
  #pass_login{
    position: absolute;
    top: 130/@r;
    right: 94/@r;
  }
  .infor{
    position: absolute;
    top: 186/@r;
    left: 10%;
    width: 80%;
    font-size: 16/@r;
    .get{
      position: absolute;
      top: 12/@r;
      right:6/@r;
    }
    input:nth-of-type(1){
      width: 100%;
      border: 1px solid #999;
      height: 40/@r;
      line-height: 40/@r;
      text-indent: 8/@r;
      letter-spacing: 0.5/@r;
    }
    input:nth-of-type(2){
      margin-top: 16/@r;
      width: 100%;
      border: 1px solid #999;
      height: 40/@r;
      line-height: 40/@r;
      text-indent: 8/@r;
      letter-spacing: 0.5/@r;
    }
    p{
      margin-top: 10/@r;
      font-size: 14/@r;
      line-height: 18/@r;
      color: #999;
      a{
        color: lightcoral;
      }
    }
    input:nth-of-type(3){
      margin-top: 10/@r;
      width: 100%;
      height: 40/@r;
      color: white;
      background: lightcoral;
      font-size: 18/@r;
    }
    .about_us{
      margin: 18/@r auto;
      display: block;
      width: 64/@r;
    }
  }
  .pass{
    position: absolute;
    top: 186/@r;
    left: 10%;
    width: 80%;
    font-size: 16/@r;
    input:nth-of-type(1){
      width: 100%;
      border: 1px solid #999;
      height: 40/@r;
      line-height: 40/@r;
      text-indent: 8/@r;
      letter-spacing: 0.5/@r;
    }
    input:nth-of-type(2){
      margin-top: 16/@r;
      width: 100%;
      border: 1px solid #999;
      height: 40/@r;
      line-height: 40/@r;
      text-indent: 8/@r;
      letter-spacing: 0.5/@r;
    }
    input:nth-of-type(3){
      margin-top: 16/@r;
      width: 100%;
      border: 1px solid #999;
      height: 40/@r;
      line-height: 40/@r;
      text-indent: 8/@r;
      letter-spacing: 0.5/@r;
    }
    input:nth-of-type(4){
      margin-top: 16/@r;
      width: 100%;
      border: 1px solid #999;
      height: 40/@r;
      line-height: 40/@r;
      text-indent: 8/@r;
      letter-spacing: 0.5/@r;
    }
    input:nth-of-type(5){
      margin-top: 20/@r;
      width: 100%;
      height: 40/@r;
      color: white;
      background: lightcoral;
      font-size: 18/@r;
    }
    .about_us{
      margin: 18/@r auto;
      display: block;
      width: 64/@r;
    }
    .p_btn{
      position: absolute;
      top: 68/@r;
      right: 6/@r;
      width:42/@r;
      height:20/@r;
      input{
        display: none;
      }
      label{
        display: block;
        border:1/@r solid #999;
        height:20/@r;
        border-radius: 15/@r;
        transition: .3s;
      }
      label span{
        display: block;
        width:20px;
        height:20px;
        box-shadow: 1/@r 1/@r 1/@r #ccc;
        border-radius: 50%;
        background: #fff;
        transition: .3s;
      }
      input:checked+label{
        background: lightcoral;
      }
      input:checked+label span{
        transform: translateX(20/@r);
        box-shadow: none;
      }
    }
    .p_img{
      width: 140/@r;
      height: 40/@r;
      position: absolute;
      top:116/@r;
      right: 0/@r;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .on{
    border-bottom: 3px solid lightcoral;
  }
  .rightPhone{
    color: black !important;
  }
</style>
