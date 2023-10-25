import { ref, type Ref } from 'vue'
import { eagerComputed } from '@vueuse/core'
import { isEqual } from '@vt7/utils'

export const autoResetRef = <T>(defaultValueCallback: () => T) => {
  const state = ref(defaultValueCallback()) as Ref<T>

  const reset = () => {
    state.value = defaultValueCallback()
  }

  const isChanged = eagerComputed(() => !isEqual(state.value, defaultValueCallback()))

  return {
    state,
    reset,
    isChanged,
  }
}
