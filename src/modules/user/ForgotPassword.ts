import { Resolver, Mutation, Arg } from "type-graphql";

import { User } from "../../entity/User";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import { forgotPasswordPrefix } from "../constants/redisPrefixes"

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean | undefined> {
    const user = await User.findOne({email: email});

    if(!user) return

    await sendEmail(email, await createConfirmationUrl(user.id, forgotPasswordPrefix))

    return true
  }
}
