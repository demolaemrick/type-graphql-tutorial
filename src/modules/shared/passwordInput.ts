import { MinLength } from "class-validator";
import { InputType, Field, ClassType } from "type-graphql";

//made this mixin so I will be able to perform multiple inheritance in graphql
export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
    @InputType({ isAbstract: true })
  class PasswordInput extends BaseClass {
    @Field()
    @MinLength(5)
    password: string;
  }

  return PasswordInput;
};
