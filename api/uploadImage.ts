//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Blob, Buffer } from 'node:buffer';
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: VercelRequest, res: VercelResponse) {

  let body = req.body
  let fileUploaded = req.body?.file
 
  const cloudName = 'dzggewhvt'
  console.log(body?.length);
  const imgb = Buffer.from(body) ;console.log(imgb?.byteLength)
  const img = new Blob([imgb], {type: 'image'})

  
  const upload = await axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: img,
                    upload_preset: 'ze5mrykg',
                    }  )
                    .catch(err => {   return err })

    res.status(upload?.status ?? 505).setHeader('Content-type', 'image/png') .send(img)

}

