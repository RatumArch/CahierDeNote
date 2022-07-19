import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore
import { serializeDoc, clientPromise, _post } from "../utils/index"
import { Collection } from 'mongodb';
import axios from 'axios'

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const API_KEY = <string>process.env.SMTP_API_KEY


export default async function feedBack(req: any, res: VercelResponse) {
   // @ts-ignore
   const client = await clientPromise.then((client: ClientSession) => client)
   const datab = client.db(db)
   const collection: Collection = await datab.collection("feedbacks")

   let body = req?.body

   const headers = {
      'accept': 'application/json',
      'api-key': API_KEY,
      'content-type': 'application/json'
   }
   const data = {
      sender: {
         name: 'From name',
         email: 'jukiture@gmail.com'
      },
      to: [
         {
            email: 'nisalana96@gmail.com',
            name: 'Nia Lana'
         }
      ]
   }
   axios.post('https://api.sendinblue.com/v3/smtp/email', data, { headers })
         .then((res) => { console.log(res) } )
         .catch(err => { console.error(err)})
   const inserted = await collection.insertOne(body)
   res.send(inserted)
}