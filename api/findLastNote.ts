import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import { _get, _post } from '../utils/index.js'
import { PrismaClient } from '@prisma/client'



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

    const lastDoc = results
    res.send(lastDoc)
    prisma.$disconnect()
}

const findLast2 = (req: VercelRequest, res: VercelResponse) => _get(findLast, req, res) 

export default findLast2