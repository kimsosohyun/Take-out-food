<template>
  <transition name="fade">
    <div class="foodInfo" v-if="showInfo">
      <div class="wrap" @click="changeShow"></div>
      <div class="inner">
        <div class="back" @click="changeShow">
          <i class="iconfont icon-jiantou2"></i>
        </div>

        <div class="img">
          <img v-lazy="f_item.image" alt="">
          <div class="info">
            <p>{{f_item.description||"暂无描述"}}</p>
          </div>
        </div>

        <div class="content">
          <h3>{{f_item.name}}</h3>
          <div class="main">
            <span>月售{{f_item.rating}}份</span>
            <span>好评率{{f_item.sellCount}}%</span>
          </div>
          <div class="price">
            <b>￥{{f_item.price}}</b>
            <div class="oldPrice" v-if="f_item.oldPrice">
              <span></span>
              <b>￥{{f_item.oldPrice}}</b>
            </div>
          </div>

          <Btn :f_item="f_item"></Btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Btn from  "../btn/Btn"
  export default {
    name: 'FoodInfo',
    components:{
      Btn
    },
    data(){
      return {
        showInfo:false
      }
    },
    props:{
      f_item: Object,
    },
    methods:{
      changeShow(){
        this.showInfo=false;
      }
    }
  }
</script>

<style scoped lang="less">
@r:25rem;
  .foodInfo{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .wrap{
      position: absolute;
      z-index: 2;
      top: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: .5;
    }
    .inner{
      box-shadow:2px 2px 3px #aaa;
      border: 1/@r solid white;
      box-sizing: border-box;
      border-radius: 6/@r;
      top: 156/@r;
      position: absolute;
      z-index: 3;
      background: white;
      width: 80%;
      left: 10%;
      height: 340/@r;
      .back{
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        padding: 3/@r;
        i{
          font-size: 22/@r;
          color: white;
        }
      }
      .img{
        z-index: 1;
        position: relative;
        width: 100%;
        height: 70%;
        img{
          width: 100%;
          height: 100%;
        }
        .info{
          width: 98%;
          font-size: 14/@r;
          position: absolute;
          bottom: 4/@r;
          left: 2%;
          p{
            color:lightcoral;
            line-height: 18/@r;
          }
        }
      }
      .content{
        margin: 12/@r 0 0 10/@r;
        h3{
          margin-bottom: 8/@r;
          font-size: 21/@r;
          font-weight: bold;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .main{
          line-height: 20/@r;
          font-size: 13/@r;
          margin-bottom: 2/@r;
        }
        .price{
          float: left;
          b{
            font-size: 18/@r;
          }
          b:nth-of-type(1){
            color: red;
          }
          .oldPrice{
            margin-left: 6/@r;
            float: right;
            position: relative;
            span{
              position: absolute;
              top: 16/@r;
              left: 9/@r;
              display: block;
              width: 24/@r;
              height: 2/@r;
              background:#999;
            }
            b{
              font-size: 15/@r;
              color: #999;
            }
          }
        }
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
    transition: all .6s
  }
</style>
