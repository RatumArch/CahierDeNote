import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'


export default async function getNote(req:VercelRequest, res:VercelResponse) {
    const prisma = new PrismaClient()
    
    const folderCode = req.body.query?.folderCode
    const title = req.body.query?.title

    const folder = await prisma.folders.findUnique({
        where: {
            folderCode
        },
        select: {
            id: true
        }
    })

    const note = await prisma.notes.findFirst({
        where: {
            folderId: folder?.id,
            title
        }
    })

    prisma.$disconnect()
    res.status(200).send(note)
}