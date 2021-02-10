import { takeLatest } from "redux-saga/effects";
import {
  handleLoginUser,
  handleRefreshToken,
  handleLogoutUser,
} from "./handlers/authentication";
import {
  LOGIN_USER,
  REFRESH_TOKEN,
  LOGOUT_USER,
} from "../ducks/authentication";

export function* watcherSaga() {
  yield takeLatest(LOGIN_USER, handleLoginUser);
  yield takeLatest(LOGOUT_USER, handleLogoutUser);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
}
