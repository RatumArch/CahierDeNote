import sanitizeHtml from 'sanitize-html';

export const allowedAttributes= {
    "image-input": ['src', 'nodeId', 'nodeid'], 
    "latex-block": [ 'rawText', 'rawtext', 'nodeId', 'nodeid']
}
export const additionalAllowedTags= ['image-input', 'latex-block']

export function sanitizeText(text: string) {
    console.log(allowedAttributes);console.log("allowedAttributes");
    return sanitizeHtml( text, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(additionalAllowedTags),
        allowedAttributes
    })
}