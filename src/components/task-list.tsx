import Task from "./task";
import { TaskData } from "../types";
import { PlusIcon } from "@heroicons/react/20/solid";

export interface TaskListProps {
  loading?: boolean;
  tasks: TaskData[];
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
  onCreateTask?: () => void;
}

export default function TaskList({
  loading = false,
  tasks,
  onPinTask,
  onArchiveTask,
  onCreateTask = () => {},
}: TaskListProps) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  if (loading) {
    return (
      <div
        className="overflow-hidden rounded-md bg-white shadow-sm"
        data-testid="loading"
        aria-label="loading tasks"
      >
        <ul role="list" className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-6 py-4">
              <div className="flex animate-pulse items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-6 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </div>
                <div className="size-6 rounded-full bg-gray-200"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div
        className="overflow-hidden rounded-md bg-white p-8 shadow-sm"
        data-testid="empty"
        aria-label="empty tasks"
      >
        <div className="text-center">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto size-12 text-gray-400"
          >
            <path
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new task.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={onCreateTask}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
              New Task
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div
      className="overflow-hidden rounded-md bg-white shadow-sm"
      data-testid="success"
      aria-label="tasks"
    >
      <ul role="list" className="divide-y divide-gray-200">
        {tasksInOrder.map((task) => (
          <Task key={task.id} task={task} {...events} />
        ))}
      </ul>
    </div>
  );
}
