import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";

import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { changePasswordInput } from "./changePassword/changePasswordInput";
import { MyContext } from "../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true})
  async changePassword(
    @Arg("data") { token, password }: changePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) return null;

    const user = await User.findOne(userId);
    if (!user) return null;

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    ctx.req.session.userId = user.id;
    return user;
  }
}