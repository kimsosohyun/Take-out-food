<template>
    <ul :class="star">

     <li v-for="(star,index) in starArr" :key="index" :class="star">
     </li>
    </ul>
</template>

<script>
  export default {
    name: 'star',
    props:{
      score:Number, //得分
      star:String  //星星的class名，通过星星所用地方来决定星星的大小样式。
    },
    computed: {

      starArr () {
        var arr = [];
        var score = this.score;
        var intScore=Math.floor(score)
        for (var i=0;i<intScore;i++){
          arr.push("on")
        }
        if (score-intScore>=0.5){
          arr.push("half")
        }
        while (arr.length<5){//全星和半星都加完了还不够就加灰星
          arr.push("off")
        }
        return arr;
      }
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .mainStar{
    margin-top: 29/@r;
    margin-left: 105/@r;
    li{
      float: left;
      width: 14/@r;
      height: 14/@r;
    }
  }
  .evaStar{
    display: inline-block;
    li{
      float: left;
      width: 14/@r;
      height: 14/@r;
    }
  }
  .listStar{
    display: inline-block;
    li{
      float: left;
      width: 10/@r;
      height: 10/@r;
    }
  }
  .sortStar{
    display: inline-block;
    margin-top: 33/@r;
    margin-left: 34/@r;
    li{
      float: left;
      width: 10/@r;
      height: 10/@r;
    }
  }
  .on{
    background:url("./img/star_on.png") no-repeat;
    background-size: cover;
  }
  .off{
    background:url("./img/star_off.png") no-repeat;
    background-size: cover;
  }
  .half{
    background:url("./img/star_half.png") no-repeat;
    background-size: cover;
  }
</style>
