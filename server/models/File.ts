import { Schema, model, Document } from 'mongoose'
import { FileType } from '../types'

const FileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  parent: { type: Schema.Types.ObjectId, ref: 'File' },
  childs: [{ type: Schema.Types.ObjectId, ref: 'File' }],
})

export default model<FileType & Document>('File', FileSchema)
