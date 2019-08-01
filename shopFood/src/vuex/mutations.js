import {
  DELETEUSER, GETADRESS, GETFOODTYPES, GETSHOPLISTS,
  SAVEUSER, GETEVALUATE, GETINFO, GETFOOD, ADDCARD, REMOVECARD
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
  [ADDCARD](state,{food}){
    state.cardArr.push(food);
  },
  [REMOVECARD](state,{food}){
    state.cardArr.splice(state.cardArr.indexOf(food),1)
  }



}
