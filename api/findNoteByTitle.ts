import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import sanitizeHtml from 'sanitize-html';
import { sanitizeText } from '../utils';

export default async function getNote(req:VercelRequest, res:VercelResponse) {
    const prisma = new PrismaClient()
    
    const folderCode = <string>req.query?.folderCode
    const title = <string>req.query?.title


    const note = await prisma.notes.findFirst({
        where: {
            folderCode,
            title
        },
        orderBy: {
            modifiedDate: 'desc',
        }
    })

    if(note) {
        note.html = sanitizeText( note?.html )
    }

    prisma.$disconnect()
    console.log(note);
    
    res.status(200).send(note)
}