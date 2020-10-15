import { Schema, model, Document } from 'mongoose'
import { UserType } from '../types'

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  files: [{type: Schema.Types.ObjectId, ref: 'File'}]
})

export default model<UserType & Document>('user', UserSchema)
