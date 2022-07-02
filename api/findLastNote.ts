import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import { _get, _post } from '../utils/index.js'
import { PrismaClient } from '@prisma/client'

import sanitizeHtml from 'sanitize-html';
import katex from 'katex';


async function findLast(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()

    const folderCode = <string>req.query?.folderCode
    console.log(folderCode);
    
    const folder = await prisma.folders.findFirst({
        where: {
            folderCode
        },
        select: {
            id: true
        }
    })
    const results: any = await prisma.notes.findFirst({
        where: {
            folderId: folder?.id
        },
        orderBy: {
            modifiedDate: 'desc'
        }
    }).catch(err => { res.status(403); return err})

    results.html = sanitizeHtml( results?.html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['image-input', 'latex-block']),
        allowedAttributes: {
            "image-input": ['src', 'nodeId', 'nodeid'], 
            "latex-block": [ 'rawText', 'rawtext', 'nodeId', 'nodeid']
        }
    })
    
  
    const lastDoc = results
    
    res.status(200).send(lastDoc)
    prisma.$disconnect()
}

const findLast2 = (req: VercelRequest, res: VercelResponse) => _get(findLast, req, res) 

export default findLast2