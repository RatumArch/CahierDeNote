import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection } from 'mongodb';
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

    await session.withTransaction(async (mySession: any) => 
        await transaction(mySession, collection, req, res), transactionOptions
    )
      .then(async (updated: any) => { 
            res.status(200).send({status: 'success', message: 'Transaction efféctuée'})
            return await session.endSession()
        })
      .catch((err: any) => {
            res.status(408).send({status: 'error', message: 'Transaction ratée', error: err})
            console.error(err)
            session.endSession()
        })

}

const updateNote = (req:VercelRequest, res:VercelResponse) => _put(updateTransaction, req, res)
export default updateNote

async function transaction(mySession: any, collection: Collection, req:VercelRequest, res:VercelResponse) {
    const params = req.body
    const title = params?.title
    const folderCode= params?.folderCode
    const raw = params?.raw
    const html = params?.html
    const newTitle = params?.newTitle

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
                await mySession.abortTransaction()
                res.status(400).send({message: "Il y a déjà un fichier avec ce nom dans ce dossier", status: 'error'})
            }
            fieldsToUpdate.$set.title= newTitle
        }

        const updated = await collection.updateOne(query, fieldsToUpdate, { session: mySession}).catch(() => "Update failed")
        return updated
}