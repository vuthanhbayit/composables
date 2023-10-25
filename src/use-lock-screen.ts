import { type Ref } from 'vue'
import { isBrowser } from '@vt7/utils'
import { createSharedComposable } from '@vueuse/core'

const getScrollBarWidth = () => {
  return window.innerWidth - document.body.clientWidth
}

export const useLockScreen = createSharedComposable((trigger: Ref<boolean>) => {
  let subscribers = 0
  let isScroll = true

  const hidden = () => {
    if (!trigger.value || !isBrowser) {
      return
    }

    subscribers++

    if (!isScroll) {
      return
    }

    document.body.style.paddingRight = getScrollBarWidth() + 'px'
    document.body.style.overflowY = 'hidden'
    document.body.style.touchAction = 'none'
    isScroll = false
  }

  const scroll = () => {
    if (!trigger.value || !isBrowser) {
      return
    }
    if (isScroll) {
      return
    }

    subscribers--

    if (subscribers > 0) {
      return
    }

    document.body.style.paddingRight = ''
    document.body.style.overflowY = ''
    document.body.style.touchAction = ''
    isScroll = true
  }

  return {
    hidden,
    scroll,
  }
})
