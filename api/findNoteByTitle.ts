import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import sanitizeHtml from 'sanitize-html';
// @ts-ignore
import { sanitizeText, clientPromise } from '../utils';
import { Collection } from 'mongodb';

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION

export default async function getNote(req:VercelRequest, res:VercelResponse) {
    const prisma = new PrismaClient()
    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection: Collection = await datab.collection(collec)

    const folderCode = <string>req.query?.folderCode
    const title = <string>req.query?.title

    const note = await collection.findOne({ folderCode, title } )
console.log(note);

    if(note)
        res.send(note)
    else
        res.status(404).send("No document found")
    
}