import * as jToken from "jsonwebtoken";
import _ from "underscore";

import { Response } from "express";

import { UserModel } from "../models/User";
export interface IUser {
  _id: string;
  email: string;
  name: string;
}
export const generateToken = (user: any): string => {
  // console.log("TCL: user", user);
  const claims = {
    id: user._id,
    name: user.name,
    email: user.email
  };

  return jToken.sign(claims, process.env.JWT_SECRET);
};

export const sendResponseWithTokenInHeader = (res: Response, user: UserModel) => {
  const myToken = generateToken(user);
  return res
    .header("x-auth-token", myToken)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, "_id", "name", "email"));
};
