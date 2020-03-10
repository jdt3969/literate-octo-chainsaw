import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';

import { User } from './User';

@ObjectType()
@Entity()
export class Data extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  number: number;

  @OneToOne(
    () => User,
    (user: User) => user.data
  )
  @JoinColumn()
  user: User;
  @Column()
  userId: number;
}
