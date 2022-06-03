import clientPromise from "../utils/mongodb.js";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

export default async function getMongo(req: any, res: any) {
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)

    console.log(collection);
    
    res.status(200).send({ MetaEnv: collec })
}