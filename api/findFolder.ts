import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import { _get } from '../utils/index.js'

async function findFolder(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()

    const folderCode = <string>req.query?.folderCode
    console.log(folderCode);console.log("/folderCode");
    
    const folder = await prisma.folders.findFirst({
        where: {
            folderCode
        },
        include: {
            notesContent: {
                orderBy: {
                    modifiedDate: 'desc'
                }
            }
        }
    })
    .catch((err) => { 
        res.status(404).send("Ce dossier est introuvable")
        return null
     })
console.log(folder?.notesContent);console.log("/folder");


    prisma.$disconnect()
    res.status(200).send(folder)
}

const findFolder2 = (req: VercelRequest, res: VercelResponse) => _get(findFolder, req, res)

export default findFolder2