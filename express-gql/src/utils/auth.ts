import { Handler, Request } from 'express';

import { User } from '@/entities/User';

declare module 'express-serve-static-core' {
  interface Request {
    user: User;
  }
}

export const authHandler: Handler = async (req: Request, _, next) => {
  const token = req.get('authorization');

  if (token) {
    const user = await User.findOne(token);

    if (user) {
      req.user = user;
    }
  }

  next();
};
