import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore
import { sanitizeText, clientPromise } from '../utils';
import { Collection } from 'mongodb';

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION

export default async function getNote(req:VercelRequest, res:VercelResponse) {
    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection: Collection = await datab.collection(collec)

    const folderCode = <string>req.query?.folderCode
    const title = <string>req.query?.title

    const note = await collection.findOne({ folderCode, title } )


    if(note)
    {
        note.html = sanitizeText(note?.html)
        res.send(note)
    }
    else
        res.status(404).send("No document found")
    
}