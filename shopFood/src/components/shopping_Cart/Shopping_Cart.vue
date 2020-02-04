<template>
    <div>
        <div class="main">
          <div class="left" @click="show">
            <div class="cart">
              <i class="i_empty  iconfont icon-hezi" v-if="!count"></i>
              <i class="i_use  iconfont icon-hezixiangzi" v-else></i>
              <div class="num" v-if="count">
                <span>{{count}}</span>
              </div>
            </div>
            <div class="content">
              <strong>￥{{money}}</strong>
              <p>另需配送费{{info.deliveryPrice}}元</p>
            </div>
          </div>
          <div @click="goPay"  class="right" :class="{overMin:money>info.minPrice}">
              <span>{{content}}</span>
          </div>
        </div>


          <div class="list" :class="{gotop:showList&&nowCount}">
              <div class="wrap"  @click="show">
              </div>
              <div class="l_content">
                <div class="title">
                  <span>购物车</span>
                  <a href="javascript:;" @click="removeAll">清空</a>
                </div>
                <div class="list_wrap">
                  <ul class="list_content">
                    <li v-for="(card,index) in thisCard" :index="index">
                      <span>{{card.name}}</span>
                      <strong>￥{{card.price*card.count}}</strong>
                      <Btn :f_item="card"/>
                    </li>
                  </ul>
                </div>
              </div>
          </div>


    </div>
</template>

<script>
  import  Btn from "../btn/Btn";
  import BScroll from 'better-scroll'
  import {mapState}  from "vuex"
  import  {MessageBox} from "mint-ui"
  export default {
    name: 'Shopping_Cart',
    components:{
      Btn
    },
    data(){
      return {
        id:this.$route.query.id,
        showList:false,
        overMin:false,
      }
    },
    methods:{
      show(){
        if (this.count>0) {
          this.showList=!this.showList;
           if (!this.scroll){ //防止多次添加BScroll而导致事件处理多次的bug(原因:BScroll禁止了原生事件，采用自己派发事件，如果有多个BScroll，一个事件就会调用多次)
             this.scroll=new BScroll('.list_wrap',{
               click:true
             })
           }else {
             this.scroll.refresh();
           }
        }
      },
      removeAll(){
        MessageBox.confirm('确定要清空吗？').then(action => {
          this.$store.dispatch("removeAll",this.id);
        }).catch(()=>{});
      },
      goPay(){
        if (this.money>=this.info.minPrice) {
          this.$router.push("/pay?id="+this.id)
        }
      }

    },
    computed:{
      ...mapState(["cardArr","info"]),
      thisCard(){
        var card=[];
       this.cardArr.forEach((item)=>{
          if (item[this.id]){
            card=item[this.id];
          }
        })
        return card;

      },
      count(){
        return this.thisCard.reduce((total,num)=>{
          return total+num.count
        },0)
      },
      money(){
        return this.thisCard.reduce((total,num)=>{
          return total+num.count*num.price
        },0)
      },
      content(){
        if (this.money>=this.info.minPrice)
        {
          return "去结算"
        }
        else{
          if (!this.money) {
            return "￥"+this.info.minPrice+"起送"
          }
          else{
            return "还需￥"+(this.info.minPrice-this.money)
              +"起送"
          }
        }
      },
      nowCount(){
        if (this.count>0){
          return true;
        } else {
          this.showList=false;//解决因为count为0自动关闭列表，而this.showList并没有赋值为false,下一次在count不为0时，列表自动弹出的bug。
          return false;
        }
      }
    },
    watch:{

    }
  }
</script>

<style scoped lang="less">
@r:25rem;
.main{
  width: 100%;
  height:50/@r;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: rgba(61,61,63,.9);
  .left{
    float: left;
    position: relative;
    width: 72%;
    /*background: pink;*/
    height: 100%;
    .cart{
      position: absolute;
      bottom: 10/@r;
      left: 18/@r;
      width: 50/@r;
      height: 50/@r;
      .i_empty{
        margin-left:-2/@r;
        font-size: 48/@r;
        color: lawngreen;
      }
      .i_use{
        margin-left:2/@r;
        font-size: 50/@r;
        color:lightcoral;
      }
      .num{
        width: 20/@r;
        height: 20/@r;
        background: rgba(255,182,193,0.6);
        position: absolute;
        top: -8/@r;
        left: 16/@r;
        text-align: center;
        line-height: 14/@r;
        border-radius: 50%;
        span{
          font-size: 16/@r;
          font-weight: bold;
          color: white;
        }

      }
    }
    .content{
      padding-left: 80/@r;
      strong{
        color: white;
        font-weight: bold;
        font-size: 20/@r;
      }
      p{
        margin-top: 5/@r;
        color: rgba(255,255,255,0.4);
        font-size: 12/@r;
      }
    }
  }
  .right{
    float: right;
    width: 28%;
    background: #535356;
    height: 100%;
    text-align: center;
    span{
      font-weight: bold;
      font-size: 14/@r;
      line-height: 50/@r;
      color: white;
    }
  }
  .overMin{
    background: lightcoral;
  }
}
.list{
  visibility: hidden;
}
.wrap {
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0;
}
  .l_content{
    width: 100%;
    background: white;
    position: fixed;
    bottom:50/@r;
    transform: translateY(100%);
    transition: .3s;
    .title{
      background: #f3f5f7;
      width: 100%;
      height: 38/@r;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      box-sizing: border-box;
      span{
        line-height: 38/@r;
        font-size: 16/@r;
        padding-left: 12/@r;
        font-weight: bold;
        letter-spacing: 1/@r;
      }
      a{
        padding-right: 12/@r;
        line-height: 38/@r;
        float: right;
        color: lightcoral;
        font-size: 14/@r;
      }
    }
    .list_wrap{
      overflow: hidden;
      max-height: 252/@r;
      width: 100%;
      .list_content{
        width: 100%;
        li:last-child {
          border: none;
        }
        li{
          position: relative;
          box-sizing: border-box;
          height: 42/@r;
          border-bottom: 1/@r solid #e4e4e4;
          span {
            font-size: 16/@r;
            padding-left: 12/@r;
            line-height: 42/@r;
          }
          strong {
            float: right;
            line-height: 42/@r;
            padding-right: 106/@r;
            font-size: 16/@r;
            color: red;
            font-weight: bold;
          }
        }
      }
    }
  }
  .gotop{
    visibility: visible;
    .wrap{
      opacity: 0.5;
    }
    .l_content{
      transform: translateY(0%);
    }
  }

</style>
