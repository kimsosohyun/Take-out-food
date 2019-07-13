<template>
    <div class="header">
      <slot name="left"></slot>
      <!--<a class="h_search">-->
        <!--<i class="iconfont icon-sousuo"></i>-->
      <!--</a>-->
      <div class="h_title">
        <span>{{title}}</span>
      </div>
      <!--<a class="h_login">-->
        <!--<span>登陆</span>-->
      <!--</a>-->
      <slot name="right"></slot>

    </div>
</template>

<script>
  export default {
    name: 'Header',
    props:{
      title:String
    }
  }
</script>

<style scoped lang='less'>
  @rem:25rem;//这个应该是设计稿的宽度除以15，fontSize是模拟手机端的宽度/15
  .header{
    position: relative;
    width: 100%;
     height: 45/@rem;
    background: lightcoral;
    .h_title{
      width: 100%;
      float: left;
      text-align: center;
    }
    .h_title span{
      line-height: 45/@rem;
      font-size: 20/@rem;
      margin: 0 auto;
      width: 60%;
      display: block;
      color: white;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap
    }
  }


</style>
