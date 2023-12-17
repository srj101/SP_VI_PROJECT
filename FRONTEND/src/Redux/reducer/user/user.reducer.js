import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../API/config";

export const signIn = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    const data = await fetch(`${API_URL}/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await data.json();
    if (res.success === false) {
      return thunkAPI.rejectWithValue(res.message);
    }
    localStorage.setItem("token", res.token);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const createUser = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    const data = await fetch(`${API_URL}/api/v1/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await data.json();
    if (res.success === false) {
      return thunkAPI.rejectWithValue(res.message);
    }
    localStorage.setItem("token", res.token);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const getCurrentUser = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    const data = await fetch(`${API_URL}/api/v1/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload}`,
      },
    });
    const res = await data.json();
    if (res.success === false) {
      return thunkAPI.rejectWithValue(res.message);
    }
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state, action) => {
      state.currentUser = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },

    clearError: (state, action) => {
      state.error = null;
    },
  },

  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    [signIn.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [getCurrentUser.pending]: (state, action) => {
      state.loading = true;
    },

    [getCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      state.loading = false;
    },

    [getCurrentUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
