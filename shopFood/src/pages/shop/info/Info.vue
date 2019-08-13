<template>
    <div class="info" ref="wrapper">
      <div class="inner">
        <div class="delivery">
          <h3>配送信息</h3>
          <span class="de_color">kim专送</span>
          <p>由商家提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</p>
          <span class="de_money">配送费￥{{info.deliveryPrice}}</span>
        </div>
        <div class="service">
          <h3>商家服务</h3>
          <ul>
            <li v-for="(support,index) in info.supports" :key="index">
              <div class="s_title" :class="colorArr[support.type]">{{support.name}}</div>
              <span>{{support.content}}</span>
            </li>
          </ul>
        </div>
        <div class="shop_img">
          <h3>商家实景</h3>
          <div class="imgs" ref="imgWrap">
            <div class="imgInner">
              <div class="img" v-for="(pic,index) in info.pics" :key="index">
                <img :src="pic" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="shop_info">
          <h3>商家信息</h3>
          <ul>
            <li>
              <span class="left">品类</span>
              <span class="right">{{info.category}}</span>
            </li>
            <li>
              <span class="left">商家电话</span>
              <span class="right">{{info.phone}}</span>
            </li>
            <li>
              <span class="left">地址</span>
              <span class="right">{{info.address}}</span>
            </li>
            <li>
              <span class="left">营业时间</span>
              <span class="right">{{info.workTime}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import  BScroll from "better-scroll";
  import {mapState} from "vuex";
  export default {
    name: 'Info',
    data(){
      return {
        colorArr:["green","red","orange"],
      }
    },
    mounted(){  //因为在进入shop主路由时需要显示头部，所以就发请求得到info,因此很早就有了数据，在这就只需要在初始化的时候BScroll就Ok了
      this.mainScroll=new BScroll(this.$refs.wrapper,{
        click:true
      })
      this.imgScroll=new BScroll(this.$refs.imgWrap,{
        click:true,
        scrollX: true
      })
    },
    computed:{
      ...mapState(["info"])
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .info{
    height:630/@r;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    h3{
      font-size: 18/@r;
      font-weight: bold;
      padding-bottom: 10/@r;
    }
    .delivery{
      padding-left: 10/@r;
      padding-right: 10/@r;
      background: white;
      padding-top: 12/@r;
      padding-bottom: 12/@r;
      .de_color{
        padding: 1/@r;
        background: lightcoral;
        border: 1px solid lightcoral;
        color: white;
        font-size: 12/@r;
      }
      p{
        display: inline;
        font-size: 14/@r;
        color: #666;
      }
      .de_money{
        padding-top: 10/@r;
        display: block;
        font-size: 14/@r;
        color: #666;
      }
    }
    .service{
      margin-top: 10/@r;
      padding-left: 10/@r;
      background: white;
      padding-top: 12/@r;
      padding-right: 10/@r;
      ul{
        width: 100%;
        padding-bottom: 6/@r;
        li{
          margin-bottom: 6/@r;
          height: 24/@r;
          width: 100%;
          line-height: 24/@r;
          font-size: 14/@r;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #666;
          .s_title{
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
      }
    }
    .shop_img{
      padding-bottom: 10/@r;
      margin-top: 10/@r;
      padding-left: 10/@r;
      background: white;
      padding-top: 12/@r;
      padding-right: 10/@r;
      .imgs{
        width: 100%;
        height: 100/@r;
        overflow: hidden;
        .imgInner{
          height: 100/@r;
          white-space: nowrap;
          display: inline-flex;
          .img{
            overflow: hidden;
            width:100/@r;
            height: 100/@r;
            float: left;
            margin-right: 10/@r;
            img{
              width: 100%;
              height: 100/@r;
            }
          }
          .img:last-child{
            margin: 0;
          }
        }
      }
    }
    .shop_info{
      padding-bottom: 10/@r;
      margin-top: 10/@r;
      padding-left: 10/@r;
      background: white;
      padding-top: 12/@r;
      padding-right: 10/@r;
      ul{
        li{
          height:40/@r;
          width: 100%;
          line-height: 40/@r;
          border-bottom: 1/@r solid #e4e4e4;
          span{
            font-size: 14/@r;
          }
          .left{
            color: #333;
            font-weight: bold;
            float: left;
          }
          .right{
            color: #666;
            float: right;
            margin-right: 2/@r;
          }
        }
      }
    }
  }

</style>
