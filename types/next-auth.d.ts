import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      image?: string | null;
      moonId?: string;
      role?: string;
    };
  }
}
