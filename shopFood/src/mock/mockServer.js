import Mock from  "mockjs";
import  data from "./data.json"

Mock.mock("/shop/food",{code:0,data:data.food})

Mock.mock("/shop/evaluate",{code:0,data:data.evaluate})

Mock.mock("/shop/info",{code:0,data:data.info})
//拦截前台（8080）的相应ajax请求，返回相应模板数据
