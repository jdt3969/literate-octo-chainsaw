import { Resolver, ID, Query, Mutation, Arg, Ctx } from 'type-graphql';

import { Data } from '@/entities/Data';

import { Auth, isOwner } from '@/middleware/Auth';
import { WithEntity } from '@/middleware/WithEntity';

import { Context } from '@/types/Context';
import { CreateDataInput } from './types/CreateDataInput';
import { UpdateDataInput } from './types/UpdateDataInput';

@Resolver(() => Data)
export class DataResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get Data by id
  //////////////////////////////////////////////////////////////////////////////
  @WithEntity(Data)
  @Auth([isOwner])
  @Query(() => Data)
  async data(
    @Arg('id', () => ID) id: number,
    @Ctx() { entity }: Context<Data>
  ): Promise<Data> {
    return entity;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Data
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => Data)
  async createData(
    @Arg('input') input: CreateDataInput,
    @Ctx() ctx: Context
  ): Promise<Data> {
    const data = {
      ...input,
      userId: ctx.user.id,
    };

    return Data.create(data).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Data
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => Data)
  async updateData(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateDataInput,
    @Ctx() ctx: Context
  ): Promise<Data> {
    const entity = await Data.findOne(id);

    await Data.merge(entity, input);

    return entity.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Data
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => Boolean)
  async deleteData(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const entity = await Data.findOne(id);

    await entity.remove();

    return true;
  }
}
