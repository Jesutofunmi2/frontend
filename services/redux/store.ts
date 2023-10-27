import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import lessonGameSlice from './features/lessonGameSlice'
import lessonsSlice from './features/lessonsSlice'
import surveySlice from './features/surveySlice'
import tabSlice from './features/tabSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import selectedLanguageSlice from './features/selectedLanguageSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage,
}

const rootReducer = combineReducers({
  user: userSlice,
  lessonGame: lessonGameSlice,
  selectedLanguage: selectedLanguageSlice,
  lessons: lessonsSlice,
  survey: surveySlice,
  tab: tabSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export let persistor = persistStore(store)
