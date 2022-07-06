import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import { _get, sanitizeText } from '../utils/index.js'}

async function findFolder(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()

    const folderCode = <string>req.query?.folderCode
    
    const folder = await prisma.folders.findMany({
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
console.log(folder?.[0]?.notesContent);console.log("/folder");

const sanitizedFolder = folder?.[0]?.notesContent.map((note) => note.html = sanitizeText(note?.html))

    prisma.$disconnect()
    res.status(200).send(sanitizedFolder)
}

const findFolder2 = (req: VercelRequest, res: VercelResponse) => _get(findFolder, req, res)

export default findFolder2