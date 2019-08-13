<template>
    <div>
      <section class="h_back" @click="$router.go(-1)">
        <i class="iconfont icon-jiantou2"></i>
      </section>

      <section class="h_header">
        <img class="bg_img" :src="info.bgImg" alt="">
        <div class="avatar">
          <div class="brand">品牌</div>
          <img :src="info.avatar" alt="">
        </div>
      </section>

      <section class="h_info">
        <div @click="show_info=true">
          <h3>
            {{info.name}}
            <i class="iconfont icon-jiantou"></i>
          </h3>
        </div>

        <div>
          <span>评价{{info.foodScore}}</span>
          <span>月售{{info.sellCount}}单</span>
         <p>{{info.description}}约{{info.deliveryTime}}分钟</p>
        </div>
      </section>

      <!--在初始化没有数据，进行表达式解析的时候：

      2层表达式: {}.c [][0] 解析为undefined,不会报错
      特殊情况:{{null.c}} Cannot read property 'c' of null"
      3层表达式: {}.c.b  [][0].c  Cannot read property 'c' of undefined"
      3层表达式报错解决方法:v-if 在没有数据的时候不解析（没有这个节点）

      总结:直接解析undefined或者null不会报错,而要从undefined或者null中取值就会报错。
      -->
      <section class="promotion" v-if="info.supports" @click="show_promotion=true">
        <div class="p_main">
          <div class="p_title" :class="colorArr[info.supports[0].type]">
            {{info.supports[0].name}}
          </div>
          <span>
            {{info.supports[0].content}}
          </span>
        </div>

        <div class="p_more">
          <span>{{info.supports.length}}个优惠</span>
          <i class="iconfont icon-jiantouarrow486"></i>
        </div>
      </section>


      <section class="header_info">
        <div class="wrap"  v-show="show_info"></div>
        <transition name="fade">
          <div class="h_content"  v-show="show_info">
            <div class="c_title">
              <div class="brand">品牌</div>
              <h3>{{info.name}}</h3>
            </div>

            <ul>
              <li>{{info.foodScore}}
                <span>评分</span>
              </li>
              <li>
                {{info.sellCount}}单
                <span>月售</span>
              </li>
              <li>{{info.description}}
                <span>约{{info.deliverTime}}分钟</span>
              </li>
              <li>
                {{info.deliveryPrice}}元
                <span>配送费</span>
              </li>
              <li>
                {{info.distance}}
                <span>距离</span>
              </li>
            </ul>
            <div class="notice">
            <span>
              —公告—
            </span>
              <p>
                {{info.bulletin}}
              </p>
            </div>

            <div class="close" @click="close_info">
              X
            </div>
          </div>
        </transition>
      </section>

      <section class="all_promotion">
        <div class="wrap" v-show="show_promotion">
        </div>
        <transition name="transform">
          <div class="p_content" v-show="show_promotion">
            <h3>优惠活动</h3>
            <div class="close" @click="close_promotion">
              X
            </div>
            <ul>
              <li v-for="(support,index) in info.supports" :key="index">
                <div class="p_title" :class="colorArr[support.type]">
                  {{support.name}}
                </div>
                <span>
                  {{support.content}}
                </span>
              </li>
            </ul>
          </div>
        </transition>
      </section>
    </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'ShopHeader',
    data(){
      return {
        colorArr:["green","red","orange"],
        show_info:false,
        show_promotion:false
      }
    },
    computed:{
      ...mapState(["info"])
    },
    methods:{
      close_info(){
        this.show_info=false;
      },
      close_promotion(){
        this.show_promotion=false;
      },

    },
    mounted(){
      // console.log(this.info.address)
    }
  }
</script>

