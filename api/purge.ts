import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection } from 'mongodb';

//@ts-ignore
import {clientPromise} from "../utils";
import { sanitizeText } from '../utils';

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollec= process.env.MONGODB_DB_FOLDER_COLLECTION

export default async function purge(req:any, res:any) {
    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)
    const collection2 = await datab.collection(foldersCollec)

    const deletedNotes = await collection.deleteMany()
    const deletedFolders = await collection2.deleteMany()

    res.status(200).send({
        notes: deletedNotes,
        folders: deletedFolders
    })

}