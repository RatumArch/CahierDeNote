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
  

  const cloudName = 'dzggewhvt'

  const imgS = img.toString('base64')
  axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    file: body,
                    upload_preset: 'ze5mrykg',
                    }, { headers: { 'Content-Type': 'multipart/form-data'}}  )
                    .then((uplo) => {
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
                    .catch(err => {  
                      res.status(err?.response?.status ?? 505). send({uploadRes: err?.response?.data})
                     })
}

