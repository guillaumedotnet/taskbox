import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import {
  CheckCircleIcon as CheckCircleOutlineIcon,
  StarIcon as StarOutlineIcon,
} from "@heroicons/react/24/outline";

import { TaskData } from "../types";

type TaskProps = {
  task: TaskData;
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
};

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: TaskProps) {
  return (
    <div
      className={`overflow-hidden rounded-md px-6 py-4 shadow-sm flex items-center justify-between ${
        state === "TASK_ARCHIVED" ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onArchiveTask(id)}
          aria-label={state === "TASK_ARCHIVED" ? "unarchive" : "archive"}
          className="focus:outline-none"
        >
          {state === "TASK_ARCHIVED" ? (
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
          ) : (
            <CheckCircleOutlineIcon className="h-6 w-6 text-gray-400 hover:text-blue-500" />
          )}
        </button>

        <span
          className={`text-sm font-medium ${
            state === "TASK_ARCHIVED"
              ? "text-gray-500 line-through"
              : "text-gray-900"
          }`}
        >
          {title}
        </span>
      </div>

      <button
        onClick={() => onPinTask(id)}
        aria-label={state === "TASK_PINNED" ? "unpin" : "pin"}
        className="focus:outline-none"
      >
        {state === "TASK_PINNED" ? (
          <StarIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <StarOutlineIcon className="h-6 w-6 text-gray-400 hover:text-yellow-500" />
        )}
      </button>
    </div>
  );
}
