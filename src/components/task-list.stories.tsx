import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./task-list";
import * as TaskStories from "./task.stories";
import { fn } from "@storybook/test";

export const defaultTasksData = [
  { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
  { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
  { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
  { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
  { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
  { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
];

export const withPinnedTasksData = [
  ...defaultTasksData.slice(0, 5),
  { ...TaskStories.Pinned.args.task, id: "6", title: "Task 6 (pinned)" },
];

export const ActionsData = {
  ...TaskStories.ActionsData,
  onCreateTask: fn(),
};

const meta = {
  component: TaskList,
  title: "TaskList",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tasks: defaultTasksData,
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: withPinnedTasksData,
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Loading.args,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When there are no tasks, an empty state is shown with a "New Task" button.',
      },
    },
  },
};
