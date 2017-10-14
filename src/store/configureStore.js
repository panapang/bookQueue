import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'

import rootReducer from '../reducers'

export default (history) => {
  const middlewares = [thunk, apiMiddleware]

  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )

  return store
}