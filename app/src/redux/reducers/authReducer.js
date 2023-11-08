import * as type from "../types";
const initialState = {
  authToken: null,
  isLoggedIn: false,
  user: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_LOGIN_STATE:
      return {
        ...state,
        user: null,
        authToken: null,
        isLoggedIn: false,
        isLoading: true,
      };
    case type.SET_LOGIN_SUCCESS: 
     return {
        ...state,
        user: action.payload.user,
        authToken: action.payload.authToken,
        isLoggedIn: true,
        isLoading: false,
     }
    case type.SET_INITIAL_STATE:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        authToken: action.payload.authToken,
        isLoading: true,
      };
    case type.SET_REGISTER_STATE:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: false,
        authToken: action.payload.authToken,
        isLoading: true,
      };
    case type.SET_LOGOUT_STATE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        authToken: null,
        isLoading: false,
      };
    case type.SET_LOGIN_FAIL_STATE:
      return {
        ...state,
        authToken: null,
        isLoggedIn: false,
        user: null,
        isLoading: false,
      };
    
    default:
      return state;
  }
};
