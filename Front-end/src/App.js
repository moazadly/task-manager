import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/LoginPage/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/SignupPage/Signup";
import TaskPage from "./pages/TaskPage/TaskPage";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

export default function App() {
  const auth = useSelector((state) => state.user.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        {auth && (
          <Route
            path="/tasks"
            element={
              <>
                {" "}
                <TaskPage></TaskPage>
              </>
            }
          ></Route>
        )}
        <Route path="*" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
