import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import { _post } from '../utils'
//@ts-ignore
import {clientPromise} from "../utils";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION

const prisma = new PrismaClient()

async function newFolder(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()
    const date = new Date()
    
    const randomLetter= () => String.fromCharCode( Math.random()*26 +65) // 65 est le points de code UTF-16 de 'A'
    const newFolderCode = randomLetter()+ date.getDate().toString()+date.getMonth().toString()+date.getHours()+date.getMinutes() + randomLetter()
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

//export default newFolder2

async function newFolder3(req: VercelRequest, res: VercelResponse) {
    // @ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collectionFolder = await datab.collection(foldersCollection)
    const collectionNotes = await datab.collection(collec)

    const date = new Date()

    const randomLetter= () => String.fromCharCode( Math.random()*26 +65) // 65 est le points de code UTF-16 de 'A'
    const newFolderCode = randomLetter()+ date.getDate().toString()+date.getMonth().toString()+date.getHours()+date.getMinutes() + randomLetter()
    const newDocumentTitle = 'Document1'

    const insertedFolder = await collectionFolder.insertOne({
        folderCode: newFolderCode
    })
    
    const insertedDocument = await collectionNotes.insertOne({
        title: newDocumentTitle,
        raw: 'Your New Note',
        html: `<p>Your New Note</p>   <em>${date}</em>`,
        folderCode: newFolderCode                       
        })
    
    res.send({FolderInsertion: insertedFolder, folderCode: newFolderCode})
    
}
const newFolder4 = (req: VercelRequest, res: VercelResponse) => _post(newFolder3, req, res)

export default newFolder4