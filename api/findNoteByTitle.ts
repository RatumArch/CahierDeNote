import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import sanitizeHtml from 'sanitize-html';

export default async function getNote(req:VercelRequest, res:VercelResponse) {
    const prisma = new PrismaClient()
    
    const folderCode = req.body.query?.folderCode
    const title = req.body.query?.title

    const folder = await prisma.folders.findFirst({
        where: {
            folderCode: folderCode
        },
        select: {
            id: true
        }
    })

    const note = await prisma.notes.findFirst({
        where: {
            folderId: folder?.id,
            title
        },
        orderBy: {
            modifiedDate: 'desc',
        }
    })

    if(note) {
        note.html = sanitizeHtml( note?.html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['image-input', 'latex-block']),
            allowedAttributes: {
                "image-input": ['src', 'nodeId', 'nodeid'], 
                "latex-block": [ 'rawText', 'rawtext', 'nodeId', 'nodeid']
            }
        })
    }
    
    prisma.$disconnect()
    res.status(200).send(note)
}