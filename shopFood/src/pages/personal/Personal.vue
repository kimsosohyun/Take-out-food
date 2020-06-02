<template>
  <div class="personal">
    <Header title="有关于我"/>
    <div class="to_login">
      <router-link :to="!user._id?'/login':'/userInfo'">
        <div class="l_img">
          <img :src="avatar_url" alt="">
        </div>
        <div class="l_left">
          <h3 v-if="user._id">{{user.name||"这个人很酷名字未知！"}}</h3>
          <h3 v-else>登陆|注册</h3>
          <div>
            <i class="iconfont icon-shouji icon-mobile">
            </i>
          </div>
          <span>{{user.phone||"这个人居然没有手机号？"}}</span>
        </div>
        <div class="l_right">
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </router-link>
    </div>

    <div class="btns">
      <router-link  :to="!user._id?'/login':'/personal/balance'" tag="button">
        <strong>0.00</strong>元
        <span>我的余额</span>
      </router-link>

      <router-link  :to="!user._id?'/login':'/personal/Envelopes'" tag="button">
        <strong>0</strong>个
        <span>我的红包</span>
      </router-link>

      <router-link  :to="!user._id?'/login':'/personal/Integral'" tag="button">
        <strong>0</strong>分
        <span>我的积分</span>
      </router-link>

    </div>

    <div class="common">
      <ul>
        <li class="dingdan" @click="$router.push('/order')">
          <i class="iconfont icon-dingdan i"></i>
          <span>我的订单</span>
          <div class="c_right">
            <i class="iconfont icon-jiantou1"></i>
          </div>
        </li>
        <li class="jifen" @click="open">
          <i class="iconfont icon-jifen i"></i>
          <span>积分商城</span>
          <div class="c_right">
            <i class="iconfont icon-jiantou1"></i>
          </div>
        </li>
        <li class="vip">
          <i class="iconfont icon-vip i"></i>
          <span>kim外卖会员卡</span>
          <div class="c_right">
            <i class="iconfont icon-jiantou1"></i>
          </div>
        </li>
      </ul>
    </div>

    <div class="fuwu" @click="to_service">
      <i class="iconfont icon-fuwu i"></i>
      <span>服务中心</span>
      <div class="c_right">
        <i class="iconfont icon-jiantou1"></i>
      </div>
    </div>

    <mt-button v-show="user._id"  class="logout" type="danger" @click="logout">退出登陆</mt-button>

    <Toast_r :show="popupVisible" :close="close" title="暂不支持此功能">
      <section slot="main" class="pop_m">
        <img src="https://cube.elemecdn.com/c/5f/7e11248ffad35e349d689a21d493fpng.png" alt="">
        <div class="info">
          <h3>更多活动，红包尽在客户端</h3>
          <h2>快来扫码下载吧！</h2>
        </div>
        <div class="ok" @click="close">
          <span>我知道了</span>
        </div>
      </section>
    </Toast_r>

    <div class="pop_d">
      <router-view></router-view>
    </div>

  </div>


</template>

<script>
  import Header from "../../components/header/Header"
  import Toast_r from "../../components/toast/Toast1"
  import {mapState} from "vuex"
  import {MessageBox,Toast} from "mint-ui"
  export default {
    name: 'Personal',
    data(){
      return {
        popupVisible:false
      }
    },
    components:{
      Header,Toast_r
    },
    computed:{
      ...mapState(["user"]),
      avatar_url(){
        if (this.user.avatar){
          return this.user.avatar;
        } else{
          return "//p1.meituan.net/codeman/e32b47a07b818bf9a1d4086a882c18a62282.png"
        }
      }
    },
    methods:{
      logout(){
        MessageBox.confirm('确定要离开吗？').then(action => {
          this.$store.dispatch("logout");
          let instance = Toast('退出成功');
          setTimeout(() => {
            instance.close();
          }, 1000)
        });

      },
      open(){
       this.popupVisible=true;
      },
      close(){
        this.popupVisible=false;
      },
      to_service(){
        if (this.user._id){
          this.$router.push("/service");
        } else{
          this.$router.push("/login");
        }

      }
    }


  }
