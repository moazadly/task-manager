import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice";

function Login() {
  const error = useSelector((state) => state.user.error);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = async () => {
    const logined = await dispatch(loginUser({ email, password }));
    if (logined.payload.data) {
      navigate(`/tasks`);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login to Task Manager</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "10px",
          paddingY: "18px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          borderRadius: "5px",
          width: {
            xs: "80%",
            sm: "50%",
            md: "35%",
            xl: "30%",
          },
          backgroundColor: "white",
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ marginInline: "auto", width: "90%", marginTop: "24px" }}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
        </div>
        <div style={{ marginInline: "auto", width: "90%", marginTop: "24px" }}>
          <FormControl
            sx={{ width: "25ch" }}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password*
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={password}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div style={{ marginInline: "auto", width: "90%", marginTop: "24px" }}>
          <Button
            variant="contained"
            style={{ width: "100%" }}
            sx={{ paddingY: "10px" }}
            onClick={handleLogin}
          >
            Login{" "}
          </Button>
        </div>
        <span
          style={{ textAlign: "center", color: "#84848c", marginTop: "24px" }}
        >
          Do'nt have a account?
          <Link to={"/signup"} style={{ color: "#036cdb", marginLeft: "10px" }}>
            Signup
          </Link>
        </span>
      </Box>
    </div>
  );
}

export default Login;
