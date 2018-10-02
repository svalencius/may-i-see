import { combineReducers } from 'redux'
import appReducer from './App/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers,
    app: appReducer
  })
}

export default makeRootReducer
