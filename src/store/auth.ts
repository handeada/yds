import { LoginFormData } from "@/schemas/authSchemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: {
    username: string | null;
    isAuthenticated: boolean;
  };
  error: string | null;
};

const initialState: AuthState = {
  user: {
    username: null,
    isAuthenticated: false,
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectAuth: (state) => state,
  },
  reducers: {
    login: (state, action: PayloadAction<LoginFormData>) => {
      const { username, password } = action.payload;
      if (username === "admin" && password === "12345") {
        return {
          user: {
            username,
            isAuthenticated: true,
          },
          error: null,
        };
      } else {
        return {
          ...state,
          user: {
            username: null,
            isAuthenticated: false,
          },
          error: "Kullanıcı adı veya şifre hatalı",
        };
      }
    },
    logout: () => {
      return {
        user: {
          username: null,
          isAuthenticated: false,
        },
        error: null,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { selectAuth } = authSlice.selectors;
export default authSlice;
