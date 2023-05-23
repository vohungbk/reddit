import { User } from "../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";

@Resolver()
export class UserResolvers {
  @Mutation((_returns) => User)
  async register(@Arg("email") email: string, @Arg("username") username: string, @Arg("password") password: string): Promise<User | null> {
    try {
      const existingUser = await User.findOne({ where: [{ username }, { email }] });

      if (existingUser) return null;

      const hashPassword = await argon2.hash(password);

      const newUser = User.create({
        username,
        password: hashPassword,
        email,
      });

      return await newUser.save();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
