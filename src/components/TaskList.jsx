// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex justify-between w-full ">
        <h1 className="text-3xl font-bold">Tasks ({tasks.length})</h1>
        <Link
          className="px-5 py-1 font-semibold text-white border rounded-lg border-slate-500 bg-slate-700"
          to="/create-task"
        >
          Create Task
        </Link>
      </header>

      <div className="flex flex-col gap-5 py-10 md:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
        {tasks.map((task) => (
          <div
            className="flex flex-col px-3 py-2 text-white border rounded-lg border-slate-400 bg-slate-700 gap-y-5"
            key={task.id}
          >
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <div className="flex self-end gap-3">
              <button
                className="px-2 py-1 text-sm bg-red-700 rounded-md "
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              <Link
                className="px-2 py-1 text-sm rounded-md bg-slate-600 "
                to={`/edit-task/${task.id}`}
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
