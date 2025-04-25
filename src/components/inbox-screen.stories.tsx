import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import InboxScreen from "./inbox-screen";
import store, { fetchTasks } from "../lib/store";
import { http, HttpResponse } from "msw";
import { MockedState } from "./task-list.stories";
import { Provider } from "react-redux";
import {
  fireEvent,
  waitFor,
  within,
  waitForElementToBeRemoved,
} from "@storybook/test";

// Create a decorator that provides the store and resets it after each story
const withStoreReset = (StoryFn: React.ComponentType) => {
  // Reset store to initial state
  store.dispatch({ type: "taskbox/fetchTasks/pending" });

  return (
    <Provider store={store}>
      <StoryFn />
    </Provider>
  );
};

const meta = {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [withStoreReset],
  tags: ["autodocs"],
} satisfies Meta<typeof InboxScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return HttpResponse.json(MockedState.tasks);
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for tasks to appear rather than waiting for loading to disappear
    // This is more reliable since it waits for the actual content we need
    await waitFor(
      async () => {
        // Wait for task list to be rendered after loading is complete
        await canvas.findByTestId("success");
      },
      { timeout: 5000 } // Increase timeout to give more time for the state to update
    );

    // Once tasks are loaded, find and click pin buttons
    await waitFor(async () => {
      // Get all pin buttons and click on the first and third
      const pinButtons = await canvas.findAllByLabelText("pin");
      // Simulates pinning the first task
      await fireEvent.click(pinButtons[0]);
      // Simulates pinning the third task
      await fireEvent.click(pinButtons[2]);
    });
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://jsonplaceholder.typicode.com/todos?userId=1", () => {
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
