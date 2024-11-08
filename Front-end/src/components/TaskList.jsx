import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
function TaskList({ handel, done, setEdit, setTask, tasks }) {
  const handelEdit = (task) => {
    setEdit(true);
    setTask(task);
    handel();
  };
  return (
    <div className={done ? "todo mb-3 col-6" : "done mb-3 col-6 col-xl-5"}>
      <div className="header">
        <h2 className="tasks-title m-0 p-2">{done ? "To Do" : "Done"}</h2>
      </div>
      <ul className={done ? "d-flex flex-column mt-2 p-0" : "mt-2 p-0"}>
        {tasks.map((task) => {
          return (
            <li
              className={done ? "d-flex justify-content-between" : ""}
              onClick={() => {
                handelEdit(task);
              }}
            >
              <div
                className={
                  done ? " col-sm-5 col-xl-8 break-word" : "task-title"
                }
              >
                <p className="ps-1 mb-0">{task.title}</p>
              </div>
              {done ? (
                <div className="task-date col-sm-6 col-xxl-4 gap-1 d-flex align-items-end ms-auto">
                  <AccessAlarmsIcon></AccessAlarmsIcon>
                  <span>{task.deadline.split("T")[0]}</span>
                </div>
              ) : (
                <></>
              )}
            </li>
          );
        })}
      </ul>
      {done ? (
        <Button variant="contained" endIcon={<AddIcon />} onClick={handel}>
          New
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TaskList;
