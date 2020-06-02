<template>
    <div class="service">
      <Header title="客服中心">
        <section class="h_back" @click="$router.go(-1)" slot="left">
          <i class="iconfont icon-jiantou2"></i>
        </section>
      </Header>
      <ul class="chatList">
          <li class="item left">
            <img class="header-img" src="../../common/imgs/kefu.gif" />
            <span class="message">Hi~请简要描述您的问题哦.</span>
          </li>
          <li v-for="(item,index) in user.content"  :key="index" class="item right">
            <img class="header-img" :src="avatar_url" />
            <span class="message">{{item}}</span>
          </li>
      </ul>

      <div class="input-box">
        <input type="text" v-model="content" />
        <button @click="submit">确定</button>
      </div>

    </div>
</template>

<script>
  import Header from "../../components/header/Header";
  import {mapState} from "Vuex";
  export default {
    name: 'Service',
    data(){
      return {
        content:""
      }
    },
    components:{
      Header
    },
    updated(){
      window.scrollTo(0, document.body.scrollHeight); // 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用
    },
    methods:{
      submit(){
        if (this.content.trim()){
          var data={
            to:"content",
            result:this.content.trim()
          }
          this.$store.dispatch("update_userInfo",data);
          this.content="";
        }
      }
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
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .h_back{
    width: 45/@r;
    height: 100%;
    position: absolute;
    i{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      font-size: 22/@r;
      color: white;
    }
  }
  .service{
    background: rgb(240, 240, 240);
    min-height: 100vh;
  }
  .chatList{
    margin-top: 10/@r;
    padding: 6/@r;
    margin-bottom: 50/@r;
  }
  .item {
    display: flex;
    margin-bottom: 10/@r;
  }

  .left {
    position: relative;
    flex-direction: row;
  }

  .left:before{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 6/@r solid transparent;
    border-right: 6/@r solid white;
    position: absolute;
    top: 12/@r;
    left: 34/@r;
  }

  .right {
    flex-direction: row-reverse;
    position: relative;
  }


  .right:after{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 6/@r solid transparent;
    border-left: 6/@r solid rgba(240,128,128,0.4);
    position: absolute;
    top: 12/@r;
    right: 34/@r;
  }

  .right .message {
    margin-right: 10/@r;
    background:rgba(240,128,128,0.4);
  }
  .left .message{
    margin-left: 10/@r;
    background: white;

  }

  .header-img {
    width: 36/@r;
    height: 36/@r;
  }

  .message {
    letter-spacing: 1/@r;
    line-height: 25/@r;
    max-width: 300/@r;
    border-radius: 10/@r;
    display: flex;
    min-height: 25/@r;
    padding: 6/@r ;
    align-items: center;
    word-wrap:break-word;
    word-break:break-all;
    font-size: 14/@r;
  }

  .input-box {
    background: rgb(240, 240, 240);
    position: fixed;
    z-index: 1;
    bottom: 0/@r;
    left: 0;
    right: 0;
    box-sizing: border-box;
    width: 100%;
    height: 50/@r;
    border-top: 0.04rem solid #ccc;
  }

  .input-box input {
    margin-left: 5/@r;
    height: 30/@r;
    margin-top: 10/@r;
    border-radius: 10/@r;
    font-size: 14/@r;
    outline: none;
    width: 84%;
    float: left;
  }

  .input-box button {
    float: right;
    width: 11%;
    margin-right: 6/@r;
    background: lightcoral;
    border: 1/@r #fffa solid;
    font-size: 12/@r;
    color: #ffffff;
    height: 30/@r;
    margin-top: 10/@r;
    border-radius: 10/@r;
    outline: none;
  }

</style>
