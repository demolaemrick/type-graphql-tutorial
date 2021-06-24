import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import bcrypt from "bcrypt";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/registerInput";

@Resolver(User)
export class RegisterResolver {
  @Authorized()
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }
}
