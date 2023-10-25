import { ref, unref, type Ref, type MaybeRef } from 'vue'
import { eagerComputed } from '@vueuse/core'
import { cloneDeep, isArray, isEqual, isObject } from '@vt7/utils'

type Result<T> = {
  state: Ref<T>
  reset: () => void
  isChanged: Readonly<Ref<boolean>>
}

export const autoResetRef = <T>(defaultValue: MaybeRef<T>): Result<T> => {
  const getDefaultValue = (): T => {
    const value = unref(defaultValue)

    return isObject(value) || isArray(value) ? cloneDeep(value) : value
  }

  const state = ref(getDefaultValue()) as Ref<T>

  const reset = () => {
    state.value = getDefaultValue()
  }

  const isChanged = eagerComputed(() => !isEqual(state.value, getDefaultValue()))

  return {
    state,
    reset,
    isChanged,
  }
}
