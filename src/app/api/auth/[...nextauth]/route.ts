import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import signupSchema, { ISignupSchema } from "@/schemas/signupSchema";

const prisma = new PrismaClient();

const handler = NextAuth({
  debug: true,
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // Twitter({
    //   clientId: process.env.TWITTER_CLIENT_ID as string,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    // }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        try {
          const validatedData: ISignupSchema = signupSchema.parse(credentials);

          const { email, password, username } = validatedData;

          let user = await prisma.user.findUnique({
            where: { email },
            include: {
              wishlist: true,
              watchedAnimes: true,
              likedAnimes: true,
              dislikedAnimes: true,
              genresWatched: true,
            },
          });

          if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);

            user = await prisma.user.create({
              data: {
                email,
                password: hashedPassword,
                name: username,
                description: "Welcome to Anime World!",
              },
              include: {
                wishlist: true,
                watchedAnimes: true,
                likedAnimes: true,
                dislikedAnimes: true,
                genresWatched: true,
              },
            });
          } else {
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password ?? ""
            );

            if (!isPasswordValid) {
              throw new Error("Invalid email or password.");
            }
          }

          const userForSession = {
            id: user.id,
            name: user.name,
            email: user.email,
            wishlist: user.wishlist,
            watchedAnimes: user.watchedAnimes,
            likedAnimes: user.likedAnimes,
            dislikedAnimes: user.dislikedAnimes,
            genresWatched: user.genresWatched,
          };

          return userForSession;
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Invalid credentials or internal error.");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
  callbacks: {
    async session({ session, user }: any) {
      session.user.id = user.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
