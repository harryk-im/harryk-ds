import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    // 스토리북 앱 내의 모든 스토리
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  docs: {
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    // Vanilla Extract CSS 지원을 위한 설정
    if (config.plugins) {
      const { vanillaExtractPlugin } = await import(
        '@vanilla-extract/vite-plugin'
      )
      config.plugins.push(vanillaExtractPlugin())
    }

    // Workspace 패키지의 소스를 직접 사용하도록 alias 설정
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@harryk-ds/ui': resolve(__dirname, '../../../packages/ui/src'),
        '@harryk-ds/motion': resolve(__dirname, '../../../packages/motion/src'),
      },
    }

    return config
  },
}

export default config
