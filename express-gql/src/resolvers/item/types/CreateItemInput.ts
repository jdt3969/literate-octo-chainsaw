import { InputType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

import { Item } from '@/entities/Item';

@InputType()
export class CreateItemInput implements Partial<Item> {
  @Field(() => Int)
  @Max(30)
  @Min(0)
  number: number;
}
