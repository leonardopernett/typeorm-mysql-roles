import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class User {
     @PrimaryGeneratedColumn()
      id: bumber;

      @Column({type:'varchar', unique:true, length:200})
      username: any

      @Column({type:'varchar', length:200})
      password: string

      @Column({type:'varchar', unique:true, length:200})
      role: any

      @Column()
      createdAt: Date

      @Column()
      updatedAt : Date 
}