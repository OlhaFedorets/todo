import type { RequestStatus } from "@/common/types"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
    captchaUrl: null as string | null
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectCaptcha: (state) => state.captchaUrl
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setCaptchaAC: create.reducer<{url: string | null} >((state, action) => {
      state.captchaUrl = action.payload.url
    })
  }),
})

export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn, selectCaptcha } = appSlice.selectors
export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC, setCaptchaAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
