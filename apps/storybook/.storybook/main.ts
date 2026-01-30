import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    if (config.plugins) {
      const { vanillaExtractPlugin } = await import(
        "@vanilla-extract/vite-plugin"
      );
      config.plugins.push(vanillaExtractPlugin());
    }

    // Workspace 패키지의 소스를 직접 사용하도록 alias 설정
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@harryk-ds/ui/styles/fonts": resolve(
          __dirname,
          "../../../packages/ui/src/styles/foundation/fonts.css.ts"
        ),
        "@harryk-ds/ui/styles/global": resolve(
          __dirname,
          "../../../packages/ui/src/styles/foundation/global.css.ts"
        ),
        "@harryk-ds/ui": resolve(__dirname, "../../../packages/ui/src"),
        "@harryk-ds/motion": resolve(__dirname, "../../../packages/motion/src"),
      },
    };

    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
};

export default config;
