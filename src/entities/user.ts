import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class User {
     @PrimaryGeneratedColumn()
      id: any;

      @Column({type:'varchar', unique:true, length:200})
      username: any

      @Column({type:'varchar', length:200})
      password: any

      @Column({type:'varchar', unique:true, length:200})
      role: any

      @Column()
      createdAt: any

      @Column()
      updatedAt : any 
}