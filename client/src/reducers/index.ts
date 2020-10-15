import { combineReducers } from "redux";
import fileReducer from './file.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
  fileReducer,
  userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
