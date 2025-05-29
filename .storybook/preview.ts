import type { Preview } from "@storybook/react";
import {initialize, mswLoader } from "msw-storybook-addon"; // Import the MSW loader
import '../tailwind.css';
initialize({
  serviceWorker: {
    url: '/finch/mockServiceWorker.js', // required for github pages
  }
}); // Initialize MSW
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
