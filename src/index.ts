import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import './database'

import indexRouter from './routes/index'
const app = express();

app.set('port',process.env.PORT || 3000)


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(helmet())

//router
app.use(indexRouter)


//listen 
app.listen(app.get('port'),()=>{
  console.log('server on port 3000')
})
