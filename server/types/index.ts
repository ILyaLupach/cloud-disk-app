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
  type: Schema.Types.ObjectId
  ref: string
}
