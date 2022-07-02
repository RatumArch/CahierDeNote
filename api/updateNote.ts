import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import { _put } from '../utils'
//@ts-ignore
import {clientPromise} from "../utils";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

async function update(req:VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()
    const folderCode = req.body?.folderCode
    const title = req.body?.title
    const newTitle = req.body?.newTitle

    const raw = req.body?.raw
    const html= req.body?.html

    const folder = await prisma.folders.findUnique({
        where: {
            folderCode
        }
    })
    const updated = await prisma.notes.updateMany({
        where: {
            title: title,
            folderId: folder?.id
        },
        data: {
            raw,
            html,
            title: newTitle
        }
    })

    res.status(200).send(updated)
}

async function update2(req:VercelRequest, res: VercelResponse) {
    const params = req.body
    const title = params?.title
    const folderCode= params?.folderCode
    const raw = params?.raw
    const html = params?.html
    const newTitle= params?.newTitle

    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)

    const folderId = await datab.collection(collec).findOne({ folderCode }).then((folder: any) => folder?.id).catch(() => null)
    const query= { title, folderId }
    const updated = await collection.updateOne(query, {
        $set: {
            raw,
            html,
            title: newTitle
        }
    }).catch(() => "Update failed")

    res.status(200).send(updated)
}

const updateNote = (req:VercelRequest, res:VercelResponse) => _put(update2, req, res)
export default updateNote
