import { BaseEntity } from 'typeorm';

import { User } from '@/entities/User';

export interface Context<T = BaseEntity> {
  user: User;
  entity: T;
}
