import { Request, Response } from 'express'
import fileService from '../services/file.service'
import User from '../models/User'
import File from '../models/File'
import { FileType, UserType } from '../types'
import path from 'path'
import fs from 'fs'

class FileController {
  createDir = async (req: Request | any, res: Response) => {
    try {
      const { name, type, parent } = req.body
      const file = new File({ name, type, parent, user: req.user.id })
      const parentFile = await File.findOne({ _id: parent })
      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}/${file.name}`
        await fileService.createDir(file)
        if (!parentFile.childs) parentFile.childs = []
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  getFiles = async (req: Request | any, res: Response) => {
    try {
      const file = await File.find({ user: req.user.id, parent: req.query.parent })
      return res.json(file)
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Can not get files'})
    }
  }

  downloadFile = async (req: Request | any, res: Response) => {
    try {
      const file = await File.findOne({ id: req.query.parent, user: req.user.id })
      if (!file) return res.status(400).json({message: 'file not found'})
      const filePath = path.join(__dirname, `../files/${req.user.id}/${file.path}/${file.name}`)
      if (fs.existsSync(filePath)) {
        return res.download(filePath, `${file.name}`)
      } else {
        return res.status(400).json({message: 'file not found'})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Download ferror'})
    }
  }
}

export default new FileController()
