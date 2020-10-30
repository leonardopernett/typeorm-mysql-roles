import {getRepository} from 'typeorm'
import {Request, Response} from 'express'

import {User} from '../entities/user'

export class UserController {
   
   static getAll = async (req:Request, res:Response)=>{
       const db = getRepository(User)
       const users = await db.find()
       res.json(users)
   }

    static  getById =  async(req:Request, res:Response) =>{
        try {
            const {id} = req.params
            const db   = getRepository(User)
            const user = await db.findOne(id)
            if(!user) return res.status(400).json({message:'user no result'})
            res.json(user)
        } catch (error) {
            console.log(error)
        }

    }

    static async  createUser(req:Request, res:Response){
        try {
          const {username, password, role}= req.body
          const user:any = new User();
          user.username = username
          user.password = password
          user.role     = role
        
          const db = getRepository(User)
          await  db.save(user)
        } catch (error) {
          console.log(error)
        }
    }

    static async  updateUser(req:Request, res:Response){
       try {
          const {username, password, role} = req.body
          const {id}= req.params
          const db = getRepository(User)
          const user = await db.findOne(id)
          if(user){
            const result =  await db.merge(user,req.body)
            await  db.save(result)
          }
       } catch (error) {
          console.log(error)
       }
    }

    static  async  deleteUser(req:Request, res:Response){
      try {
        const {id}= req.params
        let db =  getRepository(User)
        await db.delete(id)
        res.json({message:'user delete'})

      } catch (error) {
        res.json({message:"Error ..."})
      }
    }
}