import { v4 as uuid } from "uuid";
import { redis } from "../../redis";

export const createConfirmationUrl = async (
  userId: number,
  redisPrefix: string
) => {
  const token = uuid();
  await redis.set(redisPrefix + token, userId, "ex", 60 * 60 * 24); //1 day expiration

  let url = `https://localhost:3000/user/confirm/${token}`;
 
  if (redisPrefix === "forgot-password") {
    url = `https://localhost:3000/user/change-password/${token}`;
  }
  return url;
};
