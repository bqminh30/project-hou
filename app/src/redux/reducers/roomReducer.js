import * as type from "../types";
const initialState = {
  rooms: [],
  room: null,
  typerooms: [],
  room_services: [],
  room_images: []
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_ROOMS_STATE:
      return {
        ...state,
        rooms: [],
      };
    case type.SET_ROOMS_SUCCESS: 
     return {
        ...state,
        rooms: action.payload.rooms,
     }
    case type.SET_ROOMS_FAILD:
      return {
        ...state,
        rooms: [],
      };
      case type.SET_ROOM_STATE:
      return {
        ...state,
        room: null,
        room_images: [],
        room_services: [],
      };
    case type.SET_ROOM_SUCCESS: 
     return {
        ...state,
        room: action.payload.room,
        room_images: action.payload.room_images,
        room_services: action.payload.room_services,
     }
    case type.SET_ROOM_FAILD:
      return {
        ...state,
        room: null,
        room_images: [],
        room_services: [],
      };
      case type.SET_TYPEROOM_STATE:
        return {
          ...state,
          typerooms: [],
        };
      case type.SET_TYPEROOM_SUCCESS: 
       return {
          ...state,
          typerooms: action.payload.typerooms,
       }
      case type.SET_TYPEROOM_FAILD:
        return {
          ...state,
          typerooms: [],
        };
    default:
      return state;
  }
};
