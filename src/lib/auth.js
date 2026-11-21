import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db } from "./mongodb";

const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();

/**
 * Better Auth (server). Users live in MongoDB (collection "user").
 * The jwt plugin publishes a JWKS at /api/auth/jwks and issues JWTs at /api/auth/token.
 * The Express API verifies those JWTs - see server/src/middlewares/auth.middleware.js
 */
export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.BETTER_AUTH_URL].filter(Boolean),

  emailAndPassword: { enabled: true, autoSignIn: true, minPasswordLength: 6 },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  user: {
    additionalFields: {
      // input:false -> a client can never choose its own role
      role: { type: "string", required: false, defaultValue: "customer", input: false },
      phone: { type: "string", required: false },
      address: { type: "string", required: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: { ...user, role: adminEmail && user.email?.toLowerCase() === adminEmail ? "admin" : "customer" },
        }),
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const pw = ctx.body?.password || "";
        if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw)) {
          throw new APIError("BAD_REQUEST", { message: "Password must include an uppercase and a lowercase letter" });
        }
      }
    }),
  },

  plugins: [
    jwt({
      jwt: {
        expirationTime: "1h",
        definePayload: ({ user }) => ({ id: user.id, email: user.email, name: user.name, role: user.role }),
      },
    }),
    nextCookies(),
  ],
});
