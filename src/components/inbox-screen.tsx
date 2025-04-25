import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, fetchTasks, RootState } from "../lib/store";

import TaskList from "./task-list";

export default function InboxScreen() {
  const dispatch = useDispatch<AppDispatch>();
  // We're retrieving the error field from our updated store
  const { error } = useSelector((state: RootState) => state.taskbox);
  // The useEffect triggers the data fetching when the component is mounted
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) {
    return (
      <div className="w-full max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-lg mt-10 mx-auto max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oh no!</h2>
          <p className="text-gray-600 text-center">Something went wrong</p>
          <button
            onClick={() => dispatch(fetchTasks())}
            className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="md:flex md:items-center md:justify-between py-4 px-6 border-b border-gray-200">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
            Taskbox
          </h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Filter
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <TaskList />
      </div>
    </div>
  );
}
