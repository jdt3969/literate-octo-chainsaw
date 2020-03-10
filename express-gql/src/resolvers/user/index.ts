import { Resolver, ID, Query, Mutation, Arg, Ctx } from 'type-graphql';

import { User } from '@/entities/User';

import { randomInt } from '@/utils/functions';
import { InvalidCredentialsError } from '@/utils/errors';

import { Auth, isRandomCheck } from '@/middleware/Auth';

import { RegisterInput } from './types/RegisterInput';
import { LoginInput } from './types/LoginInput';
import { LoginSuccess } from './types/LoginSuccess';
import { UpdateUserInput } from './types/UpdateUserInput';
import { Context } from '@/types/Context';
import { Data } from '@/entities/Data';
import { WithEntity } from '@/middleware/WithEntity';

@Resolver()
export class UserResolver {
  //////////////////////////////////////////////////////////////////////////////
  // Get User By Id
  //////////////////////////////////////////////////////////////////////////////
  @WithEntity(User)
  @Auth([isRandomCheck])
  @Query(() => User)
  async user(@Arg('id', () => ID) id: number): Promise<User> {
    return User.findOne(id);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Login
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => LoginSuccess)
  async login(
    @Arg('input') { email, password }: LoginInput
  ): Promise<LoginSuccess> {
    const user = await User.findOne({ email });

    if (!user) {
      throw InvalidCredentialsError();
    }

    const valid = user.password === password; // await bcrypt.compare(password, user.password);

    if (!valid) {
      throw InvalidCredentialsError();
    }

    const token = '' + user.id; // sign(user);

    return { user, token };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Register
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => LoginSuccess)
  async register(
    @Arg('input')
    { email, password }: RegisterInput
  ): Promise<LoginSuccess> {
    const hashedPassword = password; // await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
    }).save();

    await Data.create({ number: randomInt(0, 30), user }).save();

    const token = '' + user.id; // sign(user);

    return { user, token };
  }

  //////////////////////////////////////////////////////////////////////////////
  // Update User
  //////////////////////////////////////////////////////////////////////////////
  @Mutation(() => User)
  async updateUser(
    @Arg('input') input: UpdateUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const entity = await User.findOne(ctx.user.id);

    await User.merge(entity, input);

    return await entity.save();
  }
}
