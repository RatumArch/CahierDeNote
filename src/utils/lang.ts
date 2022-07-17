import { computed } from 'vue';
import type { textLang } from '../constants/types'

export type indexLang = 'fr'|'en'
export const useLang= () => computed<indexLang>(() => {
    if(navigator.language.includes('en'))
      return 'en'
    if(navigator.language.includes('fr'))
      return 'fr'
    else return 'fr'
  } )

export const useLocalConstant = (constant: textLang) => {
    const lang = useLang()
    return computed(() => constant[lang.value])    
}