</script>

<style scoped lang="less">
  @r:25rem;
  .personal{
    background: #eee;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .to_login{
    border-top: 1/@r solid #e4e4e4;
    width: 100%;
    background: lightcoral;
    height: 90/@r;
    position: relative;
    .l_img{
      width: 60/@r;
      height: 60/@r;
      box-sizing: border-box;
      border: 1px solid lightcoral;
      background: #ddd;
      overflow: hidden;
      border-radius: 50%;
      position: relative;
      top: 15/@r;
      left: 6/@r;
      img{
        width: 60/@r;
        height: 60/@r;
      }
    }
    .l_left{
      color: white;
      position: absolute;
      top:23/@r;
      left: 80/@r;
      h3{
        font-size: 20/@r;
        margin-bottom: 3/@r;
      }
     div{
       display: inline;
       position: absolute;
       top: 28/@r;
       left: -12/@r;
       i{
         font-size: 27/@r;
       }
     }
      span{
        margin-left: 16/@r;
        font-size: 16/@r;
      }
    }
    .l_right{
      color: white;
      position: absolute;
      right: 12/@r;
      top: 31/@r;
    }
  }
  .btns{
    display: flex;
    width: 100%;
    height: 80/@r;
    button{
      font-size: 16/@r;
      background: white;
      flex: 1;
      border: none;
      strong{
        font-size: 34/@r;
        font-weight: bold;
      }
      span{
        display: block;
        margin-top: 4/@r;
      }
    }
    button:nth-of-type(1){
      border-right: 1px solid #ddd;
      strong{
        color: orange;
      }
    }
    button:nth-of-type(2){
      border-right: 1px solid #ddd;
      strong{
        color: red;
      }
    }
    button:nth-of-type(3){
      strong{
        color: forestgreen;
      }
    }
  }
  .common{
    background: white;
    margin-top: 12/@r;
    width: 100%;
    ul{
      margin-left: 10/@r;
      li{
        position: relative;
        height: 46/@r;
        span{
          font-size: 16/@r;
          line-height: 46/@r;
          margin-left: -2/@r;
        }
        .c_right{
          color: #ddd;
          position: absolute;
          top: 6/@r;
          right: 2/@r;
        }
      }
      .dingdan{
        border-bottom: 1px solid #ddd;
        .i{
          color:lightseagreen;
          font-size: 18/@r;
        }
      }
      .jifen{
        border-bottom: 1px solid #ddd;
        .i{
          position: relative;
          top: 6/@r;
          left: -8/@r;
          color:red;
          font-size: 32/@r;
        }
        span{
          margin-left: -16/@r;
        }
      }
      .vip{
        .i{
          position: relative;
          left: -2/@r;
          color:orange;
          font-size: 20/@r;
        }
      }
    }
  }

  .fuwu{
    position: relative;
    padding-left: 10/@r;
    background: white;
    margin-top: 12/@r;
    width: 100%;
    height: 46/@r;
    span{
      font-size: 16/@r;
      line-height: 46/@r;
      margin-left: -2/@r;
    }
    .c_right{
      color: #ddd;
      position: absolute;
      top: 6/@r;
      right: 12/@r;
    }
    .i{
      position: relative;
      left: -2/@r;
      top: 4/@r;
      color:green;
      font-size: 24/@r;
    }
  }
  .logout{
    margin-top: 20/@r;
    width: 100%;
  }
  .pop_m{
    img{
      width: 200/@r;
      height: 200/@r;
      display: block;
      margin: 30/@r auto;
    }
    .info{
      text-align: center;
      h3{
        font-size: 18/@r;
        line-height: 30/@r;
      }
      h2{
        font-size: 20/@r;
        line-height: 32/@r;
        color: red;
      }
    }
    .ok{
      width: 28%;
      margin: 40/@r auto 0;
      background: lightcoral;
      height: 40/@r;
      text-align: center;
      border-radius: 20/@r;
      span{
        font-weight: bold;
        font-size: 14/@r;
        line-height: 40/@r;
        color: white;
      }
    }
  }

</style>
