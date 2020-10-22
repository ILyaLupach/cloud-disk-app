import { Request, Response } from 'express'
import fileService from '../services/file.service'
import User from '../models/User'
import File from '../models/File'
import { FileType, UserType } from '../types'
import path from 'path'
import fs from 'fs'

//TODO fix types any
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
      return res.status(500).json({ message: 'Can not get files' })
    }
  }

  downloadFile = async (req: Request | any, res: Response) => {
    try {
      const file = await File.findOne({ id: req.query.parent, user: req.user.id })
      if (!file) return res.status(400).json({ message: 'file not found' })
      const filePath = path.join(__dirname, `../files/${req.user.id}/${file.path}/${file.name}`)
      if (fs.existsSync(filePath)) {
        return res.download(filePath, `${file.name}`)
      } else {
        return res.status(400).json({ message: 'file not found' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Download ferror' })
    }
  }

  uploadFile = async (req: Request | any, res: Response) => {
    try {
      const { file } = req.files

      const parent: any = await File.findOne({ user: req.user.id, _id: req.body.parent })
      const user: any = await User.findOne({ _id: req.user.id })

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on the disk' })
      }

      user.usedSpace = user.usedSpace + file.size

      const filePath = parent
        ? path.join(__dirname, `../files/${req.user.id}/${parent.path}/${file.name}`)
        : path.join(__dirname, `../files/${req.user.id}/${file.name}`)

      if (fs.existsSync(filePath)) {
        return res.status(400).json({ message: 'File already exist' })
      }

      file.mv(filePath)

      const fileType = file.name.split('.').pop()
      const fileDB = new File({
        name: file.name,
        type: fileType,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id
      })
      await fileDB.save()
      await user.save()

      return res.json(fileDB)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Upload error' })
    }
  }
}

export default new FileController()
