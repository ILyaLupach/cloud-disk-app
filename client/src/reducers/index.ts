import { combineReducers } from "redux";
import fileReducer from './files.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
  files: fileReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
