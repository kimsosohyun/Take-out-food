import  axios from "axios";

export default function ajax (url,data={},method="GET") {
  var promise;

  //console.log(JSON.stringify({})==="{}") true
  //console.log({}==={})  false
  //所引用的对象是不同的，和[]===[],false同一道理

  if (method==="GET"){
    if (JSON.stringify(data) === "{}"){
      promise=axios.get(url);
    }
    else{
      var str="";
      Object.keys(data).forEach((key)=>{
        str+=key+"="+data[key]+"&";  // sendcode?phone=15072351376 中间是等号连接
      })
      str=str.substring(0, str.length-1);
      url=url+"?"+str;
      promise=axios.get(url);
    }
  }
  else {
    promise=axios.post(url,data)
  }

  return promise;

}
