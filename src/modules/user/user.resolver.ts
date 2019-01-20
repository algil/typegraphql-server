import { Mutation, Resolver, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/user';
import { UserInput } from './user-input';

@Resolver(User)
export class UserResolver {
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
}
