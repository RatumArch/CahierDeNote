import type { VercelRequest, VercelResponse } from '@vercel/node';
//@ts-ignore
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson';
import { _post, _get } from '../utils/index';

const prisma = new PrismaClient()
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

export default async function newDocument(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()

    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)
    
    const newid = new ObjectId()
    const query = req.query
    const folderCode= req.query?.folderCode
    const title= req.query?.title
    const html=query.html
    const raw= query.raw
    const extra = query?.extra
    

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
        html: '', raw: '',
        modifiedDate: new Date(),
        creationDate: new Date()
    })
      .catch((err: any) => {
        console.error(err)
        res.status(500).send("<strong style='color:red;'>ERREUR</strong>non inséré")
    })

    res.status(200).send(insertion)
    prisma.$disconnect()
}

const createDocument = (req:VercelRequest, res:VercelResponse) => _get(newDocument, req, res)