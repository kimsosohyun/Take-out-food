import {
  GETADRESS, GETFOODTYPES, GETSHOPLISTS, SAVEUSER,
  DELETEUSER, GETEVALUATE, GETFOOD, GETINFO, REMOVECARD,ADDCARD,REMOVEALL,SEARCHLIST
} from './action_types'
import {reqGetAddress,reqGetFoodTypes,reqGetShopLists,reqUserInfo,
  reqLogout,reqFood,reqInfo,reqEvaluate,reqSearchFoodShops} from "../api"

export default {
  async getAddress({commit},{latitude,longitude}){
    console.log(latitude)
    var geohash=latitude+","+longitude;
    var response=await reqGetAddress(geohash)
    var result=response.data;
    var address=result.data.address;
    commit(GETADRESS,{latitude,longitude,address})
  },

  // getAdress({commit,state},{latitud,longitude}){
  //   commit(GETLALO,{latitud,longitude})
  // }, 实现存储经度纬度的简单功能，上面的函数实现了存储经纬度和地址功能。

  async getFoodTypes({commit}){
    var response=await reqGetFoodTypes()
    var result=response.data;
    var foodTypes=result.data;
    commit(GETFOODTYPES,{foodTypes})
  },

  async getShopLists({commit,state}){
    var {latitude,longitude}=state
    var response=await reqGetShopLists(latitude,longitude)
    var result=response.data;
    var shopLists=result.data;
    commit(GETSHOPLISTS,{shopLists})
  },
  // async phoneLogin({commit,state},{phone,code}){
  //   var response=await reqPhoneLogin({phone,code})
  //   var result=response.data;
  //   var data=result.data;
  //  if (result.code===1){
  //    //代表错误，应该分发一个错误的ACTION，还要存在一个state里，太麻烦，这个state还没有复用的价值
  //    //所以最好的方法是直接在login里发请求
  //    //状态需要存起来集中管理的才需要在action里发请求，在mutation里改变state来存，在组件里取出来使用
        //需要复用而且需要存在state里，然后从state里取出来复用的情况才需要使用vuex集中管理。
  //  }
  //  else{
  //    //成功
  //    commit(PWDLOGIN,{data})
  //  }
  // },pwdLogin同理！
  saveUser({commit},{user}){
    commit(SAVEUSER,{user})
  },
  async autoLogin({commit}){
    var response=await reqUserInfo();
    var result=response.data;
    if (result.code===0){
      var user=result.data;
      commit(SAVEUSER,{user})
    }
  },
  async logout({commit}){
    var response=await reqLogout();
    var result=response.data;
    if (result.code===0){
      commit(DELETEUSER)
    }
  },
  async getFood({commit}){
    var response=await reqFood();
    var result=response.data;
    var data=result.data;
    if (result.code===0){
      commit(GETFOOD,{data})
    }
  },
  async getInfo({commit}){
    var response=await reqInfo();
    var result=response.data;
    var data=result.data;
    if (result.code===0){
      commit(GETINFO,{data})
    }
  },
  async getEvaluate({commit}){
    var response=await reqEvaluate();
    var result=response.data;
    var data=result.data;
    if (result.code===0){
      commit(GETEVALUATE,{data})
    }
  },
  addToCard({commit},foodInfo){
    commit(ADDCARD,{foodInfo})
  },
  removeCard({commit},foodInfo){
    commit(REMOVECARD,{foodInfo})
  },
  removeAll({commit},id){
    commit(REMOVEALL,{id})
  },
  async searchList({commit,state},sendData){
    var {callback,text}=sendData;
    var geohash=state.latitude+","+state.longitude;
    console.log(geohash)
    var response=await reqSearchFoodShops(geohash,text)
    var result=response.data;
    console.log(result)
    if (result.code===0){
      var data=result.data
      commit(SEARCHLIST,{data})
      // console.log(callback,text)
      callback&&callback();
    }
    else{
      console.log(222)
    }
  },

}
