<template>
    <div class="pay">
      <Header title="确认订单">
        <section class="h_back" @click="$router.go(-1)" slot="left">
          <i class="iconfont icon-jiantou2"></i>
        </section>
      </Header>

      <div class="main">
        <ul class="payInfo">
          <li @click="show_a">
            <a  href="javascript:;">
              <i class="iconfont icon-jia"></i>
              <p :class="{p_active:c_adr}">{{c_adr?c_adr:"选择收货地址"}}</p>
            </a>
          </li>

          <li>
            <i class="iconfont icon-shijian"></i>
            <p>现在下单预计<span>{{hour+":"+minutes}}</span>送达</p>
          </li>
        </ul>

        <div class="foodInfo">
          <div class="top">
            <div class="avatar">
              <img :src="info.avatar" alt="">
            </div>

            <span>{{info.name}}</span>

            <div class="kim">{{info.description}}</div>
          </div>



          <div class="list">
            <div class="list_wrap">
              <ul class="list_content">
                <li v-for="(item,index) in thisCard" :key="index">
                  <span>{{item.name}}</span>
                  <i>{{"x"+item.count}}</i>
                  <strong>￥{{item.price}}</strong>
                </li>
              </ul>
            </div>

            <div class="all">
              <div>配送费：<span>{{info.deliveryPrice}}</span></div>
              <div>小计：<strong>￥{{money+info.deliveryPrice}}</strong></div>
            </div>
          </div>
        </div>


        <div class="remarks">
          <div @click="show_r">
            <span>备注</span>
            <i class="iconfont icon-jiantou "></i>
            <p>{{have_remarks?"已备注":''}}</p>
          </div>
          <div @click="show_i">
            <span>红包</span>
            <i class="iconfont icon-jiantou "></i>
          </div>
          <div>
            <span>发票</span>
            <p>暂不支持</p>
          </div>
        </div>
      </div>

      <div class="submit">
        <div class="left">合计<span>￥{{money+info.deliveryPrice}}</span></div>
        <div class="right">
          <span>确认支付</span>
        </div>
      </div>


      <div class="wrap" :class="{wrap_active:show_remarks}"></div>

      <div class="remarks_pop" :class="{remarks_active:show_remarks}">
        <div class="title">
          <span>订单备注</span>
          <a href="javascript:;" @click="close_r">确定</a>
        </div>
        <textarea placeholder="您的口味，偏好~~" v-model="remarks"></textarea>
      </div>

      <div class="pop_integral">
        <Toast_r :show="show_integral" :close="close_i" title="我的红包">
          <section slot="main" class="pop_main">
            <div class="img">
              <img src="../../common/imgs/int.gif" alt="">
              <p>暂时丢失了和红包的联系哦QAQ</p>
            </div>
          </section>
        </Toast_r>
      </div>

      <div class="pop_address">
        <Toast_r :show="show_address" :close="close_a" title="地址选择">
          <section slot="main" class="pop_r">
            <ul>
              <li v-for="(item,index) in user.address" @click="choose_a(item.adr,index)"  :key="index">
                <div class="top">
                  <p>{{item.adr}}</p>

                </div>

                <div class="bottom">
                  <span>{{item.name}}</span>
                  <p>{{item.phone}}</p>
                </div>

                <div class="right">
                  <i v-if="index!==choose_index" class="iconfont icon-xuanzhongyuandian"></i>
                  <i v-else class="iconfont icon-xuanzhong"></i>
                </div>
              </li>
            </ul>

            <div class="add" @click="open_ad">
              <span>新添</span>
              <div class="r">
                <i class="iconfont icon-jiantou1"></i>
              </div>
            </div>
          </section>
        </Toast_r>
      </div>


      <div class="add_address">
        <Toast_r :show="show_ad" :close="close_ad" title="新增地址">
          <section slot="main" class="pop_ad">
            <ul>
              <li>
                <span>联系人</span>
                <input type="text" placeholder="姓名" v-model="address.name">
              </li>
              <li>
                <span>电话</span>
                <input type="text" placeholder="手机号码" maxlength="11" v-model="address.phone">
              </li>
              <li>
                <span>地址</span>
                <input type="text" placeholder="收货地址" v-model="address.adr">
              </li>
            </ul>
            <div class="ok" @click="add_adr">
              <button>确认</button>
            </div>
          </section>
        </Toast_r>
      </div>

    </div>
</template>

