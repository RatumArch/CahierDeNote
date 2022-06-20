import { ObjectID } from "bson";
import type { ClientSession } from "mongodb";
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

const prisma = new PrismaClient()

export default async function findManyMongo(req: any, res: any) {
    await prisma.$connect()

    const allnotes = await prisma.notes.findMany()
    res.status(200).send(allnotes)
    
    await prisma.$disconnect()
}