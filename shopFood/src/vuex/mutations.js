import {
  DELETEUSER, GETADRESS, GETFOODTYPES, GETSHOPLISTS,
  SAVEUSER, GETEVALUATE, GETINFO, GETFOOD, ADDCARD, REMOVECARD,REMOVEALL,SEARCHLIST
} from './action_types'

export default {
  [GETADRESS](state,{latitude,longitude,address}){
    state.latitude=latitude;
    state.longitude=longitude;
    state.address=address;
  },
  // [GETADRESS](state,{address}){
  //   state.address =address
  // },
  [GETFOODTYPES](state,{foodTypes}){
    state.foodTypes =foodTypes
  },
  [GETSHOPLISTS](state,{shopLists}){
    state.shopLists =shopLists
  },
  [SAVEUSER](state,{user}){
    if (user.name) {
      state.user.name=user.name;
    }
    else{
      state.user.phone=user.phone;
    }
    state.user._id =user._id;

    if(sessionStorage.getItem("user")){
         state.user=JSON.parse(sessionStorage.getItem("user"));
    }
  },
  [DELETEUSER](state){
    state.user = {
      _id: "",
      name: "",
      phone: "",
      address: [],
      avatar: "",
      content: []
    }
    sessionStorage.removeItem("user")
  },
  [GETFOOD](state,{data}){
    state.food =data;
  },
  [GETINFO](state,{data}){
    state.info =data;
  },
  [GETEVALUATE](state,{data}){
    state.evaluate =data;
  },
  [ADDCARD](state,{foodInfo}){
    var  {cardArr}=state;
    var id=foodInfo[0];
    var data=foodInfo[1];
    var thisIndex=-1;
    cardArr.forEach((item,index)=>{
      if(item[id]){
          console.log("有了");
          thisIndex=index;
        }
    })
    if (thisIndex!==-1){
      cardArr[thisIndex][id].push(data);
    } else{
      cardArr.push({[id]:[data]})
    }
  },
  [REMOVECARD](state,{foodInfo}){
   //   state.cardArr.splice(state.cardArr.indexOf(food),1)
    var  {cardArr}=state;
    var id=foodInfo[0];
    var data=foodInfo[1];
    cardArr.forEach((item)=>{
      if(item[id]){
        item[id].splice(item[id].indexOf(data),1)
      }
    })
  },
  [REMOVEALL](state,{id}){
    var thisIndex;
    state.cardArr.forEach((item,index)=>{
      if (item[id]){
        thisIndex=index;
        item[id].forEach((i)=>{
          i.count=0;
        })
        item[id].count=0;//清零每一个的count属性。
      }
    })
    state.cardArr.splice(thisIndex,1)
  },
  [SEARCHLIST](state,{data}){
    state.searchList=data;
  },
  ["update_userInfo"](state,{data}){
    var {result,to}=data;
    if (to==="address"||to==="content"){
      //if (state.user.address.length===0){
        //Boolean("")->false   Boolean([]),Boolean({})->true
        state.user[to].push(result);
     // } else{
      //  state.user.address.push(result);
     // }
    }
    else{
      state.user[to]=result;
    }
    sessionStorage.setItem("user", JSON.stringify(state.user))
  },
  ["remove_address"](state,{data}){
    state.user.address.splice(data,1);
    sessionStorage.setItem("user", JSON.stringify(state.user))
  }
}
