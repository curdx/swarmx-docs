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
          { text: '界面', link: '/dashboard/overview', activeMatch: '/dashboard/' },
          { text: '参考', link: '/reference/engines', activeMatch: '/reference/' },
          { text: 'GitHub', link: 'https://github.com/curdx/swarmx' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '入门',
              items: [
                { text: 'swarmx 是什么', link: '/guide/what-is-swarmx' },
                { text: '快速开始', link: '/guide/quickstart' },
                { text: '桌面版', link: '/guide/desktop' },
                { text: '安装与登录引擎', link: '/guide/install-engines' },
                { text: '安装 Zulu 与配置 License', link: '/guide/zulu-setup' },
              ],
            },
            {
              text: '核心概念',
              items: [
                { text: '工作原理', link: '/guide/how-it-works' },
                { text: '编排器与角色', link: '/guide/orchestrator-and-roles' },
                { text: '黑板与收件箱', link: '/guide/blackboard-and-inbox' },
                { text: '唤醒机制', link: '/guide/wake-mechanism' },
                { text: '工作方向与隔离', link: '/guide/directions-and-isolation' },
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
          '/dashboard/': [
            {
              text: '界面',
              items: [
                { text: '界面总览', link: '/dashboard/overview' },
                { text: '创建工作空间', link: '/dashboard/create-workspace' },
                { text: '工作空间视图', link: '/dashboard/workspace-views' },
                { text: 'Agent 抽屉', link: '/dashboard/agent-drawer' },
                { text: '工具页', link: '/dashboard/tool-pages' },
                { text: '设置', link: '/dashboard/settings' },
              ],
            },
          ],
          '/reference/': [
            {
              text: '参考',
              items: [
                { text: '引擎参考', link: '/reference/engines' },
                { text: '配置项', link: '/reference/configuration' },
                { text: '数据与隐私', link: '/reference/data-and-privacy' },
                { text: '术语表', link: '/reference/glossary' },
                { text: '常见问题', link: '/reference/faq' },
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
          { text: 'Dashboard', link: '/en/dashboard/overview', activeMatch: '/en/dashboard/' },
          { text: 'Reference', link: '/en/reference/engines', activeMatch: '/en/reference/' },
          { text: 'GitHub', link: 'https://github.com/curdx/swarmx' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting started',
              items: [
                { text: 'What is swarmx', link: '/en/guide/what-is-swarmx' },
                { text: 'Quick start', link: '/en/guide/quickstart' },
                { text: 'Desktop app', link: '/en/guide/desktop' },
                { text: 'Install & sign in to engines', link: '/en/guide/install-engines' },
                { text: 'Install Zulu & set your license', link: '/en/guide/zulu-setup' },
              ],
            },
            {
              text: 'Core concepts',
              items: [
                { text: 'How it works', link: '/en/guide/how-it-works' },
                { text: 'Orchestrator & roles', link: '/en/guide/orchestrator-and-roles' },
                { text: 'Blackboard & inbox', link: '/en/guide/blackboard-and-inbox' },
                { text: 'Wake mechanism', link: '/en/guide/wake-mechanism' },
                { text: 'Directions & isolation', link: '/en/guide/directions-and-isolation' },
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
          '/en/dashboard/': [
            {
              text: 'Dashboard',
              items: [
                { text: 'Overview', link: '/en/dashboard/overview' },
                { text: 'Create a workspace', link: '/en/dashboard/create-workspace' },
                { text: 'Workspace views', link: '/en/dashboard/workspace-views' },
                { text: 'Agent drawer', link: '/en/dashboard/agent-drawer' },
                { text: 'Tool pages', link: '/en/dashboard/tool-pages' },
                { text: 'Settings', link: '/en/dashboard/settings' },
              ],
            },
          ],
          '/en/reference/': [
            {
              text: 'Reference',
              items: [
                { text: 'Engines', link: '/en/reference/engines' },
                { text: 'Configuration', link: '/en/reference/configuration' },
                { text: 'Data & privacy', link: '/en/reference/data-and-privacy' },
                { text: 'Glossary', link: '/en/reference/glossary' },
                { text: 'FAQ', link: '/en/reference/faq' },
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
