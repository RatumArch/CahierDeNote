import type { VercelRequest, VercelResponse } from '@vercel/node';
//@ts-ignore
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson';
import { _post } from '../utils/index';

const prisma = new PrismaClient()
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION

export default async function newDocument(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()

    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)
    
    const newid = new ObjectId()
    const body = req.body
    const folderCode= req.body?.folderCode
    const title= req.body?.title
    const html=body.html
    const raw= body.raw
    const extra = body?.extra
    

    const folder = await prisma.folders.findFirst( { where: {folderCode }, select: {id: true} } )

    const generatedTitle = async () => {
        
        const notesTitles = await prisma.notes.findMany( { where: {folderCode }, select: {title: true}} )
        
        const otherTitles = notesTitles.map((note) => note.title)

        let i=1;
        const standartTitle= 'Document'
        let titleToGenerate= `${standartTitle}`+i
        while( otherTitles.includes( titleToGenerate) ) {
            i++;
            titleToGenerate= `${standartTitle}`+i
        }
        console.log(titleToGenerate);console.log('TitreG')
        return titleToGenerate
    }

    const newDocumentTitle= title ?? await generatedTitle()

    const insertion = await collection.insertOne({
        folderCode,
        folderId: folder?.id,
        title: newDocumentTitle,
        html: '<h2>Your new note</h2>', raw: 'Your new note',
        modifiedDate: new Date(),
        creationDate: new Date()
    })
      .catch((err: any) => {
        console.error(err)
        res.status(500).send("<strong style='color:red;'>ERREUR</strong>non inséré")
    })

    const created = await collection.findOne({_id: new ObjectId(insertion.insertedId)})
    res.status(200).send(created)
    prisma.$disconnect()
}

const createDocument = (req:VercelRequest, res:VercelResponse) => _post(newDocument, req, res)