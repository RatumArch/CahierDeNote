import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import sanitizeHtml from 'sanitize-html';
import { sanitizeText } from '../utils';

export default async function getNote(req:VercelRequest, res:VercelResponse) {
    const prisma = new PrismaClient()
    
    const folderCode = <string>req.query?.folderCode
    const title = <string>req.query?.title


    let notes = await prisma.notes.findMany({
        where: {
            folderCode,
            title
        },
        orderBy: {
            modifiedDate: 'desc',
        }
    })

    prisma.$disconnect()

    if(notes) {
        notes = notes.map((doc) => {doc.html = sanitizeText( doc?.html ); return doc })
        console.log(notes);
    
        res.status(200).send(notes[0])
    }
    else {
        res.status(495).send({status: 'error', message: "requête ratée"})
    }
    
}