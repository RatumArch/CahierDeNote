import type { VercelRequest, VercelResponse } from '@vercel/node';
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function newDocument(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()
    
    const insertion = await prisma.notes.create({
        data: {
            raw: '',
            html: ''
        }
    }).catch(err => { console.error("requête ratée"); })

    res.status(200).send(insertion)
    prisma.$disconnect()
}