<template>
  <div class="toast">
    <div class="wrap">

    </div>
    <div class="inner">
      <img src="./img/warning3.jpg" alt="">
      <strong>{{infor}}</strong>
      <button @click="back">确认</button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Toast',
    props:{
      infor:String,
      back:Function
    }
  }
</script>

<style scoped lang="less">
  @r:25rem;
.wrap{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom:0;
  background:#aaa;
  opacity: 0.6;
  z-index: 1;
}
  .inner{
    border-radius: 10%;
    border:1px solid black;
    box-sizing: border-box;
    overflow: hidden;
    background: white;
    position: absolute;
    z-index: 2;
    top: 28%;
    width: 46%;
    left: 27%;
    height: 180/@r;
    img{
      width: 100%;
      height: 120/@r;
    }
    strong{
      margin: 0;
      padding: 0;
      color:black;
      font-size: 16/@r;
      letter-spacing: 3/@r;
      display: block;
      font-weight: bold;
      height: 30/@r;
      line-height: 30/@r;
      text-align: center;
    }
    button{
      font-size: 18/@r;
      padding: 3/@r;
      letter-spacing: 2/@r;
      padding-bottom: 3/@r;
      background: lightcoral;
      font-family: "Adobe 黑体 Std";
      font-weight: bold;
      color: white;
      border: none;
      width: 100%;
    }
  }
</style>
