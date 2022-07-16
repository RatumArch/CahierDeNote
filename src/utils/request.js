import axios from "axios"
import { API } from '@/constants'

/**
 * Envoie une requête **PUT** pour mettre enregistrer les modifications du documents.
 * @param title Titre du document à enregistrer
 * @param folderCode Dossier contenant le document
 * @param htmlContent 
 * @param rawText 
 * @param newTitle Optionnel. Nouveau titre à donner au document
 * @param extra Données additionnelles
 */
export async function saveDocument(title, folderCode, htmlContent, rawText, newTitle=null,  extra=null) {
    return await axios.put(API.UPDATE_NOTE, {
          title,
          folderCode,
          newTitle,
          html: htmlContent,
          raw: rawText,
          extra
        })
}

/**
 * Get content of a document from MongoDB
 * @param folderCode 
 * @param title 
 * @returns 
 */
export async function getContent(folderCode, title)  {
  
  const params = { folderCode, title }
  const request = await axios.get(API.FIND_NOTE, {params})
  const data = request.data
  

  return data
}