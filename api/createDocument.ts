import type { VercelRequest, VercelResponse } from '@vercel/node';
//@ts-ignore
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson';
import { _post } from '../utils/index';
import { Collection } from 'mongodb';

const prisma = new PrismaClient()
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION

async function newDocument(req: any, res: VercelResponse) {

    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection: Collection = await datab.collection(collec)
    
    const newid = new ObjectId()
    const body = req.body
    const folderCode= req.body?.folderCode
    const title= req.body?.title
    const html=body?.html
    const raw= body?.raw
    const extra = body?.extra
    

    const generatedTitle = async () => {
        console.log("We generate");
        
        const countDocs = await collection.countDocuments({ folderCode })
        console.log(countDocs);
        console.log({ folderCode });
        
        
        const standartTitle= 'New Note '
        let titleToGenerate= title ?? standartTitle+countDocs
        let otherTitles= await collection.find({ folderCode, title: titleToGenerate }).project({ title: 1, _id: 0 }).toArray() 
        
        if(otherTitles?.length===0)
            return titleToGenerate
        if(otherTitles?.length>0)
         return { status: 'error', message: 'title Already Exists'}
    }

    const newDocumentTitle= await generatedTitle()

    const toInsert = {
        folderCode,
        title: newDocumentTitle,
        html: '<h2>Your new note</h2>', raw: 'Your new note',
        modifiedDate: new Date(),
        creationDate: new Date()
    }
    const insertion = await collection.insertOne(toInsert)
console.log(insertion);console.log(toInsert);

    if(newDocumentTitle?.status ==='error')
        res.status(400).send(newDocumentTitle)
    if(insertion)
        // toInsert contient un champ _id une fois la requête 'insertion' effectué
        res.status(200).send(toInsert)
    else
        res.status(400).send("error inconnue")
}

const createDocument = (req:VercelRequest, res:VercelResponse) => _post(newDocument, req, res)
export default createDocument