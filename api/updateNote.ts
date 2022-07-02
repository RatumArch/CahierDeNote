import type { VercelRequest, VercelResponse } from '@vercel/node';
import { _put } from '../utils'
//@ts-ignore
import {clientPromise} from "../utils";


const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

async function update(req:VercelRequest, res: VercelResponse) {
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

    const query= { title, folderCode }
    const updated = await collection.updateOne(query, {
        $set: {
            raw,
            html,
            title: newTitle,
            modifiedDate: new Date()
        },
    }).catch(() => "Update failed")

    res.status(200).send(updated)
}

async function updateTransaction(req:VercelRequest, res: VercelResponse) {
    const params = req.query
    const title = params?.title
    const folderCode= params?.folderCode
    const raw = params?.raw
    const html = params?.html
    const newTitle = params?.newTitle
    
    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)

    const transactionOptions = {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' },
        readPreference: 'primary'
    
      };

    const session = client.startSession()

    await session.withTransaction(async (mySession: any) => {
        const query= { title, folderCode }
        const fieldsToUpdate: any= {
            $set: {
                raw,
                html,
                modifiedDate: new Date(),
                folderCode
            }
        }

        if(newTitle) {            
            const findTitle = await collection.findOne({ title: newTitle, folderCode}, {session: mySession})
            
            if(findTitle) {
                res.status(400).send({error: "Il y a déjà un fichier avec ce nom dans ce dossier"})
                await mySession.abortTransaction().then(() => { console.log("transaction aborted fini car même titre");
                 })
            }
            fieldsToUpdate.$set.title= newTitle
        }

        const updated = await collection.updateOne(query, fieldsToUpdate, { session: mySession}).catch(() => "Update failed")
        return updated
        
    }, transactionOptions)
      .then(async (updated: any) => { 
            res.status(200).send(updated)
            return await session.endSession()
        })
      .catch((err: any) => {
            res.status(408).send(err)
            console.error(err)
        })

}

const updateNote = (req:VercelRequest, res:VercelResponse) => _put(updateTransaction, req, res)
export default updateNote
