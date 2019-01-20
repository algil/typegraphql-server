import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { EmailExits } from './email-exists.validator';

@InputType()
export class UserInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @Length(1, 255)
  @EmailExits()
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
