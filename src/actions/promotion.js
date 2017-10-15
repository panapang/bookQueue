import { RSAA } from 'redux-api-middleware'
import { PROMOTIONS_ENDPOINT } from '../constants/endpoints'
import {
  LOAD_PROMOTIONS_REQUEST,
  LOAD_PROMOTIONS_SUCCESS,
  LOAD_PROMOTIONS_FAILURE,

  DELETE_PROMOTION_REQUEST,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_FAILURE,
} from '../constants/actionTypes'

export const loadPromotions = () => ({
  [RSAA]: {
    endpoint: PROMOTIONS_ENDPOINT,
    method: 'GET',
    types: [LOAD_PROMOTIONS_REQUEST, LOAD_PROMOTIONS_SUCCESS, LOAD_PROMOTIONS_FAILURE]
  }
})

export const deletePromotion = (promotion) => ({
  [RSAA]: {
    endpoint: `${PROMOTIONS_ENDPOINT}/${promotion._id}`,
    method: 'DELETE',
    types: [DELETE_PROMOTION_REQUEST, DELETE_PROMOTION_SUCCESS, DELETE_PROMOTION_FAILURE]
  }
})