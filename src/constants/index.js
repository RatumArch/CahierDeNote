export * from './types'

export const API = {
    CREATE_DOCUMENT: '/api/createDocument',
    CREATE_FOLDER: '/api/createFolder',
    FIND_NOTE: '/api/findNoteByTitle',
    UPDATE_NOTE: '/api/updateNote',
}

export const MSG = {
    fr: {
        ERROR: {
            AUTO_SAVE: "Problème réglage - Auto save",
            NO_CONTENT_EDITOR: "<h2>Error</h2>Nous ne retrouvons pas cette note.<p>Y a-t-il un document intitulé ainsi ?</p>"
        }
    },
    en: {
        ERROR: {
            AUTO_SAVE: "Auto save Error",
            NO_CONTENT_EDITOR: "<h2>Error</h2>No content found.<p>Does this document exist ?</p>"
        }
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
    TITLE:  {fr: "Cahier de Note", en: "Cahier de Note"},
    DESCRIPTION: { fr: "Créer des documents en ligne" },
    AUTO_SAVE: { fr: "Enregistrement auto", en: "Auto save" },
    NEW_DOC: { fr: "Nouveau document", en: "New Document" },
    LOAD_FOLDER: { fr: "Code d'un dossier existant", en: "Load from folder code" }
}
export const SIDEBAR = {
    ACCUEIL: { fr: 'Accueil', en: 'Home Page'}
}
export const BUTTON = {
    AUTO_SAVE: { fr: "Enregistrement auto", en: "Auto save" },
    SAVE: { fr: "Enregistrer", en: "Save"}
}