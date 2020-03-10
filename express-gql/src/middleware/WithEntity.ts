import { createMethodDecorator } from 'type-graphql';
import { BaseEntity } from 'typeorm';

import { Context } from '@/types/Context';

export function WithEntity(Entity: typeof BaseEntity) {
  return createMethodDecorator<Context>(async ({ args, context }, next) => {
    const entity = await Entity.findOne(args.id);

    context.entity = entity;

    return next();
  });
}
