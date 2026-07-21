import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Reuse the connection across serverless invocations / HMR reloads instead
// of opening a new one per request — Vercel/Render functions are short-lived
// and a fresh connection every call would exhaust the Atlas connection pool.
declare global {
  // eslint-disable-next-line no-var
  var _moonlightMongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._moonlightMongoose || { conn: null, promise: null };
global._moonlightMongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it in Render → your service → Environment.'
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || undefined,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default dbConnect;
