import "server-only";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/core/database/prisma";
import bcryptjs from "bcryptjs";

interface JwtMutable {
  id?: string;
  role?: string;
}

interface SessionUserMutable {
  id?: string;
  role?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SessionMutable {
  user?: SessionUserMutable;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const input = credentials.email.trim().toLowerCase();
        
        // Static admin user override
        if ((input === "michaelb" || input === "michaelb@biggsfundingsolutions.com") && credentials.password === "Biggs2026!") {
          return {
            id: "admin-michaelb",
            email: "michaelb@biggsfundingsolutions.com",
            role: "ADMIN",
            name: "Michael B",
          };
        }

        if ((input === "admin" || input === "admin@biggsfundingsolutions.com") && credentials.password === "Beograd1991!@#") {
          return {
            id: "admin-system",
            email: "admin@biggsfundingsolutions.com",
            role: "ADMIN",
            name: "System Administrator",
          };
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const tokenMutable = token as JwtMutable;
        tokenMutable.id = user.id;
        tokenMutable.role = user.role ?? "CLIENT";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionMutable = session as SessionMutable;
        sessionMutable.user = {
          ...session.user,
          id: token["id"] as string | undefined,
          role: token["role"] as string | undefined,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env["NEXTAUTH_SECRET"] ?? process.env["JWT_SECRET"],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
