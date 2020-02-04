<template>
  <div>
    <Header title="我的订单"/>
    <div class="no_login" v-if="!user._id">
      <img src="./img/person.png" alt="">
      <p>登陆后查看外卖订单</p>
      <button @click="$router.push('/login')">立即登陆</button>
    </div>

    <div class="is_login" v-else>
      <div class="wrap"></div>
      <div class="inner">
        <p>还没有一个订单哎~~</p>
        <button  @click="$router.push('/main')">立即下单</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/Header"
  import {mapState} from "vuex"
  export default {
    name: 'Order',
    components:{
      Header
    },
    computed:{
      user(){
        return this.$store.state.user
      }  //也有这种复杂的写法。
       //...mapState(["user"])
    }
  }
</script>

<style scoped lang="less">
  @r:20rem;
  .no_login{
    width: 100%;
    img{
      display: block;
      margin:0/@r auto 10/@r;
      width: 240/@r;
      height: 240/@r;
    }
    p{
      font-size: 15/@r;
      text-align: center;
      color: #999;
    }
    button{
      margin: 10/@r auto;
      display: block;
      width: 80/@r;
      font-size: 14/@r;
      height: 30/@r;
      border: 1px solid lightcoral;
      border-radius: 4/@r;
      background: lightcoral;
      color: white;
    }
  }
  .is_login{
    .wrap{
      position: absolute;
      top: 1.8rem;
      bottom: 0;
      right: 0;
      left: 0;
      background: url("./img/haimian.jpg") no-repeat -5rem 0;
      filter: blur(2px);
      background-size:cover;
      z-index: 1;
      opacity: 0.9;

    }
    .inner{
      position: relative;
      z-index: 2;
    }
    /*width: 100vw;*/
    /*height: 86vh;*/
    p{
      padding-top: 1.2rem;
      font-size: 15/@r;
      text-align: center;
      font-weight: bold;
    }
    button{
      margin: 256/@r auto 0;
      display: block;
      width: 80/@r;
      font-size: 14/@r;
      height: 30/@r;
      border: 1px solid lightcoral;
      border-radius: 4/@r;
      background: lightcoral;
      color: white;
    }
  }

</style>
