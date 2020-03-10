import { createMethodDecorator } from 'type-graphql';

import { NotAuthorizedError } from '@/utils/errors';

import { Context } from '@/types/Context';
import { AuthFn } from '@/types/AuthFn';
import { BaseEntityWithUser, BaseEntityWithFirstName } from '@/types/Entity';

export function Auth(authFns: AuthFn[] = []) {
  return createMethodDecorator<Context>(async (resolverData, next) => {
    if (!isUser(resolverData)) {
      throw NotAuthorizedError();
    }

    authFns.forEach((authFn) => {
      if (!authFn(resolverData)) {
        throw NotAuthorizedError();
      }
    });

    return next();
  });
}

const isUser: AuthFn = ({ context: { user } }) => {
  return !!user;
};

export const isOwner: AuthFn<BaseEntityWithUser> = ({
  context: { user, entity },
}) => {
  return user.id === (entity || {}).userId;
};

export const isRandomCheck: AuthFn<BaseEntityWithFirstName> = ({
  context: { user, entity },
}) => {
  if (entity.firstName === 'Simon') {
    return user.firstName[0] === 'L';
  }

  return true;
};
