import {
  LOAD_PROMOTIONS_SUCCESS,
  DELETE_PROMOTION_SUCCESS
} from '../constants/actionTypes'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROMOTIONS_SUCCESS:
      return action.payload;
    case DELETE_PROMOTION_SUCCESS:
      return action.payload.promotions;
    default:
      return state;
  }
}