import {createConnection} from 'typeorm'


( ()=>{
    createConnection({
        "type": "mysql",
        "host": process.env.DB_HOST,
        "port": 3306,
        "username":  process.env.DB_USER,
        "password":  process.env.DB_PASSWORD,
        "database":  process.env.DB_DATABASE,
        "synchronize": true,
        "entities": [
           "src/entities/**/*.ts"
        ]
      
      }).then(()=>{
       console.log('db is connected')
    }).catch(error =>{
         console.log(error)
    }) 
      
         
})() 