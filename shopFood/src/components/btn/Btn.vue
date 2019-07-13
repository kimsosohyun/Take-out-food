<template>
  <div class="btn">
    <transition name="transform">
      <div v-if="f_item.count" class="show">
        <button  class="dec" @click.stop="dec(f_item)">
          <i class="iconfont icon-jian1"></i>
        </button>
        <span>{{f_item.count}}</span>
      </div>
    </transition>

    <button class="add" @click.stop="add(f_item)">
      <i class="iconfont icon-webicon308"></i>
    </button>
  </div>
</template>

<script>
  import Vue from  "vue";
  export default {
    name: 'Btn',
    props:{
      f_item:Object
    },
    methods:{
      add(food){
        if (food.count){
          food.count++;
        } else {
          Vue.set(food,"count",1);
          //food.count=1;没有相应的数据绑定功能
          //一个有数据绑定功能的数据下的新定义的子数据需要有数据绑定功能。
          //food有数据绑定，food.count没有。
        }
      },
      dec(food){
        if (food.count){
          food.count--;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .btn{
    height: 24/@r;
    position: absolute;
    bottom: 11/@r;
    right: 6/@r;
    line-height: 24/@r;
    text-align: center;
    .show{
      display: inline-block;
    }
    .add{
      position: relative;
      top: 1/@r;
      i{
        color: lightcoral;
        font-size: 24/@r;
      }
    }
    span{
      position: relative;
      left: 4/@r;
      bottom: 2/@r;
      font-size: 16/@r;
      color:#333;
    }
    .dec{
      position: relative;
      left: 8/@r;
      i{
        color: lightcoral;
        font-size: 21/@r;
      }
    }
    .transform-enter, .transform-leave-to { //进入前，离开后
      opacity: 0;
      transform: translateX(30/@r) rotate(0deg);
    }
    .transform-leave, .transform-enter-to { //进入后，离开前
      opacity: 1;
      transform: translateX(0/@r) rotate(360deg);
    }
    .transform-enter-active ,.transform-leave-active
    {
      transition: all .5s
    }
  }
</style>
