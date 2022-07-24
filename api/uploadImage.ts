//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Blob, Buffer } from 'node:buffer';
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: VercelRequest, res: VercelResponse) {

  let body = req.body
  
  console.log(Buffer.isBuffer(body))
  const img = Buffer.from(body)

  const data = new FormData()
  data.append("file", body);
  data.append("upload_preset", 'ze5mrykg')

  const cloudName = 'dzggewhvt'

  
  const upload = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data  )
                    .catch(err => {  return err?.response })

    res.status(upload?.status ?? 505). send({uploadRes: upload?.data})
}

