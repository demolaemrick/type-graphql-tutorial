import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server-express";

import { User } from "../../entity/User";
import { MyContext } from "../types/MyContext";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ email: email });
    if (!user) throw new UserInputError("User does not exist");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UserInputError("Incorrect password");
    if (!user.confirmed) throw new Error("Hey confirm your email");
    ctx.req.session.userId = user.id;
    return user;
  }
}
