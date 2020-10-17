import { Schema } from 'mongoose';

export type UserType = {
  name: string,
  email: string,
  password: string,
  avatar?: string,
  diskSpace: number,
  usedSpace: number,
  files: FileType[]
}

export type FileType = {
  name: String
  type: String
  accessLink?: String
  size?: Number
  path?: String
  date?: Date
  user?: Schema.Types.ObjectId
  parent?: Schema.Types.ObjectId
  childs?: Schema.Types.ObjectId[]
}
