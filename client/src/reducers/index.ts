import { CombinedState, combineReducers, Reducer } from "redux";
import { UserAction } from '../actions/auth/types';
import { FilesAction } from '../actions/files/types';
import { UploadAction } from '../actions/upload/types';
import fileReducer, { FileStateType } from './files.reducer'
import uploadReducer, { UploadStateType } from './upload.reducer';
import userReducer, { UserStateType } from './user.reducer'

type RootReducer = Reducer<CombinedState<{
  files: FileStateType;
  user: UserStateType;
  upload: UploadStateType
}>, FilesAction | UserAction | UploadAction>

const rootReducer = combineReducers({
  files: fileReducer,
  user: userReducer,
  upload: uploadReducer
})

export type RootState = ReturnType<RootReducer>

export default rootReducer
