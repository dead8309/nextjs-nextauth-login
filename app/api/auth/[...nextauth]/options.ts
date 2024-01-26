import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const exisitngUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!exisitngUser) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          exisitngUser.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: `${exisitngUser.id}`,
          username: exisitngUser.username,
          email: exisitngUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        return {
          ...token,
          username: user.username,
          id: user.id,
        }
      }
      return token
    },
    async session({session, token, user}) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          id: token.id,
        }
      }
    }
  }
};
