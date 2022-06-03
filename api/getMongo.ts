import { ObjectID } from "bson";
import type { Collection } from "mongodb";
import clientPromise from "../utils/mongodb.js";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const collec2 = "trashcollec"

export default async function getMongo(req: any, res: any) {
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection: Collection = await datab.collection(collec2)

    console.log(collection);
    collection.insertOne({ _id: new ObjectID(13232), aijinsere: "ouijai" } ).then(inserted => res.status(200).send(inserted))
    
    
}