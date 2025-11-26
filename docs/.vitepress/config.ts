import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Nova Next',
  description: '轻量 Vue 3 组件库',
  lastUpdated: true,
  themeConfig: {
    outline: {
      level: [2, 3],
      label: '页面导航',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2020-至今 Jiang Sheng',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页',
    },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '多语言',
    skipToContentLabel: '跳转到内容',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/introduction' },
    ],

    sidebar: [
      {
        text: '',
        items: [
          { text: '简介', link: '/introduction' },
          { text: '快速开始', link: '/getting-started' },
        ],
      },
      {
        text: '组件',
        items: [
          { text: 'NovaButton 按钮', link: '/components/button/' },
          { text: 'NovaInput 输入框', link: '/components/input/' },
          { text: 'NovaEnvironment 环境容器', link: '/components/environment/' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/jiangshengdev/nova-next' }],
  },
})
