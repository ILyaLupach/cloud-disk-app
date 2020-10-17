import { CombinedState, combineReducers, Reducer } from "redux";
import { UserAction } from '../actions/auth/types';
import { FilesAction } from '../actions/files/types';
import fileReducer, { FileStateType } from './files.reducer'
import userReducer, { UserStateType } from './user.reducer'

type RootReducer = Reducer<CombinedState<{
  files: FileStateType;
  user: UserStateType;
}>, FilesAction | UserAction>

const rootReducer = combineReducers({
  files: fileReducer,
  user: userReducer,
})

export type RootState = ReturnType<RootReducer>

export default rootReducer
