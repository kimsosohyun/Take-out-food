<template>
    <div>
      <ShopHeader/>

      <div class="tab">
        <router-link class="food" to="/shop/food" replace>
            <span :class="{on:$route.path==='/shop/food'}">点餐</span>
        </router-link>
        <router-link class="evaluate" to="/shop/evaluate" replace>
          <span :class="{on:$route.path==='/shop/evaluate'}">评价</span>
        </router-link>
        <router-link class="info" to="/shop/info" replace>
          <span :class="{on:$route.path==='/shop/info'}">商家</span>
        </router-link>
      </div>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
</template>

<script>
  import  ShopHeader from "../../components/shopHeader/ShopHeader"
  export default {
    name: 'Shop',
    components:{
      ShopHeader
    },
    computed:{

    },
    mounted(){
      document.documentElement.scrollTop?document.documentElement.scrollTop=0:document.body.scrollTop=0;
      this.$store.dispatch("getInfo");
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
.tab{
  font-size:14/@r;
  width: 100%;
  display: flex;
  text-align: center;
  margin-top: 16/@r;
  padding-bottom: 11/@r;
  border-bottom: 1px solid #e4e4e4;
  .on{
    border-bottom: 2px solid lightcoral;
    color: black;
    font-weight: bold;
  }
  span{
      padding: 6/@r;
      letter-spacing: 2/@r;
  }
  .food{
    flex:1;
  }
  .evaluate{
    flex:1;
  }
  .info{
    flex: 1;
  }
}
</style>
