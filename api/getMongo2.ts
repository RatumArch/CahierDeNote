import clientPromise from "../utils/mongodb";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION

export default async function getMongo(req: any, res: any) {
    const client = await clientPromise.then((client: any) => client)

    console.log(client);
    
    res.status(200).send({ MetaEnv: collec })
}