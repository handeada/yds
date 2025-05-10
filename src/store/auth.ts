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

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const username = localStorage.getItem("username");
    return {
      user: {
        username,
        isAuthenticated: !!username,
      },
      error: null,
    };
  } catch {
    return initialState;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  selectors: {
    selectAuth: (state) => state,
  },
  reducers: {
    login: (state, action: PayloadAction<LoginFormData>) => {
      const { username, password } = action.payload;
      if (username === "admin" && password === "12345") {
        localStorage.setItem("username", username);
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
      localStorage.removeItem("username");
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
