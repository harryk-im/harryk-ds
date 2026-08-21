import { resolve } from "node:path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      include: ["src"],
      // *.source.* 는 토큰 생성기의 입력이라 배포하지 않아요.
      // 공개 계약은 토큰 값(COLORS)이지 램프·채도 같은 생성 규칙이 아니에요.
      exclude: ["**/*.stories.*", "**/*.test.*", "**/*.source.*"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@harryk-ds/ui",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        banner: `import './ui.css';`,
      },
    },
  },
});
