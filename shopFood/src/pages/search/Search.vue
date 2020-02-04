<template>
  <div>
    <div class="top_search">
      <Header title="好吃的快出来！"/>

      <div class="search">
        <form @submit.prevent="submit" action="#">
          <!--阻止默认提交到action的事件-->
          <input type="text" placeholder="请输入商家或美食名称" v-model="text">
          <input type="submit" >
        </form>
      </div>
    </div>
    <ul class="lists" v-if="searchList.length">
      <router-link tag="li"  v-for="(shop,index) in searchList" :key="index"  :to="{path:'/shop', query:{id:shop.id}}">
        <!--另外query几种写法：1.:to="'/shop?id='+shop.id"  2.:to="`/shop?id=${shop.id}`"
        3.:to="{path:'/shop', query:{id:shop.id}}"-->
        <!--对于params来讲   :to="{path:'/shop', params:{id:shop.id}} 这种形式是不可取的，path已经被固定不能再加上params的参数了"
        写法：:to="'/shop/food/'+shop.id"    :to="{name:'Food', params:{id:shop.id}}  :to="`/shop/food/id=${shop.id}`"
        -->

        <img :src="shop.image_path" alt="">
        <div class="shop_left">
          <h3>{{shop.name}}</h3>
          <span>{{shop.rating}}</span>
          <span>月售{{shop.recent_order_num}}单</span>
          <span>￥{{shop.float_minimum_order_amount}}起送/配送费约￥{{shop.float_delivery_fee}}</span>
        </div>
      </router-link>
    </ul>
    <div class="noData" v-if="!searchList.length&&startSearch">
      <img src="data:image/png;base64,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" alt="">
      <span class="t">附近没有搜索结果</span>
      <span class="b">换个关键词试试吧</span>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/Header"
  import  {mapState} from "vuex"
  export default {
    name: 'Search',
    data(){
      return {
        text:"",
        startSearch:false
      }
    },
    components:{
      Header
    },
    methods:{
      submit(){
        // this.startSearch=false;
        const text=this.text.trim();
        if (!text){
          return
        }
        else{
          var data={  // this.$store.dispatch() 只能传两个参数！第二个参数为要带的数据
            text:text,
            callback:()=>{
              console.log("a")
              this.startSearch=true;
            }
          }
          this.$store.dispatch("searchList",data)
        }
      }
    },
    computed:{
     ...mapState(["searchList"]),
    },
    watch:{
      text(value){
        if (!value&&!this.searchList.length) {
          this.startSearch=false;
        }
      }
    }


  }
</script>

<style scoped lang="less">
@r:25rem;
  .search{
    margin-top: 10/@r;
    width: 100%;
    font-size: 16/@r;
    input:nth-of-type(1){
      width: 76%;
      height: 40/@r;
      background: #eee;
      margin: 2%;
      text-indent: 4/@r;
    }
    input:nth-of-type(2){
      color: white;
      width: 18%;
      background: lightcoral;
      letter-spacing: 2/@r;
      height: 40/@r;
    }
  }
.lists{
  margin-top: 14/@r;
  padding-bottom: 54/@r;
  li{
    margin-bottom: 10/@r;
    position: relative;
    width: 100%;
    overflow: hidden;
    img{
      margin-left: 10/@r;
      border: 1px solid #e4e4e4;
      float: left;
      padding: 5/@r;
      width: 62/@r;
      height: 62/@r;
    }
    .shop_left{
      h3{
        top: 6/@r;
        position: absolute;
        font-size: 16/@r;
        left: 90/@r;
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
        top: 34/@r;
        font-size: 12/@r;
        left: 96/@r;
        color: lightcoral;
        font-weight: bold;
      }
      span:nth-of-type(2){
        top: 34/@r;
        left: 126/@r;
      }
      span:nth-of-type(3){
        top: 56/@r;
        left: 96/@r;
      }
    }
  }
}
  .noData{
    padding-top: 30/@r;
    text-align: center;
    img{
      width: 90/@r;
      height:66/@r ;
    }
    .t{
      line-height: 28/@r;
      font-size: 14/@r;
      display: block;
      color: #666;
    }
    .b{
      font-size: 12/@r;
      color: #999;
    }
  }
</style>
