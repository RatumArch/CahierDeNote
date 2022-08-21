import { ObjectID } from "bson";
import type { ClientSession } from "mongodb";
// @ts-ignore
import { serializeDoc, clientPromise } from "../utils/index"

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

export default async function findOneMongo(req: any, res: any) {
    // @ts-ignore
    const client = await clientPromise.then((client: ClientSession) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)
    let param
    if( req.method==='POST') param = req.body
    if( req.method==='GET') param = req.query
  
    const id = param?.id
  
    const results = await collection.findOne({ "_id": new ObjectID(id) } ).then((document: any) => serializeDoc(document))

    res.status(200).send(results)
    return results
  }