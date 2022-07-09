import type { VercelRequest, VercelResponse } from '@vercel/node';
import { notes, PrismaClient } from '@prisma/client'
// @ts-ignore
import { _get, clientPromise, sanitizeText, mapSerializeDocs } from '../utils/index.js'
import { Collection } from 'mongodb';

const prisma = new PrismaClient()
const db = process.env.MONGODB_DB
const notesCollec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION

async function findFolder(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()

    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection: Collection = await datab.collection(notesCollec)

    const folderCode = <string>req.query?.folderCode
    
    const notes = await collection.find({
        folderCode
    })
    .sort({ modifiedDate: -1 })
    .toArray()
    .then((notes) => notes.map((note: any) => { note.html = sanitizeText(note.html); return note } ) )
    .catch((err) => { 
        res.status(404).send("Ce dossier est introuvable")
        return null
     })
     
    prisma.$disconnect()
    res.status(200).send(notes)
}

const findFolder2 = (req: VercelRequest, res: VercelResponse) => _get(findFolder, req, res)

export default findFolder2