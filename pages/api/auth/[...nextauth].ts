import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

const authOptions:NextAuthOptions ={
    session:{
        strategy: 'jwt'
    },
    providers:[
        CredentialsProvider({
            type:'credentials',
            credentials:{},
            authorize(credentials, req){
                const {} = credentials
            }
        })
    ]
}

export default NextAuth(authOptions);