import { Router, Request, Response } from 'express'
import { check, Result, ValidationError, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import authMiddleware from '../middleware/auth.middleware'
import User from '../models/User'
import File from '../models/File'
import fileService from '../services/file.service'

import { Document } from 'mongoose'
import { UserType } from '../types'

const router = Router()

router.post('/signup',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'password must be more than 6 characters').isLength({ min: 6 }),

  ],
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password }: UserType = req.body

      const validationError: Result<ValidationError> = validationResult(req)
      if (!validationError.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request' })
      }

      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
        return res.status(400).json({ message: `User with email ${email} already exist` })
      }

      const hashPassword: string = await bcrypt.hash(password, 5)
      const newUser: UserType & Document = new User({ email, password: hashPassword })
      await newUser.save()

      await fileService.createDir(new File({user: newUser.id, name: ''}))

      res.json({ message: 'User was created' })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'server error' })
    }
  })

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: UserType = req.body
    const user: UserType & Document | null = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isPasswordValid: boolean = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1d' })

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.get(
  '/auth',
  authMiddleware,
  async (req: Request | any, res: Response): Promise<any> => {
    try {
      const user: UserType & Document | null = await User.findOne({ _id: req.user.id })
      if (!user) return res.status(401).json({ message: 'Auth error' })
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1d' })
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'server error' })
    }
  })

export default router
