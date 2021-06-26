import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../types/MyContext";
export const IsAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) throw new Error("Unauthorized access! You need to authenticate");
  return next();
};
