
import {Request, Response, NextFunction} from 'express'
import {User} from '../entities/user'
import {getRepository} from 'typeorm'

export const checkRole = (roles:string)=>{
   return async (req:Request, res:Response, next:NextFunction)=>{
        const db = getRepository(User) 
        const user = await db.findOne(res.locals.userId)
        if(!user){
          return res.json({message:'not authorized'})
        }
         const {role}= user
         if(roles.includes(role)){
           next()
         }else{
          return res.json({message:'not admin user '})
         }
   } 
}
