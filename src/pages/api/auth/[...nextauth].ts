import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '@/api';
import axios from 'axios';

export type IToken = {
  access: string;
  refresh: string;
};

type IUser = {
  id: string;
  email: string;
  username: string;
  is_author: boolean;
  access: string;
  refresh: string;
};

export type ISession = {
  user: IUser;
  expires: string;
  access: string;
  refresh: string;
};

export default NextAuth({
  secret: 'islamka',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          const data = await api.AuthService.login(credentials.username, credentials.password);

          if (data) {
            return {
              access: data.access_token,
              refresh: data.refresh_token,
              ...data.user,
            };
          } else {
            return null;
          }
        }
      },
    }),
  ],

  jwt: {
    secret: 'islamka',
    maxAge: 24 * 60 * 60 * 1, // 1 day
  },
  session: {
    maxAge: 24 * 60 * 60 * 1, // 1 day
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn() {
      return true;
    },
    // @ts-ignore
    async jwt({ token, user }: { token: IToken; user: IUser }) {
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;
        // @ts-ignore
        token.email = user.email;
        // @ts-ignore
        token.username = user.username;
        // @ts-ignore
        token.id = user.id;
        // @ts-ignore
        token.is_author = user.is_author;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }: { session: ISession; token: IToken }) {
      session.access = token.access;
      session.refresh = token.refresh;
      // @ts-ignore
      session.user.is_author = token.is_author;
      // @ts-ignore
      session.user.email = token.email;
      // @ts-ignore
      session.user.username = token.username;
      // @ts-ignore
      session.user.id = token.id;

      return session;
    },
  },
});
