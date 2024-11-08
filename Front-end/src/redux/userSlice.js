import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  tasks: JSON.parse(localStorage.getItem("tasks")) || null,
  loading: false,
  message: "",
  auth: localStorage.getItem("authToken") || null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status !== 201 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status !== 200 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTask = createAsyncThunk(
  "user/addTask",
  async ({ title, description, completed, deadline }, { rejectWithValue }) => {
    console.log(completed);
    try {
      const response = await fetch("http://localhost:5000/api/task", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ title, description, completed, deadline }),
      });
      const data = await response.json();
      if (response.status !== 201 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const getTasks = createAsyncThunk(
//   "user/getTasks",
//   async (
//     { title, description, completed = false, deadline },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(JSON.stringify({ title, description, completed, deadline }));
//       const response = await fetch("http://localhost:5000/api/task", {
//         method: "get",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       const data = await response.json();
//       if (response.status !== 200 || !response.ok) {
//         return rejectWithValue(data);
//       } else {
//         return { data };
//       }
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const editTask = createAsyncThunk(
  "user/editTask",
  async (
    { taskId, title, description, completed, deadline },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ title, description, completed, deadline }),
      });
      const data = await response.json();
      if (response.status !== 200 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "user/deleteTask",
  async ({ taskId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      if (response.status !== 200 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = false;
      state.data = null;
      state.auth = null;
      state.loading = false;
      state.message = "";
      state.tasks = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.tasks = action.payload.data.data.tasks;
        state.auth = true;
        localStorage.setItem("authToken", action.payload.data.token);
        localStorage.setItem("data", JSON.stringify(action.payload.data.data));
        localStorage.setItem(
          "tasks",
          JSON.stringify(action.payload.data.data.tasks)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
      });
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data.tasks;
        state.error = false;
        localStorage.setItem(
          "tasks",
          JSON.stringify(action.payload.data.tasks)
        );
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
      });
    builder
      .addCase(editTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data.tasks;
        state.error = false;
        localStorage.setItem(
          "tasks",
          JSON.stringify(action.payload.data.tasks)
        );
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
      });
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data.tasks;
        state.error = false;
        localStorage.setItem(
          "tasks",
          JSON.stringify(action.payload.data.tasks)
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