<script>
  import Header from "../../components/header/Header"
  import Toast_r from "../../components/toast/Toast1"
  import {mapState} from "vuex"
  export default {
    name: 'Pay',
    data(){
      return {
        id:this.$route.query.id,
        show_remarks:false,
        remarks:"",
        show_integral:false,
        show_address:false,
        choose_index:-1,
        show_ad:false,
        c_adr:"",
        address:{
          name:"",
          phone:"",
          adr:""
        }
      }
    },
    components:{
      Header,Toast_r
    },
    methods:{
      show_r(){
        this.show_remarks=true;
      },
      close_r(){
        this.show_remarks=false;
      },
      show_i(){
        this.show_integral=true;
      },
      show_a(){
        this.show_address=true;
      },
      close_i(){
        this.show_integral=false;
      } ,
      close_a(){
        this.show_address=false;
      },
      choose_a(adr,index){
        if (this.choose_index!==index){
          this.c_adr=adr;
          this.choose_index=index;
          setTimeout(()=>{
            this.show_address=false;
          },400)
        } else{
          this.choose_index=-1;
          this.c_adr="";
        }
      },
      close_ad(){
        this.show_ad=false;
      } ,
      open_ad(){
        this.show_ad=true;
      },
      add_adr(){
        var data={
          to:"address",
          result:this.address
        }
        this.$store.dispatch("update_userInfo",data);
        this.show_ad=false;
        this.address={
          name:"",
          phone:"",
          adr:""
        }
      }
    },
    computed:{
      ...mapState(["cardArr",'info',"user"]),
      hour(){
        var nowTime=new Date();
        var newTime=nowTime.setMinutes(nowTime.getMinutes()+this.info.deliveryTime);
        return new Date(newTime).getHours();
      },
      minutes(){
        var nowTime=new Date();
        var newTime=nowTime.setMinutes(nowTime.getMinutes()+this.info.deliveryTime);
        if ( new Date(newTime).getMinutes()<10){
          return "0"+new Date(newTime).getMinutes();
        }
        else{
          return new Date(newTime).getMinutes();
        }

      },
      thisCard(){
        var card=[];
        this.cardArr.forEach((item)=>{
          if (item[this.id]){
            card=item[this.id];
          }
        })
        return card;
      },
      money() {
        return this.thisCard.reduce((total, num) => {
          return total + num.count * num.price
        }, 0)
      },
      have_remarks(){
        if(this.remarks){
          return true;
        } else{
          return false;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .wrap {
    position:fixed;
    transition: .2s;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: black;
    visibility: hidden;
    z-index: 1;
    opacity: 0;
  }
  .pay{
    background:#eee;
    min-height: 100vh;
  }
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
  .main{
    margin:10/@r auto 0;
    width: 95%;
    font-size: 24/@r;
  }
  .payInfo{
    background: white;
    margin-bottom: 10/@r;
    li{
      line-height: 40/@r;
      width: 95%;
      margin: 0 auto;
      height: 40/@r;
      border-bottom: 1/@r solid #eee;
      box-sizing: border-box;
      font-size: 16/@r;
    }
    li:last-child{
      border-bottom: none;
    }
    a{
      display: block;
      width: 100%;
      color: lightcoral;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      .p_active{
        color: black;
      }
    }
    i{
      margin-right: 20/@r;
    }
    p{
      display: inline;
      span{
        color: red;
      }
    }
  }
  .foodInfo{
    overflow: hidden;
    background: white;
    .top{
      height: 50/@r;
      padding-top: 0.1/@r;
      span{
        font-size: 14/@r;
        line-height: 50/@r;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 60%;
        display: block;
        color: #666;
        float: left;
      }
      .kim{
        color: lightcoral;
        height: 16/@r;
        line-height: 16/@r;
        margin: 17/@r 2/@r;
        border: 1/@r solid lightcoral;
        padding:0 1/@r;
        float: right;
        font-size: 12/@r;
      }

    }
    .avatar{
      float: left;
      img{
        margin: 10/@r 10/@r;
        width: 30/@r;
        height: 30/@r;
        display: block;
        border-radius: 50%;
      }
    }

    .list_wrap{
      overflow: hidden;
      width: 100%;
      .list_content{
        width: 100%;
        li:last-child {
          border-bottom: 2/@r dashed  #e4e4e4;
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
          i{
            font-size: 14/@r;
            color: #666;
          }
          strong {
            float: right;
            line-height: 42/@r;
            padding-right: 16/@r;
            font-size: 14/@r;
            color: #666;
          }
        }
      }
    }
    .all{
      margin-top: 10/@r;
      float: right;
      margin-right: 6/@r;
      span{
        font-size: 14/@r;
        color: #666;
      }
      strong{
        color: red;
        font-weight: bold;
      }
      div:nth-of-type(1){
        font-size: 16/@r;
      }
      div:nth-of-type(2){
        padding: 10/@r 0;
        font-size: 18/@r;
      }
    }
  }

  .remarks{
    margin-top: 10/@r;
    background: white;
    div{
      height: 30/@r;
      border-bottom: 1/@r solid #eee;
    }
    div:last-child{
      border: none;
    }
    span{
      margin-left: 12/@r;
      font-size: 16/@r;
      line-height: 30/@r;
    }
    i{
      line-height: 30/@r;
      float: right;
      margin-right: 8/@r;
    }
    p{
      color: #ddd;
      float: right;
      margin-right: 8/@r;
      font-size: 12/@r;
      line-height: 30/@r;
    }
  }
  .submit{
    position:fixed;
    bottom: 0;
    height: 2rem;
    width: 100%;
    z-index: 1;
    background-color: rgba(61, 61, 63, 0.9);
    .right{
      float: right;
      width: 28%;
      background: lightcoral;
      height: 100%;
      text-align: center;

      span{
        font-weight: bold;
        font-size: 14/@r;
        line-height: 50/@r;
        color: white;
      }
    }
    .left{
      float: left;
      line-height: 2rem;
      padding-left: 10/@r;
      font-size: 16/@r;
      color: white;
      span{
        padding-left:1/@r;
        font-size: 17/@r;
        font-weight: bold;
        color: lightcoral;
      }
    }
  }
  .remarks_pop{
    visibility: hidden;
    position: fixed;
    bottom:-100%;
    width: 100%;
    background: white;
    transition: .2s;
    z-index: 2;
    .title{
      width: 100%;
      background: #f3f5f7;
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
    textarea{
      font-size: 14/@r;
      width: 100%;
      padding: 0;
      height: 130/@r;
      border: none;
      letter-spacing: 1/@r;
    }
  }
  .remarks_active{
    visibility: visible;
    bottom: 0;
  }
  .wrap_active{
    visibility: visible;
    opacity: 0.5;
  }
  .pop_integral{
    .pop_main{
      .img{
        margin-top: 50/@r;
        text-align: center;
      }
      p{
        padding-top: 10/@r;
        font-size: 16/@r;
        line-height: 36/@r;
        color: #666;
      }
    }
  }
  .pop_r{
    background: #eee;
    ul{
      background: white;
      margin-bottom: 10/@r;
      li{
        position: relative;
        width: 100%;
        height: 80/@r;
        padding-left: 20/@r;
        border-bottom: 0.04rem solid #e4e4e4;
        box-sizing: border-box;
        .top{
          p{
            font-size: 16/@r;
            font-weight: bold;
            padding-top: 10/@r;
            line-height: 30/@r;
            width: 80%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        .bottom{
          font-size: 14/@r;
          color: #999;
          p{
            line-height: 30/@r;
            display: inline;
          }
        }
        .right{
          position: absolute;
          z-index: 1;
          top: 30%;
          right: 10/@r;
          .icon-xuanzhong{
              color: lightcoral;
          }
        }
      }
    }
    .add{
      background: white;
      padding-left: 20/@r;
      height: 50/@r;
      border-bottom: 0.04rem solid #e4e4e4;
      span{
        font-size: 16/@r;
        line-height: 50/@r;
      }
      .r{
        float: right;
        display: flex;
        height: 100%;
        padding-right: 5/@r;
        align-items: center;
        i{
          color: #999;
          padding-left: 5/@r;
          line-height: 50/@r;
          font-size: 12/@r;
        }
      }
    }
  }

  .pop_ad{
    background: #eee;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    ul{
      margin-top: 10/@r;
      width: 100%;
      background: white;
      li{
        padding-left: 8/@r;
        border-bottom: 0.04rem solid #e4e4e4;
        box-sizing: border-box;
        width: 100%;
        height: 40/@r;
        span{
          font-weight: bold;
          font-size: 14/@r;
          line-height: 40/@r;
        }
        input{
          float: right;
          width: 84%;
          height: 38/@r;
          margin-top: 1/@r;
          outline: none;
          font-size: 14/@r;
        }
      }
    }
    button{
      width: 90%;
      margin: 15/@r auto;
      display: block;
      font-size: 18/@r;
      padding: 6/@r;
      background: lightcoral;
      border-radius: 8/@r;
      color: white;
    }
  }
</style>
