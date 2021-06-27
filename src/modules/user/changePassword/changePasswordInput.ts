import { InputType, Field } from "type-graphql";
import { PasswordMixin } from "../../shared/passwordInput"

@InputType()
export class changePasswordInput extends PasswordMixin(class {}){
  @Field()
  token: string;
}
