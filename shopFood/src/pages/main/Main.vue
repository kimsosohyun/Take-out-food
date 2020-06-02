<template>
  <div class="main">
    <Header :title="address">
      <router-link to="./search" class="h_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>


      <router-link  :to="!user._id?'/login':'/userInfo'" class="h_login" slot="right">
          <span v-if="!user._id" >登陆|注册</span>
          <i v-else class="iconfont icon-denglu"></i>
      </router-link>


    </Header>

    <div class="swiper-container" v-if="types.length">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(inlineArr,index1) in foodTypes" :key="index1">
          <ul>
            <li v-for="(data,index2) in inlineArr" :key="index2" @click="to_sort(index2,index1)">
              <img :src="imgUrl+data.image_url" alt="">
              <span>{{data.title}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <div v-else>
      <img src="./img/msite_back.svg" alt="">
    </div>

    <div class="shop_list">
      <div class="shop_title" >
        <i class="iconfont icon-xuanxiang"></i>
        <span>附近商家</span>
      </div>

      <ShopList/>
    </div>




  </div>
</template>

<script>
  import  Swiper from  "swiper"
  import  "swiper/dist/css/swiper.min.css"
  import Header from "../../components/header/Header"
  import ShopList from  "../../components/shopList/ShopList"
  import {mapState} from "vuex"
  export default {
    name: 'Main',
    data(){
      return {
        imgUrl:"https://fuss10.elemecdn.com"
      }
    },
    components:{
      Header,ShopList
    },
    mounted(){

      this.$store.dispatch("getFoodTypes")
      this.$store.dispatch("getShopLists")

      // console.log(this.foodTypes)
      // new Swiper('.swiper-container', {
      //   loop: true,
      //   pagination: {
      //     el: '.swiper-pagination',
      //   }
      // }) //在初始化的时候运行，这时候foodTypes还没有数据，滑块在这时候调用就不能正常运行。
    },
    computed:{
      ...mapState(["user"]),
      address(){
        return this.$store.state.address.toString();
      },
      types(){
        return this.$store.state.foodTypes;
      },
      foodTypes(){
        var types=this.types;
        if (types.length>0){
          var wrapArr=[];
          var inlineArr=[];
          types.forEach(type=>{// types是一个整的包含N个数据的数组，
            // 需要分成多个 一组只有8个数据 的小数组inlineArr，这些小数组都
            //存在大数组wrapArr内部
            if (inlineArr.length===8){
              inlineArr=[];
            }
            if (inlineArr.length===0){
              wrapArr.push(inlineArr);
            }
            inlineArr.push(type);
          })
          return wrapArr;
        }
      }
    },
    methods:{
      to_sort(index2,index1){
        var type=index1*8+index2;
        this.$router.push("/sort/"+type);
      }

    },
    watch:{
      foodTypes (value) {//监视数据的变化，在监视的数据发生变化调用
        this.$nextTick(() => {//在数据发生变化后，结构发生相应变化后调用
          //这时foodTypes变得有值，而且滑块也渲染成功。
          new Swiper('.swiper-container', {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .main{
    background: #eee;
  }
  .swiper-container {
    background: white;
    border-top: 1/@r solid #e4e4e4;
    position: relative;
    .swiper-slide {
      margin-bottom: 14/@r;
      padding-bottom: 6/@r;
    }
    ul {
      width: 100%;
      li {
        text-align: center;
        font-family: "Adobe 黑体 Std";
        float: left;
        width: 25%;
        margin-top: 16/@r;
        margin-bottom: 8/@r;
        img {
          width: 48/@r;
          display: block;
          margin: 0 auto;
        }
        span {
          font-size: 14/@r;
        }
      }
    }
  }
  .shop_list{
    margin-top: 16/@r;
    width: 100%;
    background: white;
    .shop_title{
      color: #999;
      padding-left: 10/@r;
      i{
        font-size: 16/@r;
      }
      span{
        font-size: 16/@r;
      }
    }
  }
  .h_search{
    position: absolute;
    top: 0;
    left: 0;
    width: 45/@r;
    height: 45/@r;
    display:block;
    text-align: center;
    i{
      color: white;
      font-size: 28/@r;
      line-height: 45/@r;
    }
  }
  .h_login{
    position: absolute;
    top: 0;
    right: 0;
    width: 45/@r;
    height: 45/@r;
    display:block;
    text-align: center;
    i{
      color: white;
      font-weight: bold;
      font-size: 28/@r;
      line-height: 45/@r;
    }
    span{
      display: block;
      height: 45/@r;
      margin-left: -25/@r;
      width: 70/@r;
      color: white;
      font-weight: bold;
      font-size: 14/@r;
      line-height: 45/@r;
    }
  }
</style>
