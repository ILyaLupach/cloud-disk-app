import { rejects } from 'assert'
import config from 'config'
import fs from 'fs'
import path from 'path'
import File from '../models/File'
import { FileType } from '../types'

class FileService {

  getPath = (file: FileType) => path.join(__dirname, `../files/${file.user}/${file.path}`)

  createDir = (file: FileType) => {
    const filePath = this.getPath(file)
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'File was created'})
        } else {
          return reject({message: 'File already exist'})
        }
      } catch (error) {
        return reject({message: 'File error'})
      }
    })
  }

  removeFile = (file: FileType) => {
    const filePath = this.getPath(file)
    file.type === 'dir'
      ? fs.rmdirSync(filePath)
      : fs.unlinkSync(filePath)
  }
}

export default new FileService()
