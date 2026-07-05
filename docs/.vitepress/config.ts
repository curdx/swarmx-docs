import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: 'localhostLinks',

  title: 'swarmx',
  description: '让本机的编码 CLI 组成一支协作的 AI 团队',

  head: [
    ['meta', { property: 'og:title', content: 'swarmx' }],
    ['meta', { property: 'og:description', content: '让本机的编码 CLI 组成一支协作的 AI 团队' }],
  ],

  themeConfig: {
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/curdx/swarmx' }],
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/what-is-swarmx', activeMatch: '/guide/' },
          { text: '参考', link: '/reference/architecture', activeMatch: '/reference/' },
          { text: 'GitHub', link: 'https://github.com/curdx/swarmx' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '入门',
              items: [
                { text: 'swarmx 是什么', link: '/guide/what-is-swarmx' },
                { text: '快速开始', link: '/guide/quickstart' },
                { text: '安装 Zulu 与配置 License', link: '/guide/zulu-setup' },
              ],
            },
            {
              text: '协作模式',
              items: [
                { text: '蜂群协作', link: '/guide/swarm' },
                { text: '研究委员会', link: '/guide/research-committee' },
                { text: '融合竞赛', link: '/guide/fusion' },
              ],
            },
          ],
          '/reference/': [
            {
              text: '参考',
              items: [
                { text: '工作原理', link: '/reference/architecture' },
                { text: '配置项', link: '/reference/configuration' },
              ],
            },
          ],
        },
        footer: {
          message: '基于 MIT 许可发布',
          copyright: 'Copyright © 2026 swarmx',
        },
        outline: { label: '本页目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        darkModeSwitchLabel: '主题',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '切换语言',
      },
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/what-is-swarmx', activeMatch: '/en/guide/' },
          { text: 'Reference', link: '/en/reference/architecture', activeMatch: '/en/reference/' },
          { text: 'GitHub', link: 'https://github.com/curdx/swarmx' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting started',
              items: [
                { text: 'What is swarmx', link: '/en/guide/what-is-swarmx' },
                { text: 'Quick start', link: '/en/guide/quickstart' },
                { text: 'Install Zulu & set your license', link: '/en/guide/zulu-setup' },
              ],
            },
            {
              text: 'Collaboration modes',
              items: [
                { text: 'Swarm collaboration', link: '/en/guide/swarm' },
                { text: 'Research committee', link: '/en/guide/research-committee' },
                { text: 'Fusion', link: '/en/guide/fusion' },
              ],
            },
          ],
          '/en/reference/': [
            {
              text: 'Reference',
              items: [
                { text: 'How it works', link: '/en/reference/architecture' },
                { text: 'Configuration', link: '/en/reference/configuration' },
              ],
            },
          ],
        },
        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2026 swarmx',
        },
      },
    },
  },
})
