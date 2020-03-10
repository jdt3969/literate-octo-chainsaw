import { InputType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

import { Item } from '@/entities/Item';

@InputType()
export class UpdateItemInput implements Partial<Item> {
  @Field(() => Int, { nullable: true })
  @Max(30)
  @Min(0)
  number?: number;
}
