import type { VercelRequest, VercelResponse } from '@vercel/node';
import { _post } from '../utils'
//@ts-ignore
import {clientPromise} from "../utils";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const foldersCollection= process.env.MONGODB_DB_FOLDER_COLLECTION


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
        raw: 'New Note',
        html: `<h1 style="font-family: 'Fira Code'"  >New Note</h1> <p style="font-family: 'Fira Code'">Copy URL link or folder Code to share and save your notes</p>`,
        folderCode: newFolderCode                       
        })
    
    res.send({FolderInsertion: insertedFolder, folderCode: newFolderCode})
    
}
const newFolder4 = (req: VercelRequest, res: VercelResponse) => _post(newFolder3, req, res)

export default newFolder4