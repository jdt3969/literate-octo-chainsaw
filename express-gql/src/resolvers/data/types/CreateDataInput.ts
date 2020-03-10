import { InputType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

import { Data } from '@/entities/Data';

@InputType()
export class CreateDataInput implements Partial<Data> {
  @Field(() => Int)
  @Max(30)
  @Min(0)
  number: number;
}
