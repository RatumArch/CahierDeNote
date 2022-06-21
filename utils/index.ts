import {Collection, ObjectId, Sort} from "mongodb";
// @ts-ignore
import clientPromise from "./mongodb.js";
/**
 * Fonction à appliquer sur les objets ayant un cham "_id: new ObjectId('___')"
 * Retourne un objet JavaScript valide
 */
 export function mapSerializeDocs(docsArray: any) {
    return docsArray.map((doc: any) => {
        doc._id = doc._id.toString()
        return doc
    })
}

export function serializeDoc(document: any) {
    let newDoc = document;
    let id = document?._id
    // On vérifie si '_id' est de la forme 'new ObjectId'
    if(ObjectId.isValid(id)) {newDoc._id = document?._id.toString()}

    return newDoc;
}

// @ts-ignore
export {clientPromise}
