import {Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'


interface IPayload {
  username:string;
  userId:string
}

export const checkToken = (req:Request,res:Response,next:NextFunction)=>{
   if(!req.headers['authorization']){
      return  res.json({message:'not authorization'})
   }

   const token = req.headers['authorization']
   if(!token){
    return  res.json({message:'not authorization'})
   }
   const payload = jwt.verify(token, 'SECRETKEYYEAH') as IPayload
   res.locals.userId = payload.userId
   res.locals.username = payload.username
   next()
}