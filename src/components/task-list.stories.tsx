import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./task-list";
import * as TaskStories from "./task.stories";
import { fn } from "@storybook/test";
import { TaskData } from "../types";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ] as TaskData[],
  status: "idle",
  error: null,
};

// A super-simple mock of a redux store
const Mockstore = ({
  taskboxState,
  children,
}: {
  taskboxState: typeof MockedState;
  children: React.ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const ActionsData = {
  onCreateTask: fn(),
};

const meta = {
  component: TaskList,
  title: "TaskList",
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <Mockstore taskboxState={MockedState}>
        <Story />
      </Mockstore>
    ),
  ],
};

export const WithPinnedTasks: Story = {
  decorators: [
    (story) => {
      const pinnedtasks: TaskData[] = [
        ...MockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedtasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          status: "loading",
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
