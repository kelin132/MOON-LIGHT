import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Moon ID',
      credentials: {
        moonId: { label: 'Moon ID', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.moonId || !credentials?.password) return null;

        await dbConnect();
        const user = await User.findOne({ moonId: credentials.moonId }).lean();

        // No account, or account was never given website access
        // (webPassword null means the bot hasn't granted a web login yet).
        if (!user || !user.webPassword) return null;

        const valid = await bcrypt.compare(credentials.password, user.webPassword);
        if (!valid) return null;

        if (user.suspended) {
          // Block suspended accounts from logging in at all.
          throw new Error('SUSPENDED');
        }

        return {
          id: String(user._id),
          moonId: user.moonId,
          name: user.username || user.moonId,
          role: user.role || 'Member',
          image: user.avatarUrl || null,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.moonId = (user as any).moonId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).moonId = token.moonId;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
