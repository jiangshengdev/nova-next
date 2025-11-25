import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nova next',
  description: 'Experimental Vue components',
  themeConfig: {
    outline: [2, 3],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/introduction' },
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '简介', link: '/introduction' },
          { text: '快速开始', link: '/getting-started' },
        ],
      },
      {
        text: '组件',
        items: [{ text: 'NovaButton 按钮', link: '/components/button/' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
