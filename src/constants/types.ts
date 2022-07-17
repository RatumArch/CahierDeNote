export type textTemplate = { [index: string]: string }

export type indexLang = 'fr'|'en'

export type textLang = {
    [textTemplate: string]: {[index in indexLang]? : string}
}