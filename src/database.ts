import {createConnection} from 'typeorm'


( ()=>{
    createConnection({
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "typeorm",
        "synchronize": true,
        "entities": [
           "src/entity/**/*.ts"
        ]
      
      }).then(()=>{
       console.log('db is connected')
    }).catch(error =>{
         console.log(error)
    }) 
      
         
})()