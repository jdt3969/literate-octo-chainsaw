import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';

import { User } from './User';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  number: number;

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user: User) => user.items,
    { lazy: true }
  )
  user: Lazy<User>;
  @Column()
  userId: number;
}
