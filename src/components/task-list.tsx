import Task from "./task";
import { TaskData } from "../types";
import { AppDispatch, RootState, updateTaskState } from "../lib/store";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export interface TaskListProps {
  loading?: boolean;
  tasks: TaskData[];
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

export default function TaskList() {
  const tasks = useSelector((state: RootState) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((t) => t.state !== "TASK_PINNED"),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
  });
  const { status } = useSelector((state: RootState) => state.taskbox);
  const dispatch = useDispatch<AppDispatch>();
  const pinTask = (value: string) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value: string) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };

  const loadingRow = (
    <li className="px-6 py-4">
      <div className="flex animate-pulse items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-6 rounded-full bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
        </div>
        <div className="size-6 rounded-full bg-gray-200"></div>
      </div>
    </li>
  );

  if (status === "loading") {
    return (
      <div
        className="overflow-hidden bg-white shadow-sm"
        data-testid="loading"
        aria-label="loading tasks"
      >
        <ul role="list" className="divide-y divide-gray-200">
          {loadingRow}
          {loadingRow}
          {loadingRow}
          {loadingRow}
          {loadingRow}
          {loadingRow}
        </ul>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div
        className="overflow-hidden bg-white p-8 shadow-sm"
        data-testid="empty"
        aria-label="empty tasks"
      >
        <div className="text-center">
          <CheckCircleIcon className="mx-auto size-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            You can relax, you have no tasks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden bg-white shadow-sm"
      data-testid="success"
      aria-label="tasks"
    >
      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onPinTask={pinTask}
            onArchiveTask={archiveTask}
          />
        ))}
      </ul>
    </div>
  );
}
