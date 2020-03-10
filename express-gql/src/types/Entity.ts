import { BaseEntity } from 'typeorm';

export interface BaseEntityWithUser extends BaseEntity {
  userId: number;
}

export interface BaseEntityWithFirstName extends BaseEntity {
  firstName: string;
}
