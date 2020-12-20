export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload:data
});

export const logoutUser = (data) => ({
  type: LOGOUT_USER,
});

export const refreshToken = () => ({
  type: REFRESH_TOKEN,
});

export const setAuthenticated = (authenticated) => ({
  type: SET_AUTHENTICATED,
  authenticated
});

const initialState = {
  authenticated:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      const { authenticated } = action;
      return { ...state, authenticated };
    default:
      return state;
  }
};