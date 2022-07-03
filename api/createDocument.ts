import type { VercelRequest, VercelResponse } from '@vercel/node';
import { serializeDoc, clientPromise } from "../utils/index"
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson';
import { _post } from '../utils/index';

const prisma = new PrismaClient()

export default async function newDocument(req: any, res: VercelResponse) {
    const prisma = new PrismaClient()
    
    const newid = new ObjectId()
    const folderCode= req.body.folderCode
    const title= req.body?.title

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
        console.log(titleToGenerate);console.log('Titre généré automatiquement')
        return titleToGenerate
    }

    const newDocumentTitle= title ?? await generatedTitle()

    const insertion = await prisma.notes.create({
        data: {
            raw: '',
            html: '',
            folderCode,
            folderId: folder?.id,
            title: newDocumentTitle
        }
    }).catch(err => { console.error("requête ratée"); })

    res.status(200).send(insertion)
    prisma.$disconnect()
}

const createDocument = (req:VercelRequest, res:VercelResponse) => _post(newDocument, req, res)