import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator
} from 'class-validator';
import { User } from '../../entities/user';

@ValidatorConstraint({ name: 'emailExists', async: true })
class EmailExistsValidator implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    return !user;
  }

  defaultMessage(): string {
    return 'email already exists';
  }
}

export function EmailExits(options?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: EmailExistsValidator
    });
  };
}
