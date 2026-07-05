import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: 'localhostLinks',

  title: 'swarmx',
  description: '把你本机真实的 CLI 组成一支会协作的 AI 团队',

  head: [
    ['meta', { property: 'og:title', content: 'swarmx' }],
    ['meta', { property: 'og:description', content: '把你本机真实的 CLI 组成一支会协作的 AI 团队' }],
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
          { text: '参考', link: '/reference/configuration', activeMatch: '/reference/' },
          { text: 'GitHub', link: 'https://github.com/curdx/swarmx' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '上手',
              items: [
                { text: 'swarmx 是什么', link: '/guide/what-is-swarmx' },
                { text: '快速开始', link: '/guide/quickstart' },
                { text: '安装 Zulu 与配置 license', link: '/guide/zulu-setup' },
              ],
            },
            {
              text: '三种玩法',
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
                { text: '配置（SWARMX_* 环境变量）', link: '/reference/configuration' },
                { text: '架构', link: '/reference/architecture' },
                { text: '交接协议', link: '/reference/handoff-protocol' },
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
          { text: 'Reference', link: '/en/reference/configuration', activeMatch: '/en/reference/' },
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
              text: 'Three modes',
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
                { text: 'Configuration (SWARMX_* env vars)', link: '/en/reference/configuration' },
                { text: 'Architecture', link: '/en/reference/architecture' },
                { text: 'Handoff protocol', link: '/en/reference/handoff-protocol' },
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
