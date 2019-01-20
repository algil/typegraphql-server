import { Mutation, Resolver, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/user';

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
