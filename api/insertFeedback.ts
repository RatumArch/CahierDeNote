import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore
import { serializeDoc, clientPromise, _post } from "../utils/index"
import { Collection } from 'mongodb';
import axios from 'axios'

const db = process.env.MONGODB_DB
const collec = process.env.MONGODB_DB_COLLECTION
const API_KEY = <string>process.env.SMTP_API_KEY
const SENDER = process.env.SENDER_MAIL
const RECEIVER = process.env.RECEIVER_FEEDBACK


export default async function feedBack(req: any, res: VercelResponse) {
   // @ts-ignore
   const client = await clientPromise.then((client: ClientSession) => client)
   const datab = client.db(db)
   const collection: Collection = await datab.collection("feedbacks")

   let body = req?.body
   let message = body?.message

   const headers = {
      'accept': 'application/json',
      'api-key': API_KEY,
      'content-type': 'application/json'
   }
   const data = {
      sender: {
         name: 'Ture Juki',
         email: SENDER
      },
      to: [
         {
            email: RECEIVER,
            name: 'Tum'
         }
      ],
      subject: "Feedback Cahier de Notes",
      htmlContent: message
   }
   const email = await axios.post('https://api.sendinblue.com/v3/smtp/email', data, { headers })
   console.log(email?.data);console.log(email?.status);   

   const inserted = await collection.insertOne(body)
   res.send({inserted, email: email?.data ?? "Error - email non envoyé" })
}