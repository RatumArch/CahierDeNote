import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'
import { _update } from '../utils'

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

const updateNote = (req:VercelRequest, res:VercelResponse) => _update(update, req, res)
export default updateNote
