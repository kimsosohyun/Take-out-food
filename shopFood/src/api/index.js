import  ajax from "./ajax";
//const base_url="/api";//加了base_url的ajax请求是通过代理发给后台服务器的。   /api开发环境代理
const base_url="http://192.168.1.12:4000";   //这个是打包环境代理
//不加是通过mock.js模拟得到返回的数据，直接在前台就可以处理。
//http://localhost:3000/position/:geohash  geohash这种带占位符的参数是param类型的参数
//http://localhost:3000/position?geohash=xxx  这种是query类型的参数


export const reqGetAddress=(geohash)=>(ajax(base_url+"/position/"+geohash+"")) //param类型的参数携带方式，不放在data里，直接放在url上
//获取地址信息
export const reqGetFoodTypes=()=>(ajax(base_url+"/index_category"))
//获取Swiper组件的16个食物类型
export const reqGetShopLists=(latitude,longitude)=>(ajax(base_url+"/shops",{latitude:latitude,longitude:longitude})) //纬度  经度
//获取商家列表                                                                             // url?latitude=xxx
export const reqSearchFoodShops=(geohash,keyword)=>(ajax(base_url+"/search_shops",{geohash,keyword}))
//搜索商家
export const reqOneCaptcha=()=>(ajax(base_url+"/captcha"))
//获取一次性人机验证码
export const reqPwdLogin=({name,pwd,captcha})=>(ajax(base_url+"/login_pwd",{name,pwd,captcha},"POST"))
//用户名密码登陆
export const reqPhoneCode=(phone)=>(ajax(base_url+"/sendcode",{phone}))
//获取手机验证码
export const reqPhoneLogin=({phone,code})=>(ajax(base_url+"/login_sms",{phone,code},"POST"))
//通过手机号登陆
export const reqUserInfo=()=>(ajax(base_url+"/userinfo"))
//实现自动登陆
export const reqLogout=()=>(ajax(base_url+"/logout"))
//用户登出

export const reqFood=()=>(ajax("/shop/food"))
//mock 食物列表   根据id获取商户的有关信息！
export const reqInfo=()=>(ajax("/shop/info"))
//mock 商家信息
export const reqEvaluate=()=>(ajax("/shop/evaluate"))
//mock 用户评价







