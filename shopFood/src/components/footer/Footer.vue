<template>
    <ul >
      <li :class="{on:ifpath('/main')}" v-on:click="click('/main')" >
        <span class="f_icon">
          <i class="iconfont icon-dianpu"></i>
        </span>
        <span class="f_font">店铺</span>
      </li>

      <li :class="{on:ifpath('/search')}" v-on:click="click('/search')">
        <span class="f_icon">
          <i class="iconfont icon-search"></i>
        </span>
        <span class="f_font">搜索</span>
      </li>

      <li :class="{on:ifpath('/order')}" v-on:click="click('/order')">
        <span class="f_icon">
          <i class="iconfont icon-dingdan"></i>
        </span>
        <span class="f_font">订单</span>
      </li>

      <li :class="{on:ifpath('/personal')}" v-on:click="click('/personal')">
        <span class="f_icon">
          <i class="iconfont icon-geren"></i>
        </span>
        <span class="f_font">我的</span>
      </li>
    </ul>
</template>

<script>

  export default {
    name: 'Footer',
    methods:{
      ifpath(path){
        return this.$route.path===path;
      },
      click(path){
        this.$router.replace(path);
      }
    }
  }
</script>

<style scoped lang="less">
  @rem:25rem;
ul{
  border-top: 1/@rem solid #e4e4e4;
  width: 100%;
  position:fixed;
  left:0;
  right:0;
  bottom: 0;
  z-index:100;
  height:54/@rem;
  background-color:#fff;
  display: flex;
}
li{
  display: flex;
 flex-direction: column;  /*设置主轴方向为竖直方向,让两行span能竖直排立*/
  flex: 1;
  color:#999999;
  align-items: center; /* 设置侧轴上（水平方向）的元素排列方式*/
}
.f_icon{
  padding: 5/@rem;
}
i{
  font-size: 20/@rem;
}
.f_font{
  padding-top: 2/@rem;
  font-size: 14/@rem;
}
 .on{
   color:lightcoral;
 }
</style>
