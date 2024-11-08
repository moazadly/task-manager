import "bootstrap/dist/css/bootstrap.min.css";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Form from "../../components/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TaskList from "../../components/TaskList";
import Navbar from "../../components/Navbar";

function TaskPage() {
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState({});
  const tasks = useSelector((state) => state.user.tasks);
  const completedTasks = tasks.filter((task) => !task.completed);
  const unCompletedTasks = tasks.filter((task) => task.completed);

  const handel = () => {
    setOpenForm(true);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-between">
        <div
          className={
            openForm
              ? "col-12 col-xl-7 d-none d-xl-block"
              : "col-12 col-xl-7 d-block"
          }
          id="list"
        >
          <div className="header d-flex align-items-center mb-5 flex-wrap col-12 gap-2">
            <Navbar></Navbar>
          </div>
          <div className="lists d-flex col-12 pt-5 gap-2 gap-xl-4">
            <TaskList
              done={true}
              tasks={completedTasks}
              handel={handel}
              setEdit={setEdit}
              setTask={setTask}
            ></TaskList>
            <TaskList
              done={false}
              tasks={unCompletedTasks}
              handel={handel}
              setEdit={setEdit}
              setTask={setTask}
            ></TaskList>
          </div>
        </div>
        <div
          className={
            openForm
              ? "form left-0 col-12 col-xl-5 ps-xl-5"
              : "form left-6 col-12 col-xl-5 ps-xl-5"
          }
        >
          <Form
            setOpenForm={setOpenForm}
            edit={edit}
            setEdit={setEdit}
            task={task}
            setTask={setTask}
          ></Form>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
