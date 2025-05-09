import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Kullanıcı tipi
interface User {
  username: string;
}

// Auth state tipi
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// localStorage'dan kullanıcı bilgisini al
const getUserFromStorage = (): User | null => {
  // İlk başta null döndür, useEffect içinde kontrol edilecek
  return null;
};

// Initial state
const initialState: AuthState = {
  user: getUserFromStorage(),
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Login async thunk
export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Basit kimlik doğrulama
      if (username === "admin" && password === "12345") {
        const user = { username };
        // localStorage'a kullanıcı bilgisini kaydet
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
      } else {
        return rejectWithValue("Geçersiz kullanıcı adı veya şifre");
      }
    } catch (error) {
      return rejectWithValue("Giriş işlemi sırasında bir hata oluştu");
    }
  }
);

// Kullanıcıyı localStorage'dan yükleme thunk'ı
export const initializeAuth = createAsyncThunk("auth/initialize", async () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
  }
  return null;
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      // localStorage'dan kullanıcı bilgisini sil
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        initializeAuth.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isInitialized = true;
        }
      );
  },
});

// Reducer ve action'ları export et
export const { logout, clearError } = authSlice.actions;

// Selector'lar
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsInitialized = (state: RootState) =>
  state.auth.isInitialized;

export default authSlice.reducer;
