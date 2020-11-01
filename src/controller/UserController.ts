import {getRepository} from 'typeorm'
import {Request, Response} from 'express'

import {User} from '../entities/user'

export class UserController {
   
   static getAll = async (req:Request, res:Response)=>{
       const db = getRepository(User)
       const users = await db.find()
       const userFind = await db.findOne(res.locals.userId)
       console.log(userFind)
       res.json(users)
   }

    static  async getById (req:Request, res:Response){
        try {
            const {id} = req.params
            const db   = getRepository(User)
            const user = await db.findOne({where:{id:id}})
            if(!user) return res.status(400).json({message:'user no result'})
            res.json(user)
        } catch (error) {
            console.log(error)
        }

    }

    static  createUser = async(req:Request, res:Response)=>{
        const {username, firstname, lastname, password, role} = req.body
        const db = getRepository(User)
        if(!username || !password){
            return  res.json({message:"username or password are required"})
        }
        const verifyUsername = await db.findOne({where:{username}})
        if(verifyUsername?.username === username) return res.status(400).json({message:'username al ready exist'})
        const user    = new User();
        user.firstname = firstname
        user.lastname = lastname
        user.username = username
        user.password = await user.encryptPassword(password)
        user.role = role
        await db.save(user)
        res.json({message:'user created'})
    }

    static async  updateUser(req:Request, res:Response){
       const {id}=req.params
       const  db = getRepository(User);
       const user = await db.findOne(id)
       if(user){
           const result = await db.merge(user,req.body)
           await db.save(result)
           return  res.json({message:'user updated'})
       }
           res.json({message:'user not found'})
       
     
    }

    static  async  deleteUser(req:Request, res:Response){
      try {
        const {id}= req.params
        let db =  getRepository(User)
        const user = await db.findOne({where:{id:id}})
        if(!user) return res.json({message:'user no exist'})
        await db.delete(id)
        res.json({message:'user delete'})

      } catch (error) {
        res.json({message:"Error ..."})
      }
    }
}