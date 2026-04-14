import { onMounted, onUnmounted, type Ref } from 'vue'

export function useResize(target: HTMLElement, callback: () => void) {
  let observer: ResizeObserver | null = null

  onMounted(() => {
    observer = new ResizeObserver(() => callback())
    observer.observe(target)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
