import type { Preview } from "@storybook/react";
import "@harryk-ds/ui/styles/global";

const preview: Preview = {
  parameters: {
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: "16px" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
