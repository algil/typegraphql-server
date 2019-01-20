import { Mutation, Resolver, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/user';
import { UserInput } from './user-input';
import { AuthPayload } from './auth-payload';
import config from '../../config';

@Resolver(User)
export class AuthResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') userInput: UserInput): Promise<User> {
    const { firstName, lastName, email, password } = userInput;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<AuthPayload> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret!);

    return {
      token,
      user
    };
  }
}
