//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Blob, Buffer } from 'node:buffer';
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: VercelRequest, res: VercelResponse) {

  let body = req.body
  
  
  const cloudName = 'dzggewhvt'
  
  const imgb = Buffer.from(body) ;console.log(imgb?.byteLength); 

  

  
  const upload = await axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: imgb,
                    upload_preset: 'ze5mrykg',
                    }  )
                    .catch(err => {  return err?.response })

    res.status(upload?.status ?? 505).setHeader('Content-type', 'image/png'). send(body)

}

