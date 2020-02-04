<template>
  <div class="pop" :class="{popActive:show}">
    <Header :title="title">
      <section class="h_back" @click="close" slot="left">
        <i class="iconfont icon-jiantou2"></i>
      </section>
    </Header>
    <slot name="main"></slot>

  </div>
</template>

<script>
  import Header from "../header/Header"
  export default {
    name: 'Toast1',
    props:{
      show:Boolean,
      close:Function,
      title:String
    },
    components:{
      Header
    }
  }
</script>

<style scoped lang="less">
@r:25rem;
.pop{
  position: fixed;
  top: 0;
  transition: .2s;
  z-index: 2;
  right: -100%;
  visibility: hidden;
  width: 100vw;
  height: 100vh;
  background: white;
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
}
.popActive{
  visibility: visible;
  right: 0;
}
</style>
