import clientPromise from "../utils/mongodb";

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: any, res: any) {

  if(req.method === 'POST') {
    let param = req.body;

    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)

    console.log(req.body);

    return await collection.insertOne(param)
      .then((docs) => res.status(200).send(docs))
      .catch(err => console.error(err))
  }
  else {
    res.status(405).send("You must POST")
  }
}

