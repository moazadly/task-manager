import "bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@mui/icons-material/Add";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addTask, deleteTask, editTask } from "../redux/userSlice";

function Form({ setOpenForm, edit, setEdit, task = {}, setTask }) {
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(task).length > 0) {
      console.log("we are here", task);
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.deadline?.split("T")[0]);
      setComplete(task.completed);
    }
  }, [task]);
  const handelSaveTask = () => {
    // Add your code here to save the task to the database
    console.log(complete);
    dispatch(
      addTask({ title, description, deadline: dueDate, completed: complete })
    );
    setOpenForm(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setComplete(false);
  };
  const handelEditTask = () => {
    dispatch(
      editTask({
        taskId: task._id,
        title,
        description,
        deadline: dueDate,
        completed: complete,
      })
    );
    setEdit(false);
    setOpenForm(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setComplete(false);
    setTask({});
  };
  const handelDeleteTask = () => {
    dispatch(
      deleteTask({
        taskId: task._id,
      })
    );
    setOpenForm(false);
    setEdit(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setComplete(false);
    setTask({});
  };
  const handel = () => {
    setOpenForm(false);
    setEdit(false);
    setTitle("");
    setDescription("");
    setDueDate("");
    setComplete(false);
    setTask({});
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <div className="pt-1 pt-xl-3">
          <CloseIcon
            style={{ fontSize: "40px", cursor: "pointer" }}
            onClick={handel}
          ></CloseIcon>
        </div>
      </div>
      <form action="" id="formTask">
        <div className="title break-word">
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            style={{ width: "80%" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="py-2 pt-xl-5 break-word ">
          <TextField
            id="filled-multiline-static"
            label="Desription"
            multiline
            rows={5}
            variant="filled"
            style={{ width: "80%" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="d-flex mt-5 align-items-baseline">
          <label
            htmlFor="myCheckbox"
            className="text-completed"
            style={{ fontSize: "18px", fontWeight: "400" }}
          >
            Task completed
          </label>
          <div>
            <input
              className="form-check-input ms-4 "
              type="checkbox"
              id="complete"
              checked={complete}
              onChange={(e) => setComplete(e.target.checked)}
            />
          </div>
        </div>

        <div
          className="date my-5 py-3 py-xl-4 d-flex gap-5"
          style={{ fontSize: "18px", fontWeight: "400" }}
        >
          <label className="date-text d-flex gap-4 mt-auto">
            <span className="Deadline d-flex gap-1 align-items-center">
              <AccessAlarmsIcon></AccessAlarmsIcon>
              <span>The Deadline</span>
            </span>
            <span id="spandeadline" className="date-span">
              {dueDate}
            </span>
          </label>
          <input
            type="date"
            id="deadline"
            className="custom-date-input ms-5 "
            value={dueDate}
            min={minDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </form>
      <div className="buttons d-flex  gap-5 w-100 pt-xl-3">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={edit ? handelEditTask : handelSaveTask}
        >
          {edit ? "Edit" : "Save"}
        </Button>
        {edit && (
          <Button
            variant="outlined"
            endIcon={<DeleteIcon />}
            onClick={handelDeleteTask}
          >
            Delete
          </Button>
        )}
      </div>
    </>
  );
}

export default Form;
