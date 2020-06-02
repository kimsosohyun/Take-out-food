//根据不同的path进行相应组件的跳转。
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
import Pay from '../pages/Pay/Pay'
import UserInfo from '../pages/userInfo/UserInfo'
const Main=()=>import("../pages/main/Main");
const Search=()=>import('../pages/search/Search');
const Order=()=>import('../pages/order/Order');
const Personal=()=>import('../pages/personal/Personal'); //相比上面的引入方式，这种是定义成函数类型
//在函数被调用的时候才会触发，所以就实现了按需引入，优化度更高。
import Balance from '../pages/personal/Balance/Balance'
import Envelopes from '../pages/personal/Envelopes/Envelopes'
import Integral from '../pages/personal/Integral/Integral'
import Service  from "../pages/service/Service"
import Sort  from "../pages/sort/Sort"
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
      children:[
        {
          path:"/personal/balance",
          component:Balance
        },
        {
          path:"/personal/envelopes",
          component:Envelopes
        },
        {
          path:"/personal/Integral",
          component:Integral
        }
      ],
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
          //path:"/shop/food/:id",  //params类型的参数就需要在这里定义占位符才能显示在网址上(且网址一定要跟上具体的数据才能显示)，query类型的参数则不需要。
          component:Food,
          name:"Food"
        },
        {
          path:"/shop/evaluate",
          component:Evaluate
        },
        {
          path:"/shop/info",
          component:Info
        },
        // {
        //   path:"/personal/balance",
        //   component:Main
        // }
      ]
    },
    {
      path:"/pay",
      component:Pay
    },
    {
      path:"/userInfo",
      component:UserInfo
    },
    {
      path:"/service",
      component:Service
    },
    {
      path:"/sort/:type",
      component:Sort

    }
  ]
})
