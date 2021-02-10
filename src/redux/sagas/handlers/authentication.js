import { call, put } from "redux-saga/effects";
import { setAuthenticated } from "../../ducks/authentication";
import {
  authenticateUser,
  refreshToken,
  cancelToken,
} from "../requests/authentication";
import { refreshToken as refresh } from "../../ducks/authentication";
import store from "../../configureStore";
import { setSnackbar } from "../../ducks/Snackbar";

export function* handleLoginUser(action) {
  try {
    console.log("handler caught");
    const response = yield call(authenticateUser, action.payload);
    console.log("handler caught response : " + JSON.stringify(response));

    let authentication = false;
    let username = null;
    if (response.status === 200) {
      authentication = true;
      username = action.payload.username;
      localStorage.setItem("username", username);
      console.log(" Roles : " + JSON.stringify(response.data));
      localStorage.setItem("roles", JSON.stringify(response.data));
    }
    //const { authentication } = response;
    yield put(setAuthenticated(authentication));
    yield put(setSnackbar(true, "success", "Login Successful"));
  } catch (error) {
    console.log("Error caught : " + error);
    let authentication = false;
    let username = null;
    yield put(setAuthenticated(authentication));
    yield put(setSnackbar(true, "error", "Login failed"));
  }
}

export function* handleRefreshToken(action) {
  try {
    console.log("handler caught");
    const response = yield call(refreshToken);
    console.log("handler caught response : " + JSON.stringify(response));
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
    const response = yield call(cancelToken);
    console.log("handler caught response : " + JSON.stringify(response));
    let authentication = false;
    localStorage.setItem("username", null);
    //const { authentication } = response;
    yield put(setAuthenticated(authentication));
  } catch (error) {
    let authentication = false;
    yield put(setAuthenticated(authentication));
    //console.log(error);
  }
}
