import { connect } from "@/utils/connection";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
          const { User } = await connect()

          const user = await User.findOne({ email }).lean().exec()

          if(!user) {
            throw new Error("User with That email does not Exist")
          }
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) {
            throw new Error("Wrong Password")
          }
          
          console.log({user, id:user._id, name:user.username, image:user.image, friends:user.friends})
        return {user, id:user._id, name:user.username, image:user.image, friends: user.friends}
      }
     
    }),
  ],
  secret:"anystring",

  pages: {
    signIn: "/auth/signin",
  },
    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) {
          session.user.id = token.uid;
        }
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      }, 
      
    },
    session: {
      strategy: "jwt",
    },
}
export default NextAuth(authOptions);