import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    // // 액션 로깅 설정
    // actions: { argTypesRegex: "^on[A-Z].*" },

    // // 컨트롤 설정
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/,
    //   },
    // },

    // 뷰포트 설정 (반응형 테스트용)
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "667px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1024px", height: "768px" },
        },
        large: {
          name: "Large Desktop",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },

    // 배경 설정 (다크/라이트 모드 테스트용)
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
        { name: "gray", value: "#f5f5f5" },
      ],
    },

    // 문서화 설정
    docs: {
      toc: true, // 목차 표시
    },

    // Chromatic 설정
    chromatic: {
      // 스냅샷 지연 시간 (애니메이션 완료 대기)
      delay: 300,
      // 특정 뷰포트에서만 스냅샷 촬영
      viewports: [375, 768, 1024],
    },
  },

  // 데코레이터 설정
  decorators: [
    // 스토리 컨테이너 데코레이터
    (Story) => {
      return (
        <div style={{ padding: "1rem" }}>
          <Story />
        </div>
      );
    },
  ],

  // // 글로벌 타입 설정
  // globalTypes: {
  //   theme: {
  //     description: "Global theme for components",
  //     defaultValue: "light",
  //     toolbar: {
  //       title: "Theme",
  //       icon: "circlehollow",
  //       items: ["light", "dark"],
  //       dynamicTitle: true,
  //     },
  //   },
  // },
};

export default preview;
