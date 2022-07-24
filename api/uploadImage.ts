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
  //const img = Buffer.from(body) ; console.log(img?.length);console.log(img?.byteLength)
  const img = new Blob([body], {type: 'image'})
  console.log(img);
  
  const upload = await axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: img,
                    upload_preset: 'ze5mrykg',
                    }  )
                    .catch(err => {   return err })

    res.status(upload?.status ?? 505) .send(img)

}

