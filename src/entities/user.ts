import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', { unique: true }) // unique is not working with MongoDB
  email: string;

  @Column()
  password: string;
}
