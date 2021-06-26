import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../shared/passwordInput"

@InputType()
export class changePasswordInput extends PasswordInput{
  @Field()
  token: string;
}
