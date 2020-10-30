import {getRepository,} from 'typeorm'
import {Request, Response} from 'express'
import {User} from '../entities/user'

export class AuthController {
    
    static async login(req:Request, res:Response){ 
          const {username, password} = req.body
          if(!username && !password){
             return res.status(400).json({message:'username and password is required'})
          }
          const db =  getRepository(User)
          const user = db.findOneOrFail({where:{username}})
          if(!user) return res.status(400).json({messgae:'username incorrrect'})
          res.send(user)
     }
}


