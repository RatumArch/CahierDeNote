import type { VercelRequest, VercelResponse } from '@vercel/node';
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

const prisma = new PrismaClient()

export default async function findManyMongo(req: any, res: VercelResponse) {
    await prisma.$connect()
                .catch(err => { 
                    console.error("getMong2 - Prisma connection ratée"); console.error(err);
                    res.status(400).send("getMong2 - Prisma connection ratée")
                })

    const allnotes = await prisma.notes.findMany()    
    await prisma.$disconnect()
    res.status(200).send(allnotes)
}