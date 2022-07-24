//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Blob, Buffer } from 'node:buffer';
import {FormData, File} from "formdata-node"
const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: VercelRequest, res: VercelResponse) {

  let body = req.body
  const form = new FormData()
  const file = new File([body], "nia.png")

  console.log(Buffer.isBuffer(body))
  const img = Buffer.from(body)
  

  const cloudName = 'dzggewhvt'

  const imgS = img.buffer

  form.set("upload_preset", 'ze5mrykg')
  form.set("file", body)

  axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, form, { headers: {'Content-Type': 'multipart/form-data' }} )
                    .then((uplo) => {
                      console.log('Première vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
    .catch(err => {  
      console.log('Première catch')
      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, form, { headers: {'Content-Type': 'multipart/form-data' }} )
                    .then((uplo) => {
                      console.log('Deuxième vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
      .catch(() => {
        console.log('Deuxième catch')
        form.set("file", file)
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, form, { headers: {'Content-Type': 'multipart/form-data' }} )
                    .then((uplo) => {
                      console.log('Troisième vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
        .catch(() => {
          console.log('Troisième catch')
          form.set("file", file)
          axios.postForm(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, form )
                    .then((uplo) => {
                      console.log('4ième vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
        })
      })
      })
}

