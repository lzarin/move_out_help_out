import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import type { Role } from "@/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: Role;
      organizationId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: Role;
    organizationId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    organizationId?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        try {
          // Demo: accept any email + password "demo" and assign role from query
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { organization: true },
          });
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role as Role,
              organizationId: user.organizationId,
            };
          }
          // Create demo user on first login (dev convenience)
          if (process.env.NODE_ENV === "development" && credentials.password === "demo") {
            const role = (credentials.role as Role) || "DONOR";
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split("@")[0],
                role,
              },
            });
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              image: newUser.image,
              role: newUser.role as Role,
              organizationId: newUser.organizationId,
            };
          }
          return null;
        } catch (err) {
          console.error("[auth] Database error during sign-in:", err);
          const url = process.env.DATABASE_URL ?? "";
          if (url.startsWith("file:") && process.env.NODE_ENV === "development") {
            throw new Error(
              "Database is set to SQLite (file:...) but the app uses PostgreSQL. " +
              "Set DATABASE_URL in .env to a Postgres URL (e.g. from Neon or Railway). See DEPLOY-STEPS.md."
            );
          }
          throw err;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.organizationId = user.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.organizationId = token.organizationId;
      }
      return session;
    },
  },
};
