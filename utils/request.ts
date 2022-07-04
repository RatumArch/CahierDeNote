import axios from "axios"

/**
 * Envoie une requête PUT pour mettre enregistrer les modifications du documents.
 * @param title Titre du document à enregistrer
 * @param folderCode Dossier contenant le document
 * @param htmlContent 
 * @param rawText 
 * @param newTitle Optionnel. Nouveau titre à donner au document
 * @param extra Données additionnelles
 */
export async function saveDocument(title: string, folderCode: string, htmlContent: string, rawText: string, newTitle?: string|null,  extra?: any) {
    return await axios.put('/api/updateNote', {
          title,
          folderCode,
          newTitle,
          html: htmlContent,
          raw: rawText,
          extra
        })
}   