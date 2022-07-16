export type textTemplate = { [index: string]: string }

export type indexLang = 'fr'|'en'

export type textLang = {
    [index in indexLang]: textTemplate
}