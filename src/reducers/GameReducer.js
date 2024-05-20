import {  SET_SOUND,FETCH_ITEMS_REQUEST,FETCH_ITEMS_SUCCESS,FETCH_ITEMS_FAILURE} from "../actions/Types";

  const INITIAL_STATE = {
      sound: {},
      items: [],
      isFetching: false,
      error: null,
    };
    
    const GameReducers = (state = INITIAL_STATE, action) => {
      switch (action.type) {
  
        case SET_SOUND: 
          return {...state, sound: action.payload };
        case FETCH_ITEMS_REQUEST:
          return { ...state, isFetching: true };
        case FETCH_ITEMS_SUCCESS:
          return { ...state, isFetching: false, items:action.payload };
        case FETCH_ITEMS_FAILURE:
          return { ...state, isFetching: false, error: action.error };

        default:
          return state;
      }
    };
    
    export default GameReducers;