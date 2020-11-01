import {Entity, PrimaryGeneratedColumn, Column, createConnection, UpdateDateColumn, CreateDateColumn} from 'typeorm'
import bcrypt from 'bcryptjs'


@Entity()

export class User {

     @PrimaryGeneratedColumn()
      id: number;

      @Column({type:'varchar', length:200})
      firstname: string

      @Column({type:'varchar', length:200})
      lastname: string

      @Column({type:'varchar',  unique:true, length:200})
      username: string

      @Column({type:'varchar',  length:200})
      password: string

      @Column({type:'varchar', length:200})
      role: string

      @Column()
      @CreateDateColumn()
      createdAt: Date
  
      @Column()
      @UpdateDateColumn()
      updatedAt : Date 


      async  encryptPassword (password:string): Promise<string>{
            const salt = await bcrypt.genSalt(10)
            return await bcrypt.hash(password, salt)
         }
         
       async comparePassword (password:string):Promise<boolean>{
            return await  bcrypt.compare(password, this.password)
       }
}