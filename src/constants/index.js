import type { frText, textLang } from "./types"

export const API = {
    CREATE_DOCUMENT: '/api/createDocument',
    FIND_NOTE: '/api/findNoteByTitle',
    UPDATE_NOTE: '/api/updateNote',
}

export const MSG = {
    ERROR: {
        AUTO_SAVE: "Auto save mal togglé",
        NO_CONTENT_EDITOR: "<h2>Error</h2>No content found on Mounted"
    }
}

export const EVENTS = {
    TITLE_CHANGE: 'titleChanged'
}

export const ROUTE = {
    ERROR: '/error',
    DOCUMENT: 'document',
    FOLDER: 'folder'
}

export const HOME = {
    fr: {
        TITLE: "Cahier de Note",
        DESCRIPTION: "Créer des documents en ligne",
        AUTO_SAVE: "Enregistrement automatique",
        NEW_DOC: "Nouveau document",
        LOAD_FOLDER: "Code d'un dossier existant"
    },
    en: {}
}