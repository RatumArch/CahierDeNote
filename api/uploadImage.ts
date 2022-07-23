//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: any, res: any) {

  let body = req.body
  let fileUploaded = body?.fileUploaded
  let cdnUrl = body?.cdnUrl
  const cloudName = 'dzggewhvt'
  const upload = await axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: fileUploaded,
                    upload_preset: 'ze5mrykg',
                    secure: true
                    }  )

    //@ts-ignore
    const client = await clientPromise.then((client: any) => client)
    const datab = client.db(db)
    const collection = await datab.collection(collec)

    res.status(upload?.status).send(upload?.data)

}

