import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore
import { serializeDoc, clientPromise, _post } from "../utils/index"
import { PrismaClient } from '@prisma/client'
import { Collection } from 'mongodb';

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function feedBack(req: any, res: VercelResponse) {
   // @ts-ignore
   const client = await clientPromise.then((client: ClientSession) => client)
   const datab = client.db(db)
   const collection: Collection = await datab.collection("feedbacks")

   let body = req?.body

   const inserted = await collection.insertOne(body)
   res.send(inserted)
}