import { ObjectType, Field } from 'type-graphql';
import { User } from '../../entities/user';

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field()
  user: User;
}
