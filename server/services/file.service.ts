import { rejects } from 'assert'
import config from 'config'
import fs from 'fs'
import path from 'path'
import File from '../models/File'
import { FileType } from '../types'

class FileService {

  createDir = (file: FileType) => {
    const filePath = path.join(__dirname, `../files/${file.user}/${file.path}`)
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


}

export default new FileService()
