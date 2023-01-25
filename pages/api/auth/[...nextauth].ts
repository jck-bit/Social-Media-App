import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/utils/connection";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async(credentials:any, req:NextApiRequest, res:NextApiResponse) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const { User } = await connect();

        const user = await User.findOne({ email }).lean().exec()
        if (!user)  return {message:"user does not exist"}
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return {msg:"Invalid credentials"}
        
        return {user}
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);