<style scoped lang="less">
@r:25rem;
.wrap {
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  z-index: 2;
}
.p_title{
  font-size: 12/@r;
  float: left;
  display: block;
  text-align: center;
  margin-top: 5/@r;
  width: 30/@r;
  height: 14/@r;
  line-height: 14/@r;
  color: white;
  margin-left: 2/@r;
  margin-right: 6/@r;
}
.green{
  background:green;
}
.red{
  background: red;
}
.orange{
  background: orange;
}

  .h_back{
    position: absolute;
    i{
      padding-left: 6/@r;
      font-size: 20/@r;
      color: white;
    }
  }
  .h_header{
    width: 100%;
    .bg_img{
      width: 100%;
      height: 100/@r;
    }
    .avatar{
      position: relative;
      border: 1/@r solid #e4e4e4;
      margin: -60/@r auto 0;
      width: 74/@r;
      height: 74/@r;
      box-sizing: border-box;
      .brand{
        position: absolute;
        top: 0/@r;
        left: 0/@r;
        background: yellow;
        display: block;
        padding: 2/@r;
        font-size: 12/@r;
        text-align: center;
        width: 24/@r;
        height: 8/@r;
        font-weight: bold;
        line-height: 8/@r;
        font-family: "Adobe 黑体 Std";
      }
      img{
        width: 100%;
      }
    }
  }
  .h_info{
    margin-top: 10/@r;
    div:nth-of-type(1){
      h3{
        text-align: center;
        font-size: 22/@r;
        font-weight: bold;
        i{
          font-weight: bold;
          padding-left: 2/@r;
          font-size: 20/@r;
        }
      }
    }
    div:nth-of-type(2){
      width: 220/@r;
      height: 12/@r;
      margin: 14/@r auto 10/@r;
      span,p{
        font-size: 12/@r;
        float: left;
        margin-right:6/@r;
        color:#666;
      }
    }
  }
  .promotion{
    width: 86%;
    height: 24/@r;
    margin-left: 7%;
    border: 1px solid #ececec;
    .p_main{
      line-height: 24/@r;
      font-size: 12/@r;
      width: 80%;
      height: 30/@r;
      float: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .p_more{
      color: #999;
      width: 18%;
      float: right;
      line-height: 24/@r;
      font-size: 12/@r;
     i{
       padding-top: 1/@r;
       font-size: 10/@r;
       float: right;
     }
    }
  }
  .header_info {
    .h_content{
      position: fixed;
      left:10% ;
      top: 188/@r;
      z-index: 3;
      width:80%;
      border-radius: 3%;
      background: white;
      .c_title{
        width: 80%;
        margin:8% 10%;
        .brand{
          background: yellow;
          display: block;
          margin: 4/@r 5/@r 0 0;
          float: left;
          padding: 2/@r;
          font-size: 12/@r;
          text-align: center;
          width: 24/@r;
          height: 12/@r;
          font-weight: bold;
          line-height: 12/@r;
          font-family: "Adobe 黑体 Std";
        }
        h3{
          text-align: center;
          font-size: 22/@r;
          line-height: 24/@r;
          font-weight: bold;
        }
      }
      ul{
        margin-top:6/@r;
        width: 100%;
        li{
          font-size: 15/@r;
          text-align: center;
          width: 20%;
          float: left;
          font-weight: bold;
          span{
            margin-top: 8/@r;
            display: block;
            color: #999;
            font-size: 12/@r;
          }
        }
      }
      ul::after{
        clear: both;
        display: block;
        content: "";
      }
      .notice{
        margin-top: 20/@r;
        width: 90%;
        margin-left: 5%;
        font-size: 14/@r;
        text-align: center;
        span{
          color: #999;
        }
        p{
          padding: 20/@r 0 30/@r 0;
          max-height: 140/@r;
          overflow: auto;
        }
      }
      .close{
        position: absolute;
        width: 30/@r;
        height: 30/@r;
        top: 110%;
        left: calc( 50% - 16px);
        border: 1/@r solid white;
        border-radius: 50%;
        line-height: 30/@r;
        text-align: center;
        font-size: 18/@r;
        color: white;
        z-index: 3;
      }
    }
  }
  .all_promotion{
      .p_content{
        margin-top: 210/@r;
        position: fixed;
        z-index: 3;
        width: 100%;
        height: 250/@r;
        background: #f5f5f5;
        h3{
          padding: 16/@r 0;
          font-size: 18/@r;
          text-align: center;
          font-weight: bold;
        }
        ul{
          margin-top: 2/@r;
          margin-left: 8%;
          width: 84%;
          max-height: 70%;
          overflow: auto;
          li{
            margin-bottom: 4/@r;
            height: 24/@r;
            width: 100%;
            line-height: 24/@r;
            font-size: 14/@r;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        .close{
          position: absolute;
          top: 8/@r;
          right: 8/@r;
          font-size: 22/@r;
          color: #999;
        }
      }
  }
  .fade-enter, .fade-leave-to { //进入前，离开后
    opacity: 0
  }
  .fade-leave, .fade-enter-to {//离开前，进入后
    opacity: 1
  }
  .fade-enter-active//.fade-leave-active { //进出过程中
  {
    transition: all .8s
  }
  .transform-enter, .transform-leave-to { //进入前，离开后
    bottom:-250/@r;
  }
  .transform-leave, .transform-enter-to {//离开前，进入后
    bottom: 0;
  }
  .transform-enter-active//.fade-leave-active { //进出过程中
  {
    transition: all .5s
  }

</style>
