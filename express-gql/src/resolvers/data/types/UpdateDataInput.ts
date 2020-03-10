import { InputType, Field, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';

import { Data } from '@/entities/Data';

@InputType()
export class UpdateDataInput implements Partial<Data> {
  @Field(() => Int, { nullable: true })
  @Max(30)
  @Min(0)
  number?: number;
}
