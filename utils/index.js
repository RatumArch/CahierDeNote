import {Collection, ObjectId, Sort} from "mongodb";
// @ts-ignore
import clientPromise from "./mongodb.js";
export { validateHTTPMethod, _get, _post } from './methodDecorators'

// @ts-ignore
export {clientPromise }

export { mapSerializeDocs, serializeDoc} from './serialize'

