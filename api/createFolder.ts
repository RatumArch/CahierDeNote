import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import { _post } from '../utils'

const prisma = new PrismaClient()

async function newFolder(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()
    const date = new Date()
    
    const newFolderCode = date.getDate().toString()+date.getMonth().toString()+date.getHours()+date.getMinutes()
    const newDocumentTitle = 'Document1'

    const insertion = await prisma.folders.create({
        data: {
            folderCode: newFolderCode,
            notesContent: {
                create: [{
                    title: newDocumentTitle,
                    raw: 'Your New Note',
                    html: `<p>Your New Note</p>   <em>${date}</em>`,
                    folderCode: newFolderCode                       
                    }
                ]
            }
        },
        include: {
            notesContent: true // Inclut la note généré dans le résultat de la requête
        }
    }).catch(err => { console.error(err); })
    

    res.status(200).send(insertion)
    prisma.$disconnect()
}

const newFolder2 = (req: VercelRequest, res: VercelResponse) => _post(newFolder, req, res)

export default newFolder2