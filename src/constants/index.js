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
    fr: {
        TITLE: "Cahier de Note",
        DESCRIPTION: "Créer des documents en ligne",
        AUTO_SAVE: "Enregistrement automatique",
        NEW_DOC: "Nouveau document",
        LOAD_FOLDER: "Code d'un dossier existant"
    },
    en: {}
}
export const BUTTON = {
    fr: {
        AUTO_SAVE: "Enregistrement auto"
    },
    en: {
        AUTO_SAVE: "Auto save"
    }
}