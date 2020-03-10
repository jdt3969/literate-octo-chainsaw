import {
  Resolver,
  ID,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { Item } from '@/entities/Item';

import { Auth } from '@/middleware/Auth';

import { Context } from '@/types/Context';
import { CreateItemInput } from './types/CreateItemInput';
import { UpdateItemInput } from './types/UpdateItemInput';

@Resolver(() => Item)
export class ItemResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get all Item rows
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return Item.find();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Get Item by id
  //////////////////////////////////////////////////////////////////////////////
  @Query(() => Item)
  async item(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Item> {
    return Item.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Create Item
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    const data = {
      ...input,
      userId: ctx.user.id,
    };

    return Item.create(data).save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update Item
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => Item)
  async updateItem(
    @Arg('id', () => ID) id: number,
    @Arg('input') input: UpdateItemInput,
    @Ctx() ctx: Context
  ): Promise<Item> {
    const entity = await Item.findOne(id);

    await Item.merge(entity, input);

    return entity.save();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Delete Item
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => Boolean)
  async deleteItem(
    @Arg('id', () => ID) id: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const entity = await Item.findOne(id);

    await entity.remove();

    return true;
  }
}
