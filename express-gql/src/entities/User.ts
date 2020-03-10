import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Data } from './Data';
import { Item } from './Item';

import { Lazy } from '@/types/Lazy';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Field()
  @Column({ default: '' })
  firstName: string;

  @Field()
  @Column({ default: '' })
  lastName: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field(() => Data)
  @OneToOne(
    () => Data,
    (data: Data) => data.user,
    { lazy: true }
  )
  data: Lazy<Data>;

  @Field(() => [Item])
  @OneToMany(
    () => Item,
    (item: Item) => item.user,
    { lazy: true }
  )
  items: Lazy<Item[]>;
}
