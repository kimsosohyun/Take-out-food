<template>
    <div>
      <ul class="shopLists" v-if="shopLists.length">
        <li v-for="(shop,index) in shopLists" :key="index"  @click="$router.push('/shop?id='+shop.id)"  >
          <img v-lazy="shop.image_path" alt="">
          <div class="shop_left">
            <div class="brand">品牌</div>
            <h3>{{shop.name}}</h3>
            <Star :score="shop.rating" :star="'mainStar'"/>
            <span>{{shop.rating}}</span>
            <span>月售{{shop.recent_order_num}}单</span>
            <span>￥{{shop.float_minimum_order_amount}}起送/配送费约￥{{shop.float_delivery_fee}}</span>
          </div>

          <div class="shop_right">
            <ul>
              <li>保</li>
              <li>准</li>
              <li>票</li>
            </ul>
            <div>{{shop.delivery_mode.text}}</div>
            <span>准时达</span>
          </div>
        </li>
      </ul>

      <div v-else  class="back" >
        <li v-for="() in 6">
        </li>
      </div>

    </div>
</template>

<script>
  import {mapState} from "vuex";
  import Star from "../star/Star"
  export default {
    name: 'ShopList',
    components:{
      Star
    },
    computed:{
      ...mapState(["shopLists"])
    }
  }
</script>

<style scoped lang="less">
@r:25rem;
.shopLists{
  margin-top: 14/@r;
  margin-bottom: 54/@r;
  li{
    margin-bottom: 20/@r;
    position: relative;
    width: 100%;
    height: 100/@r;
    img{
      margin-left: 2/@r;
      border: 1px solid #e4e4e4;
     float: left;
      padding: 5/@r;
      width: 82/@r;
      height: 82/@r;
    }
    .shop_left{
      .brand{
        position: absolute;
        top: 2/@r;
        left: 100/@r;
        background: yellow;
        display: block;
        padding: 2/@r;
        font-size: 14/@r;
        text-align: center;
        width: 30/@r;
        height: 16/@r;
        font-weight: bold;
        line-height: 16/@r;
        font-family: "Adobe 黑体 Std";
      }
      h3{
        width: 160/@r;
        top: 3/@r;
        position: absolute;
        font-size: 18/@r;
        left: 138/@r;
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
        top: 30/@r;
        font-size: 14/@r;
        left: 182/@r;
        color: lightcoral;
        font-weight: bold;
      }
      span:nth-of-type(2){
        top: 56/@r;
        left: 106/@r;
      }
      span:nth-of-type(3){
        top: 80/@r;
        left: 104/@r;
      }
      ul{
          position: absolute;
          top: 0/@r;
          left: 0/@r;
          width: 90/@r;
          li{
            float: left;
            width: 14/@r;
            height: 14/@r;
          }
      }
    }
    .shop_right{

      font-size: 12/@r;
      ul{
        position: absolute;
        right: 6/@r;
        top: 12/@r;
        li{
          color: #999;
          float: left;
          padding: 2/@r;
          width: 12/@r;
          height: 12/@r;
          border: 1px solid #ddd;
        }
      }
      div{
        padding: 1/@r;
        position: absolute;
        top: 56/@r;
        right: 48/@r;
        background: lightcoral;
        border: 1px solid lightcoral;
        color: white;
      }
      span{
        padding: 1/@r;
        position: absolute;
        top: 56/@r;
        right: 4/@r;
        color: lightcoral;
        border: 1px solid lightcoral;
      }
    }
  }
}
.back{
  li{
    width: 100%;
    height: 100/@r;
    margin-bottom: 20/@r;
    background: url("./img/shop_back.svg");
    background-size: cover;
  }
}
</style>
