//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
import { VercelRequest } from "@vercel/node";
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: VercelRequest, res: any) {

  let body = req.body
  let fileUploaded = req.body?.file
 
  const cloudName = 'dzggewhvt'
  console.log(req.body);console.log(req.readableLength);
  console.log(req.headers)
  
  
  const upload = await axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: fileUploaded,
                    upload_preset: 'ze5mrykg',
                    secure: true
                    }  )
                    .catch(err => {return err })

    res.status(upload?.status ?? 505).send({body, uploadStatus: upload?.data})

}

