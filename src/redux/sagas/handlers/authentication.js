import { call, put } from "redux-saga/effects";
import { setAuthenticated } from "../../ducks/authentication";
import { authenticateUser,refreshToken,cancelToken } from "../requests/authentication";
import {refreshToken as refresh} from "../../ducks/authentication";
import store from "../../configureStore";

var interval = null;

export function* handleLoginUser(action) {
  
  try {
    console.log("handler caught");
    const response = yield call(authenticateUser,action.payload);
    console.log("handler caught response : "+ JSON.stringify(response));
    let authentication = false;
    if (response.status === 200) {
      authentication = true;
      interval = setInterval(()=>{
        console.log("Timer Tick");
        store.dispatch(refresh());
        },3000)
    }
    //const { authentication } = response;    
    yield put(setAuthenticated(authentication));
  } catch (error) {
    let authentication = false;
    yield put(setAuthenticated(authentication));
    //console.log(error);
  }
}

export function* handleRefreshToken(action) {
  try {
    console.log("handler caught");
    const response = yield call(refreshToken);
    console.log("handler caught response : "+ JSON.stringify(response));
    let authentication = false;
    if (response.status === 200) {
      authentication = true;
    }
    //const { authentication } = response;    
    yield put(setAuthenticated(authentication));
  } catch (error) {
    let authentication = false;
    yield put(setAuthenticated(authentication));
    //console.log(error);
  }
}

export function* handleLogoutUser(action) {
  try {
    clearInterval(interval);
    console.log("handler caught"+interval);
    const response = yield call(cancelToken);
    console.log("handler caught response : "+ JSON.stringify(response));
    let authentication = false;        
    //const { authentication } = response;    
    yield put(setAuthenticated(authentication));
  } catch (error) {
    let authentication = false;
    yield put(setAuthenticated(authentication));
    //console.log(error);
  }
}