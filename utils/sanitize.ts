import sanitizeHtml from 'sanitize-html';

export const allowedAttributes= {
    "image-input": ['src', 'nodeId', 'nodeid'], 
    "latex-block": [ 'rawText', 'rawtext', 'nodeId', 'nodeid', 'latexNodeId', 'latexnodeid'],
    "code-edit": [ 'codeEditId', 'codeeditid', 'rawtext']
}
export const additionalAllowedTags= ['image-input', 'latex-block']

export function sanitizeText(text: string) {
    return sanitizeHtml( text, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(additionalAllowedTags),
        allowedAttributes
    })
}