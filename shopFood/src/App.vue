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
    var that=this;
    window.init = function() {
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            var  data=result.rectangle.split(";")
            var longitude=Number(data[0].split(",")[0]),latitude=Number(data[0].split(",")[1]);
            console.log(longitude,latitude)
            that.$store.dispatch("getAddress",{latitude,longitude})
            that.$store.dispatch("autoLogin")
          }
          else {
            alert("定位失败，将采用默认地址进行商家搜索");
            var longitude=114.3701,latitude=30.5077;
            that.$store.dispatch("getAddress",{latitude,longitude})
            that.$store.dispatch("autoLogin")
          }
        })
      })
    }
  },
  // mounted(){
  //  console.log(Boolean(this.$route.meta.showFooter)===false)
  // 在login路由下 this.$route.meta.showFooter为undefined,
  //   但是在作为判断条件的时候会自动调用Boolean()函数转为布尔值进行判断
  // },
  components:{
    Footer
  },
  // created(){
  //   //在页面刷新时将vuex里的信息保存到localStorage里
  //   window.addEventListener("beforeunload",()=>{
  //     localStorage.setItem("messageStore",JSON.stringify(this.$store.state))
  //   })
  //
  //   //在页面加载时读取localStorage里的状态信息
  //   localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
  // }
}
</script>

<style>

</style>
