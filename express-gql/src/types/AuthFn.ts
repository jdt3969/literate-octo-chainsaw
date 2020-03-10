import { ResolverData } from 'type-graphql';
import { BaseEntity } from 'typeorm';

import { Context } from '@/types/Context';

export type AuthFn<T = BaseEntity> = (
  resolverData: ResolverData<Context<T>>
) => boolean;
