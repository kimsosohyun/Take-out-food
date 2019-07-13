<template>
  <div id="app">
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"/>
    <!--$route包含本页面的一些信息，$router包含一些有关Link的方法
    v-show 节点一直都在，用于频繁使用，使用样式display控制
    -->
    <!--<Footer v-if="$route.meta.showFooter"/>-->
    <!--v-if 节点在需要的时候才创造，不需要的时候就没有这个节点-->
  </div>
</template>

<script>
  import Footer from "./components/footer/Footer"
export default {
  name: 'App',
  mounted(){
      // var that=this;
      // navigator.geolocation.getCurrentPosition(function(position){
      //   var longitude=position.coords.longitude;
      //   var latitude=position.coords.latitude;
      //   //30.5077 114.3701
      //     that.$store.dispatch("getAddress",{latitude,longitude})
      //
      // }
      // ,function(err){
      //     var longitude=114.3701,latitude=30.5077;
      //     that.$store.dispatch("getAddress",{latitude,longitude})
      //     alert("定位超时，将采用默认地址进行商户搜索")
      // },
      // {
      //   timeout:1000
      // })

    var longitude=114.3701,latitude=30.5077;
    this.$store.dispatch("getAddress",{latitude,longitude})
    this.$store.dispatch("autoLogin")
  },
  // mounted(){
  //  console.log(Boolean(this.$route.meta.showFooter)===false)
  // 在login路由下 this.$route.meta.showFooter为undefined,
  //   但是在作为判断条件的时候会自动调用Boolean()函数转为布尔值进行判断
  // },
  components:{
    Footer
  }
}
</script>

<style>

</style>
