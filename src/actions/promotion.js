import { RSAA } from 'redux-api-middleware'
import { PROMOTIONS_ENDPOINT } from '../constants/endpoints'
import {
  LOAD_PROMOTIONS_REQUEST,
  LOAD_PROMOTIONS_SUCCESS,
  LOAD_PROMOTIONS_FAILURE,
} from '../constants/actionTypes'

export const loadPromotions = () => ({
  [RSAA]: {
    endpoint: PROMOTIONS_ENDPOINT,
    method: 'GET',
    types: [LOAD_PROMOTIONS_REQUEST, LOAD_PROMOTIONS_SUCCESS, LOAD_PROMOTIONS_FAILURE]
  }
})