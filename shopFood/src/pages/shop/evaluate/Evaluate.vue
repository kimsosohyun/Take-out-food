<template>
    <div class="evaluate">
      <div class="score">
        <div class="common">
          <strong>{{info.score}}</strong>
          <span>综合评分</span>
        </div>
        <div class="withStar">
          <div class="service">
            <Star :score="info.serviceScore" :star="'evaStar'"/>
            <span>服务态度</span>
            <strong>{{info.serviceScore}}</strong>
          </div>
          <div class="food">
            <Star :score="info.foodScore" :star="'evaStar'"/>
            <span>商品评分</span>
            <strong>{{info.foodScore}}</strong>
          </div>
          <div class="getFood">
            <span>送达时间:</span>
            <i>{{info.deliveryTime}}分钟</i>
          </div>
        </div>
      </div>

      <div class="eva_list">
        <div class="select">
          <button class="all" @click="toggleSelect(2)" :class="{selected:ifGood===2}">
            <span>全部{{all}}</span>
          </button>
          <button class="good" @click="toggleSelect(0)" :class="{selected:ifGood===0}">
            <span>满意{{good}}</span>
          </button>
          <button class="bad" @click="toggleSelect(1)" :class="{selected:ifGood===1}">
            <span>不满意{{all-good}}</span>
          </button>
        </div>
        <div class="showContent" :class="{on:ifContent}" @click="toggleContent">
          <i class="iconfont icon-gouxuan"></i>
          <span>只看有内容的评价</span>
        </div>
        <div class="list" ref="list">
          <ul>
            <li v-for="(item,index) in filterArr" :key="index">
              <div class="time">
               {{item.rateTime | formateDate('YYYY-MM-DD')}}
                <!--第二个参数是函数，可以带有参数调用-->
                <!--当你需要的数据格式不是后端传过来的数据格式时，这时就可以使用过滤器-->
                <!--过滤器的执行顺序是从左到右，左边返回的值是下一个过滤器中的value，也就是可以串联多个过滤器-->
                <!--在filters定义formateDate这个函数方法return你需要显示的值-->
              </div>
              <div class="avatar">
                <img :src="item.avatar" alt="">
              </div>
              <div class="name">
                {{item.username}}
              </div>
              <div class="star">
                <Star :score="item.score" :star="'listStar'"/>
                <span>{{item.score}}</span>
              </div>
              <p>{{item.text}}</p>
              <div v-if="item.recommend.length>0" class="thumbs-up">
                <i class="iconfont icon-dianzan"></i>
                <span v-for="(rec,index) in item.recommend" :key="index">{{rec}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import  Star  from "../../../components/star/Star"
  import BScroll from 'better-scroll'
  import {mapState} from "vuex"
  export default {
    name: 'Evaluate',
    data(){
      return {
        ifGood:2, //2显示全部，0代表显示好的，1显示坏的
        ifContent:true
      }
    },
    components:{
      Star
    },
    mounted(){
      this.$store.dispatch("getEvaluate");
    },
    filters:{
      formateDate(date, pattern) { //函数的第一个参数为自动传过来的数据，不需要手动传入
        if (!pattern) {
          pattern = 'YYYY-MM-DD hh:mm:ss';
        }
        let d = new Date(date),
          str = pattern,
          types = ['YYYY', 'MM', 'DD', 'hh', 'mm', 'ss'],
          dates = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];

        for (let i = 0; i < types.length; i++) {
          str = str.replace(types[i], (dates[i] < 10 ? ('0' + dates[i]) : dates[i]));
        }
        return str;
      }
    },
    computed:{
      ...mapState(["evaluate","info"]),
      filterArr(){
        const {ifContent,evaluate,ifGood}=this;
        return evaluate.filter((item)=>{
          if (ifContent){
            if ( ifGood===2) {
              return item.text
            }
            else if(ifGood===1){
              return item.text&&item.rateType===1
            }
            else{
              return item.text&&item.rateType===0
            }
          }
          else {
            if ( ifGood===2) {
              return true
            }
            else if(ifGood===1){
              return item.rateType===1
            }
            else{
              return item.rateType===0
            }
          }
        })
      },
      all(){
        const {ifContent,evaluate}=this;
        return evaluate.filter((item)=>{
          if (ifContent) {
            return item.text
          }
          else
          {
            return true
          }
        }).length
      },
      good(){
        const {ifContent,evaluate}=this;
        return evaluate.filter((item)=>{
          if (ifContent) {
            return item.text&&item.rateType===0
          }
          else
          {
            return item.rateType===0
          }
        }).length
      }
    },
    watch:{
      evaluate(){
        this.$nextTick(()=>{
          this.scroll=new BScroll(this.$refs.list,{
            click:true
          })
        })
      }
    },
    methods:{
      toggleSelect(x){
        this.ifGood=x;
      },
      toggleContent(){
        this.ifContent=!this.ifContent;
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .evaluate{
    background-color: rgb(245, 245, 245);
    position: relative;
    .score{
      background: white;
      padding-bottom: 14/@r;
      padding-top: 14/@r;
      overflow: hidden;
      .common{
        width: 140/@r;
        float: left;
        text-align: center;
        strong{
          font-size: 26/@r;
          display: block;
          line-height: 36/@r;
          color: lightcoral;
        }
        span{
          font-size:14/@r;
        }
      }
      .withStar{
        float: left;
        margin-left: 26/@r;
        .service,.food{
          span{
            font-size: 14/@r;
            color: #666;
          }
          strong{
            font-size: 14/@r;
            color: lightcoral;
          }
        }
        .service{
          margin-top:-9/@r ;
        }
        .getFood{
          font-size: 14/@r;
          padding-top: 8/@r;
          span{
            color: #666;
          }
          i{
            padding-left: 8/@r;
          }
        }
      }
    }
    .eva_list{
      padding-left: 12/@r;
      margin-top: 10/@r;
      background: white;
      .select{
        padding-top: 8/@r;
        button{
          height: 26/@r;
          background:  rgba(240 ,128, 128,0.4);
          margin-right: 6/@r;
          line-height: 26/@r;
          text-align: center;
          padding-left: 10/@r;
          padding-right: 10/@r;
          span{
            font-size: 14/@r;
            color:white;
          }
        }
        .selected{
          background:  rgba(240 ,128, 128,0.9);
          span{
            color:#FFD700;
          }
        }
      }
      .showContent{
        margin-top: 10/@r;
        padding-bottom: 10/@r;
        i{
          color: #ddd;
        }
        span{
          font-size: 14/@r;
        }
      }
      .on{
        i{
          color: lightcoral;
        }
      }
      .list{
        height: 450/@r;
        overflow: hidden;
        ul{

          padding-top: 4/@r;
          li{
            margin-top: 10/@r;
            width: 100%;
            min-height: 100/@r;
            box-sizing: border-box;
            border-bottom: .133333vw solid #eee;
            .avatar{
              float: left;
              border-radius: 50%;
              overflow: hidden;
              width: 30/@r;
              height: 30/@r;
              background: black;
              img{
                width: 30/@r;
                height: 30/@r;
              }
            }
            .name{
              float: left;
              font-size: 14/@r;
              padding: 5/@r;
              padding-top: 2/@r;
            }
            .star{
              position: relative;
              top: 10/@r;
              left: -60/@r;
              span{
                font-size:12/@r ;
                color: lightcoral;
              }
            }
            p{
              font-size: 14/@r;
              padding-top: 16/@r;
              padding-left: 30/@r;
              padding-right:30/@r ;
              line-height: 20/@r;
              padding-bottom: 8/@r;
            }
            .thumbs-up{
              padding-left: 30/@r;
              padding-bottom: 10/@r;
              i{
                color: orange;
              }
              span{
                font-size: 14/@r;
                background:rgba(240 ,128, 128,0.2);
                padding: 6/@r;
                color: #666;
                display: inline-block;
                margin-left: 2/@r;
                margin-top: 2/@r;
              }
            }
            .time{
              float: right;
              font-size: 12/@r;
              padding-right: 10/@r;
              color:rgb(153, 153, 153);
            }
          }
        }
      }
    }

  }

</style>
