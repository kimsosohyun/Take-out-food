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
    state.user =user
  },
  [DELETEUSER](state){
    state.user ={};
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
  }
}
