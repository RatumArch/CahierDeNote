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
    const expr = katex.renderToString('(x^2 + y/2 = z/2)');    

    results[0].html = expr +'<br/>'+ sanitizeHtml( expr, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['image-input']),
        allowedAttributes: {"image-input": ['src', 'nodeId']}
    })
    
  
    const lastDoc = results[0]
    
    res.status(200).send({html: expr})
    prisma.$disconnect()
}

const findLast2 = (req: VercelRequest, res: VercelResponse) => _get(findLast, req, res) 

export default findLast2