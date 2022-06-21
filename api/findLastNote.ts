import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import { _get, _post } from '../utils/index.js'
import { PrismaClient } from '@prisma/client'



async function findLast(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()
    const results: any = await prisma.notes.findMany({ 
        orderBy: [ { id: 'desc' }],
        take: 1
    }).catch(err => { console.error("requête ratée");
    })

    const lastDoc = results[0]
    res.status(200).send(lastDoc)
    prisma.$disconnect()
}

const findLast2 = (req: VercelRequest, res: VercelResponse) => _get(findLast, req, res) 

export default findLast2