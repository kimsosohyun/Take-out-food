<template>
    <div class="food">
      <div class="left_wrap">
        <ul class="left_items">
          <li v-for="(item,index) in food" :index="index" @click="leftClick(index)" :class="{on:index===currentIndex}">
            <div class="pic" v-if="item.icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="content">
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>


       <div class="main">
         <div ref="right_items">
           <div class="food_items"  v-for="(item,index) in food" :index="index">
             <strong>{{item.name}}</strong>
             <ul>
               <li v-for="(f_item,index) in item.foods" :index="index" @click="openShow(f_item)">
                 <img :src="f_item.icon" alt="">
                 <div class="f_content">
                   <h3>{{f_item.name}}</h3>
                   <p>{{f_item.description||"暂无描述"}}</p>
                   <div class="info">
                     <span>月售{{f_item.sellCount}}份</span>
                     <span>好评率{{f_item.rating}}%</span>
                   </div>
                   <div class="price">
                     <b>￥{{f_item.price}}</b>

                     <div class="oldPrice" v-if="f_item.oldPrice">
                       <span></span>
                       <b>￥{{f_item.oldPrice}}</b>
                     </div>

                   </div>

                 </div>
                 <Btn :f_item="f_item"></Btn>
               </li>
             </ul>
           </div>
         </div>
       </div>


       <FoodInfo  :f_item="data_food" ref="food"/>
       <!--这里就是子组件-->

      <div class="submit" >
      </div>

    </div>
</template>

<script>
  import Btn from  "../../../components/btn/Btn"
  import FoodInfo from  "../../../components/foodInfo/FoodInfo"
  import BScroll from 'better-scroll'
  export default {
    name: 'Food',
    components:{
      Btn,FoodInfo
    },
    data(){
      return{
        tops:[],
        scrollY:0,
        data_food:{}
      }
    },
    mounted(){
      this.$store.dispatch("getFood")
       //不要发多次请求，不然methods中的方法会调用多次，特别注意：
      //同一个页面，父子路由<router-view></router-view>显示的时候，父组件发了一次请求，子组件又发一次的情况。
    },
    computed:{
      food(){
        return this.$store.state.food
      },
      currentIndex(){
        var tops=this.tops;
         var current_Index=tops.findIndex((item,index)=> {
           if (index===tops.length-1) {
             return this.scrollY >= item
           }
           else{
             return this.scrollY >= item && this.scrollY < tops[index + 1]
           }
         }
         // [].findIndex()返回对应的下标Key
           //[].find()返回对应的值value
        )
        return current_Index;
      }
    },
    watch:{
      food(){
        this.$nextTick(()=>{
           this.left_scroll=new BScroll('.left_wrap',{
            click:true
          })
          this.right_scroll=new BScroll('.main',{
            click:true,
            probeType:2
          })

          this.right_scroll.on("scroll",({x,y})=>{
            this.scrollY=Math.abs(y);
          })


           if (this.tops.length===0){//tops只收集一次
             var items=this.$refs.right_items.children;
             items=Array.prototype.slice.call(items);//类数组转数组
             items.forEach((item)=>{
               this.tops.push(item.offsetTop);
             })
           }


          this.right_scroll.on("scrollEnd",({x,y})=>{ // probeType:2 引起的后果
            //惯性不会导致"scroll"的y值发生变化，所以最后停手的那一下将不会关联到左侧，probeType:3 又会调用太多次
            //所以就采用2，然后在"scrollEnd"的时候再更新一次scrollY的值,这样最后一次也会关联到左侧了。
            this.scrollY=Math.abs(y);
          })

        })
      }
    },
    methods:{
      leftClick(index){
        var items=this.$refs.right_items.children;
        this.scrollY=this.tops[index];//快速直接更新this.scrollY的值，this.scrollY的值改变调用计算属性currentIndex
        //使得左侧{on}属性快速直接更新。如果不这样做，那就只有通过scrollEnd事件来改变this.scrollY的值，这样的话左侧{on}属性更新
        //速度太慢了，效果不好。
       this.right_scroll.scrollToElement(items[index],300)
      },
      openShow(f_item){//需要在父组件中改变子组件的数据，可以使用的方法：
      //给子组件加特殊属性ref,然后就可以通过this.$refs.得到子组件，自然也就得到了子组件的数据。
        this.$refs.food.showInfo=true;
        this.data_food=f_item;
      }

    },
  }
</script>

<style scoped lang="less">
  @r:25rem;
  .food{
    width:100%;
    position: relative;
    top: 0;
    z-index: 0;
    .left_wrap{
      overflow: hidden;
      width: 21%;
      height: 400/@r;
      float: left;
    }
    .left_items{
      width: 100%;
      li{
        background: rgb(250,250,250);
        padding-top: 5/@r;
        padding-bottom: 5/@r;
        max-height: 70/@r;
        min-height: 30/@r;
        position: relative;
        overflow: hidden;
        width: 100%;
        line-height: 30/@r;
        .pic{
          position: absolute;
          top:2/@r;
          left: 6/@r;
          width: 14/@r;
          height: 14/@r;
          img{
            width: 14/@r;
            height: 14/@r;
          }
        }
        .content{
          margin-left: 5%;
          text-align: center;
          width: 90%;
          line-height: normal;
          span{
            font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
            position: relative;
            top: 6.2/@r;
            color: rgb(102,102,102);
            display: block;
            max-height: 55/@r;
            font-size: 13/@r;
          }
        }
      }
      .on{
        background-color: white;
        span{
          color: lightcoral !important;
        }
      }
    }
    .main{
      overflow: hidden;
      float: left;
      margin-left: 1%;
      height: 636/@r;
      width: 78%;
      .food_items{
        strong {
          padding-bottom: 6/@r;
          color: #666;
          font-weight: bold;
          font-size: 14/@r;
        }
        ul{
          width: 100%;
          li{
            position: relative;
            margin-top: 4/@r;
            padding-top: 10/@r;
            padding-bottom: 10/@r;
            width: 100%;
            height: 100/@r;
            img{
              box-shadow:2px 2px 3px #aaa;
              width: 110/@r;
              height: 100/@r;
              padding-left: 2/@r;
              float: left;
            }
            .f_content{
              max-width:150/@r;
              margin-left: 8/@r;
              float: left;
              h3{
                margin-top: 2/@r;
                font-size: 16/@r;
                letter-spacing: 1/@r;
                font-weight: bold;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              p{
                color:rgb(153,153,153) ;
                margin-top: 4/@r;
                line-height: 20/@r;
                font-size: 12/@r;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .info{
                color:rgb(153,153,153) ;
                line-height: 20/@r;
                font-size: 10/@r;
                margin-bottom: 13/@r;
              }
              .price{
                float: left;
                b{
                  font-size: 18/@r;
                }
                b:nth-of-type(1){
                  color: red;
                }
                .oldPrice{
                  margin-left: 6/@r;
                  float: right;
                  position: relative;
                  span{
                    position: absolute;
                    top: 16/@r;
                    left: 9/@r;
                    display: block;
                    width: 24/@r;
                    height: 2/@r;
                    background:#999;
                  }
                  b{
                    font-size: 15/@r;
                    color: #999;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
