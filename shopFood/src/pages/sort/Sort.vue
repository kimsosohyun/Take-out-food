<template>
    <div class="sort">
      <Header :title="foodTypes[type].title">
        <section class="h_back" @click="$router.go(-1)" slot="left">
          <i class="iconfont icon-jiantou2"></i>
        </section>
      </Header>


      <ul class="lists">
       <!--<router-link tag="li"  v-for="(shop,index) in searchList" :key="index"  :to="{path:'/shop', query:{id:shop.id}}">-->
        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
         <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>


        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>
        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

        <router-link tag="li" :to="{path:'/shop', query:{id:2}}">
          <img src="https://fuss10.elemecdn.com/e/ec/56a60c34fb08fe376af37aae9f3c3jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          <div class="shop_left">
            <h3>奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子奶香铺子</h3>
            <Star :score="4.7" :star="'sortStar'"/>
            <span>4.8</span>
            <span>月售5000单</span>
            <span>￥20起送/配送费约￥12</span>
          </div>


          <div class="shop_right">
            <div>24分钟送达</div>
            <span>1.2公里</span>
          </div>
        </router-link>

      </ul>
    </div>
</template>

<script>
  import Header from "../../components/header/Header";
  import Star from  "../../components/star/Star"
  import {mapState} from "Vuex";
  export default {
    name: 'Sort',
    components:{
      Header,Star
    },
    mounted(){
      this.$store.dispatch("getFoodTypes");//避免在此页面刷新，FoodTypes数据消失
    },
    data(){
      return {
        type:this.$route.params.type
      }
    },
    computed:{
      ...mapState(["foodTypes"])
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .sort{
    background: rgb(240, 240, 240);
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

  .lists{
    margin-top: 10/@r;
    padding-bottom: 54/@r;
    li{
      background: white;
      margin-bottom: 6/@r;
      position: relative;
      border-radius: 8/@r;
      left: 2%;
      width: 96%;
      height: 90/@r;
      overflow: hidden;
      img{
        margin-left: 10/@r;
        margin-top: 10/@r;
        border: 1px solid #e4e4e4;
        border-radius: 5%;
        float: left;
        padding: 5/@r;
        width: 50/@r;
        height: 40/@r;
      }
      .shop_left{
        h3{
          width: 60%;
          top: 10/@r;
          position: absolute;
          font-size: 16/@r;
          left: 84/@r;
          font-weight: bold;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap
        }
        span{
          color: #999;
          position: absolute;
          font-size: 12/@r;
        }
        span:nth-of-type(1){
          top: 32/@r;
          font-size: 12/@r;
          left: 84/@r;
          color: lightcoral;
          font-weight: bold;
        }
        span:nth-of-type(2){
          top: 53/@r;
          left: 84/@r;
        }
        span:nth-of-type(3){
          top: 74/@r;
          left: 84/@r;
        }
      }
      .shop_right{
        font-size: 12/@r;
        div{
          padding: 1/@r;
          position: absolute;
          top: 32/@r;
          right: 10/@r;
          background: lightcoral;
          border: 1px solid lightcoral;
          color: white;
        }
        span{
          padding: 1/@r;
          position: absolute;
          top: 54/@r;
          right: 10/@r;
          color: lightcoral;
        }
      }

    }
  }
</style>
