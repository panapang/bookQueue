import {
  LOAD_PROMOTIONS_SUCCESS,
  LOAD_PROMOTION_SUCCESS,
  DELETE_PROMOTION_SUCCESS
} from '../constants/actionTypes'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROMOTIONS_SUCCESS:
      return action.payload;
    case LOAD_PROMOTION_SUCCESS:
      return [action.payload];
    case DELETE_PROMOTION_SUCCESS:
      return action.payload.promotions;
    default:
      return state;
  }
}

export const getPromotionById = (state, _id) => (
  state.promotions.find((promotion) => promotion._id === _id) ||
  {
    code: '',
    description: '',
    discount: 0,
    minCust: 0,
    maxCust: 0,
    operatorWithPrice: 'and',
    priceMoreThan: 0,
    mod: 0,
    isAutoUse: false
  }
)