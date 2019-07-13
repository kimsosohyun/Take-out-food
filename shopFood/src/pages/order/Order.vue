<template>
  <div>
    <Header title="我的订单"/>
    <div class="no_login">
      <img src="./img/person.png" alt="">
      <p>登陆后查看外卖订单</p>
      <button>立即登陆</button>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/Header"
  export default {
    name: 'Order',
    components:{
      Header
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

</style>
