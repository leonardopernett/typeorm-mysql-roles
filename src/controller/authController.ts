import {getRepository,} from 'typeorm'
import {Request, Response} from 'express'
import {User} from '../entities/user'
import jwt from 'jsonwebtoken'

export class AuthController {
    
    static async login(req:Request, res:Response){ 
      const {username, password} = req.body
      if(!username && !password){
         return res.status(400).json({message:'username and password is required'})
      }
      const db =  getRepository(User)
      const user:any = await db.findOne({where:{username}})

      if(!user){
         return res.status(400).json({message:'username not found'})
      }

      const verifyPassword = await user.comparePassword(password)
      if(!verifyPassword)   return res.status(400).json({messgae:'password incorrrect'})
     
      const token = jwt.sign({userId:user.id, username:user.username}, 'SECRETKEYYEAH', {expiresIn:'1h'})
      res.json({token})
 }
}


