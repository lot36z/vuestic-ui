<template>
  <div
    ref="element"
    class="va-affix"
  >
    <div :style="{ visibility: isAffixed ? 'hidden' : 'inherit' }">
      <slot />
    </div>
    <div
      v-if="isAffixed"
      :class="computedClass"
      :style="computedStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, nextTick, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import noop from 'lodash/noop.js'

import { getWindow } from '../../utils/ssr-utils'
import {
  handleThrottledEvent,
  useEventsHandlerWithThrottle,
  getWindowHeight,
  State,
  Context,
} from './VaAffix-utils'

export default defineComponent({
  name: 'VaAffix',
  emits: ['change'],
  props: {
    offsetTop: { type: Number, default: undefined },
    offsetBottom: { type: Number, default: undefined },
    target: { type: [Object, Function] as PropType<HTMLElement | Window | (() => HTMLElement | Window)>, default: getWindow },
  },
  setup (props, { emit }) {
    const element = shallowRef<HTMLElement>()

    const getTargetElement = () => (typeof props.target === 'function' ? props.target() : props.target)

    const isAffixed = computed(() => state.value.isTopAffixed || state.value.isBottomAffixed)

    const state = ref<State>({
      isTopAffixed: false,
      isBottomAffixed: false,
    })
    const getState = () => state.value
    const setState = (newState: State) => {
      state.value = newState
      emit('change', isAffixed)
    }

    const calculateTop = () => {
      const target = getTargetElement()

      if (!target) {
        return 0
      }

      if (props.offsetTop === undefined) { return }

      if (!(target instanceof Window)) {
        const { top } = target.getBoundingClientRect()
        return top + props.offsetTop
      }

      return props.offsetTop
    }

    const calculateBottom = () => {
      const target = getTargetElement()

      if (!target) { return 0 }

      if (props.offsetBottom === undefined) { return }

      if (!(target instanceof Window)) {
        const { bottom } = target.getBoundingClientRect()
        const { borderTopWidth, borderBottomWidth } = getComputedStyle(target)
        const { offsetHeight, clientHeight } = target

        const scrollBarHeight = offsetHeight - clientHeight - parseInt(borderTopWidth) - parseInt(borderBottomWidth)

        return getWindowHeight() - (bottom - props.offsetBottom) + scrollBarHeight
      }

      return props.offsetBottom
    }

    const convertToPixels = (calculate: () => number | undefined) => {
      const result = calculate()
      return result === undefined ? undefined : `${result}px`
    }

    const computedClass = computed(() => [{ 'va-affix--affixed': isAffixed }])
    const computedStyle = computed(() => ({
      top: state.value.isTopAffixed ? convertToPixels(calculateTop) : undefined,
      bottom: state.value.isBottomAffixed ? convertToPixels(calculateBottom) : undefined,
      width: `${state.value.width}px`,
    }))

    const initialPosition = ref<DOMRect>()
    const throttledEventHandler = (eventName: string | null, event?: Event) => {
      const context: Context = {
        ...props,
        initialPosition: initialPosition.value,
        element: element.value,
        target: getTargetElement(),
        setState,
        getState,
      }

      if (!eventName || eventName === 'resize') {
        handleThrottledEvent(eventName, context)
      } else if (event && event.target) {
        const target = getTargetElement()

        if (target === event.target || target instanceof Window) {
          handleThrottledEvent(eventName, context)
        } else {
          // if we have a custom target but keep scrolling on another element,
          // so just disable the affixed state
          setState({
            isBottomAffixed: false,
            isTopAffixed: false,
          })
        }
      }
    }

    let clearEventListeners: () => any = noop

    onMounted(() => {
      initialPosition.value = element.value?.getBoundingClientRect()

      const events = ['scroll', 'resize']

      clearEventListeners = useEventsHandlerWithThrottle(events, {
        handler: throttledEventHandler,
      })

      nextTick(() => {
        // pass `null` here to make sure it is an initial call
        throttledEventHandler(null)
      })
    })

    onBeforeUnmount(clearEventListeners)

    return {
      computedClass,
      computedStyle,
      isAffixed,
      element,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-affix {
  font-family: var(--va-font-family);

  &--affixed {
    position: var(--va-affix-affixed-position);
    z-index: var(--va-affix-affixed-z-index);
  }
}
</style>
