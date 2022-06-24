import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import { _get, _post } from '../utils/index.js'
import { PrismaClient } from '@prisma/client'

import sanitizeHtml from 'sanitize-html';
import katex from 'katex';


async function findLast(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()
    let results: any = await prisma.notes.findMany({ 
        orderBy: [ { id: 'desc' }],
        take: 1
    })
    .catch(err => { console.error("requête ratée");
    })

    results[0].html = sanitizeHtml( results[0]?.html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['image-input', 'latex-block']),
        allowedAttributes: {
            "image-input": ['src', 'nodeId', 'nodeid'], 
            "latex-block": [ 'rawText', 'rawtext', 'nodeId', 'nodeid']
        }
    })
    
  
    const lastDoc = results[0]
    
    res.status(200).send(lastDoc)
    prisma.$disconnect()
}

const findLast2 = (req: VercelRequest, res: VercelResponse) => _get(findLast, req, res) 

export default findLast2