import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// import Main from  "../pages/main/Main"
// import Personal from '../pages/personal/Personal'
// import Order from '../pages/order/Order'
// import Search from '../pages/search/Search'
import Login  from '../pages/login/Login'
import Food from '../pages/shop/food/Food'
import Evaluate from '../pages/shop/evaluate/Evaluate'
import Info from '../pages/shop/info/Info'
import Shop from '../pages/shop/Shop'
const Main=()=>import("../pages/main/Main");
const Search=()=>import('../pages/search/Search');
const Order=()=>import('../pages/order/Order');
const Personal=()=>import('../pages/personal/Personal'); //相比上面的引入方式，这种是定义成函数类型
//在函数被调用的时候才会触发，所以就实现了按需引入，优化度更高。
export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/main",
    },
    {
      path:"/main",
      component:Main,
      meta:{
        showFooter:true
      }
    },
    {
      path:"/personal",
      component:Personal,
      meta:{
        showFooter:true
      }
    },
    {
      path:"/order",
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:"/search",
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/shop",
      component:Shop,
      children:[
        {
          path: '/',
          redirect:"/shop/food",
        },
        {
          path:"/shop/food",
          component:Food
        },
        {
          path:"/shop/evaluate",
          component:Evaluate
        },
        {
          path:"/shop/info",
          component:Info
        }

      ]
    },


  ]
})
