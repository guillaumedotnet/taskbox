import type { Preview } from "@storybook/react";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        // 👇 Default values
        { name: "Dark", value: "#333" },
        { name: "Light blue", value: "#ADD8E6" },
        { name: "Light", value: "#F7F9F2" },
        // 👇 Add your own
        { name: "Maroon", value: "#400" },
      ],
      // 👇 Specify which background is shown by default
      default: "Light",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
