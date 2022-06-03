import { MongoClient } from 'mongodb'

const uri = process.env.env.MONGODB_URI
const collectionName = process.env.env.MONGODB_DB_COLLECTION
const options = {}

let client
let clientPromise

if (!process.env.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.env.DEV) {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

const db = process.env.env.MONGODB_DB

export const createCollection = async (clientPr, name) => {
    const client = await clientPr.then((client) => client)
    const datab = client.db(db)
    return datab.collection(name)
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
