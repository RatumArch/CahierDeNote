//@ts-ignore
import {clientPromise} from "../utils";
import axios from 'axios'
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Buffer } from 'node:buffer';
import { Blob, FormData, File} from "formdata-node"

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION


export default async function insertMongo(req: VercelRequest, res: VercelResponse) {

  let body = req.body
  const form = new FormData()
  const file = new File([body], "nia.png")
  const blob = new Blob([body], { type: 'image'})

  console.log(Buffer.isBuffer(body))
  console.log(blob.type)
  const img = Buffer.from(body)
  

  const cloudName = 'dzggewhvt'

  const imgBuf = img.buffer

  form.set("upload_preset", 'ze5mrykg')
  form.set("file", body)
  
  const ddata2 = Buffer.from( JSON.stringify( { file: blob, upload_preset: 'ze5mrykg'} ) )

  axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { file: body, upload_preset: 'ze5mrykg'}, { headers: {'Content-Type': 'application/x-www-form-urlencoded' }} )
                    .then((uplo) => {
                      console.log('Première vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
    .catch(err => {  
      console.log('Première catch')
      form.set("file", imgBuf)
      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { file: imgBuf, upload_preset: 'ze5mrykg'}, { headers: {'Content-Type': 'application/x-www-form-urlencoded' }} )
                    .then((uplo) => {
                      console.log('Deuxième vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
      .catch(async () => {
        console.log('Deuxième catch')
        const fi = await file.arrayBuffer()
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { file: fi, upload_preset: 'ze5mrykg'}, { headers: {'Content-Type': 'application/x-www-form-urlencoded' }} )
                    .then((uplo) => {
                      console.log('Troisième vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
        .catch(() => {
          console.log('Troisième catch')
          form.set("file", blob)
          axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { file: blob, upload_preset: 'ze5mrykg'}, { headers: {'Content-Type': 'multipart/form-data' }} )
                    .then((uplo) => {
                      console.log('4ième vag')
                      res.status(uplo?.status ?? 505). send({uploadRes: uplo?.data})
                    })
          .catch(async (err) => {
            console.log("quatrième catch - "+cloudName)
            form.set("file", body)
            const fi2 = await blob.arrayBuffer()
            res.status(err?.response?.status ?? 505).setHeader('Content-type', 'image/png').send(fi2)   
          })
        })
      })
      })
}

