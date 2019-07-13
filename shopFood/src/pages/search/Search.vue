<template>
  <div>
    <Header title="好吃的快出来！"/>

    <div class="search">
      <form>
        <input type="text" placeholder="请输入商家或美食名称">
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/Header"
  export default {
    name: 'Search',
    components:{
      Header
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
</style>
