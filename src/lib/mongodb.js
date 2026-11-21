import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not defined");

// reuse one client across hot reloads / serverless invocations
const g = globalThis;
g._rigrentMongo ??= new MongoClient(uri);

export const client = g._rigrentMongo;
export const db = client.db(process.env.MONGODB_DB || "rigrent");
