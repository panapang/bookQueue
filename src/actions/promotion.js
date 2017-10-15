import { RSAA } from 'redux-api-middleware'

import { PROMOTIONS_ENDPOINT } from '../constants/endpoints'
import {
  LOAD_PROMOTIONS_REQUEST,
  LOAD_PROMOTIONS_SUCCESS,
  LOAD_PROMOTIONS_FAILURE,

  LOAD_PROMOTION_REQUEST,
  LOAD_PROMOTION_SUCCESS,
  LOAD_PROMOTION_FAILURE,

  CREATE_PROMOTION_REQUEST,
  CREATE_PROMOTION_SUCCESS,
  CREATE_PROMOTION_FAILURE,

  UPDATE_PROMOTION_REQUEST,
  UPDATE_PROMOTION_SUCCESS,
  UPDATE_PROMOTION_FAILURE,

  DELETE_PROMOTION_REQUEST,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_FAILURE,
} from '../constants/actionTypes'

export const getPromotions = () => ({
  [RSAA]: {
    endpoint: PROMOTIONS_ENDPOINT,
    method: 'GET',
    types: [LOAD_PROMOTIONS_REQUEST, LOAD_PROMOTIONS_SUCCESS, LOAD_PROMOTIONS_FAILURE]
  }
})

export const getPromotion = (_id) => ({
  [RSAA]: {
    endpoint: `${PROMOTIONS_ENDPOINT}/${_id}`,
    method: 'GET',
    types: [LOAD_PROMOTION_REQUEST, LOAD_PROMOTION_SUCCESS, LOAD_PROMOTION_FAILURE]
  }
})

export const createPromotion = (promotion) => ({
  [RSAA]: {
    endpoint: PROMOTIONS_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(promotion),
    types: [CREATE_PROMOTION_REQUEST, CREATE_PROMOTION_SUCCESS, CREATE_PROMOTION_FAILURE]
  }
})

export const updatePromotion = (promotion) => ({
  [RSAA]: {
    endpoint: `${PROMOTIONS_ENDPOINT}/${promotion._id}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(promotion),
    types: [UPDATE_PROMOTION_REQUEST, UPDATE_PROMOTION_SUCCESS, UPDATE_PROMOTION_FAILURE]
  }
})

export const deletePromotion = (promotion) => ({
  [RSAA]: {
    endpoint: `${PROMOTIONS_ENDPOINT}/${promotion._id}`,
    method: 'DELETE',
    types: [DELETE_PROMOTION_REQUEST, DELETE_PROMOTION_SUCCESS, DELETE_PROMOTION_FAILURE]
  }
})