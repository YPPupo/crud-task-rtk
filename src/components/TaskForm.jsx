import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task))
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, []);

  return (
    <form className="flex flex-col self-center w-full gap-5 lg:w-1/2" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold">Create new Task</h2>
      <input
        className="px-3 py-2 border rounded-lg outline-none border-slate-400"
        name="title"
        type="text"
        placeholder="title"
        onChange={handleChange}
        value={task.title}
      />
      <textarea
        className="px-3 py-2 border rounded-lg outline-none border-slate-400"
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
      ></textarea>
      <button className="w-1/5 px-3 py-1 ml-auto text-white border rounded-md bg-slate-700" type="submit">Save</button>
    </form>
  );
}
