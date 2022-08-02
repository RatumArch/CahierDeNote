import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { textLang } from '@/constants/types'

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
    return computed(() => constant?.[lang.value] ?? "Error translate")    
}

export function useTick(tickInterval: number, tickCount: number, step:number=1) {
  const interval = ref<NodeJS.Timer>()
  const tick=ref(-1)

  onMounted(() => {
    interval.value = setInterval(() => {tick.value = (tick.value+step)%tickCount}, tickInterval)
  })
  onUnmounted(() => {
    clearInterval(interval.value)
  })
  return tick
}