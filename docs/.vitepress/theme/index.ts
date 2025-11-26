// https://vitepress.dev/guide/custom-theme
import { h, ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { NovaEnvironment } from '@jiangshengdev/nova-next'

const safeDetectTheme = () => {
  if (typeof document === 'undefined') {
    return 'light'
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const DocsLayoutWrapper = defineComponent({
  name: 'DocsLayoutWrapper',
  setup(_, { slots }) {
    const theme = ref<'light' | 'dark'>(safeDetectTheme())
    let observer: MutationObserver | null = null

    onMounted(() => {
      if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') {
        return
      }

      observer = new MutationObserver(() => {
        theme.value = safeDetectTheme()
      })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
    })

    return () =>
      h(
        NovaEnvironment,
        { theme: theme.value },
        {
          default: () => h(DefaultTheme.Layout, null, slots),
        },
      )
  },
})

export default {
  extends: DefaultTheme,
  Layout: DocsLayoutWrapper,
  enhanceApp({ app: _app, router: _router, siteData: _siteData }) {
    // no-op
  },
} satisfies Theme
