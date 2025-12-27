import { db } from "@/core/db/setup";
import { sendEmail } from "@/core/services/email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { LoginEmail } from "@/components/email-templates/auth/login";
import { user } from "@/core/db/schemas";
import { getEnv } from "./server/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    github: {
      clientId: getEnv("GITHUB_CLIENT_ID"),
      clientSecret: getEnv("GITHUB_CLIENT_SECRET"),
    },
  },
  user: {
    additionalFields: {
      lastName: {
        type: "string",
        required: false,
        input: true,
      },
      handle: {
        type: "string",
        required: false,
        input: true,
      },
      profilePictureUrl: {
        type: "string",
        required: false,
        input: true,
      },
      socialLinks: {
        type: "json",
        required: false,
        input: true,
      },
      birthdate: {
        type: "date",
        required: false,
        input: true,
      },
      gender: {
        type: "string",
        required: false,
        input: true,
      },
      role: {
        type: "string",
        required: true,
        input: false,
      },
      plan: {
        type: "string",
        required: true,
        defaultValue: "free",
        input: false,
      },
    },
  },
  baseURL: getEnv("BETTER_AUTH_URL"),
  secret: getEnv("BETTER_AUTH_SECRET"),
  databaseHooks: {
    user: {
      create: {
        after: async (u) => {
          const authorizedEmails = getEnv("AUTHORIZED_EMAILS")
            .split(" ")
            .map((email) => email.toLowerCase());
          if (authorizedEmails.includes(u.email.toLowerCase())) {
            await db.update(user).set({
              role: "admin",
            });
          }
        },
      },
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        await sendEmail({
          to: email,
          subject: "Sign in to your account",
          component: LoginEmail,
          props: {
            magicLink: url,
            email: email,
            token: token,
          },
        });
      },
    }),
  ],
});

export type User = typeof auth.$Infer.Session.user;
