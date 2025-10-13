import { configureStore } from '@reduxjs/toolkit';
import aboutReducer from './slices/aboutSlice';
import appSettingsReducer from './slices/appSettingsSlice';
import appReducer from './slices/appSlice';
import blogReducer from './slices/blogSlice';
import contactReducer from './slices/contactSlice';
import galleryReducer from './slices/gallerySlice';
import reviewsReducer from './slices/reviewsSlice';
import servicesReducer from './slices/servicesSlice';
import sliderReducer from './slices/sliderSlice';

/**
 * Redux store configuration with API integration
 * Manages both UI state and API data state
 */
export const store = configureStore({
  reducer: {
    app: appReducer,
    about: aboutReducer,
    services: servicesReducer,
    blog: blogReducer,
    gallery: galleryReducer,
    reviews: reviewsReducer,
    slider: sliderReducer,
    contact: contactReducer,
    appSettings: appSettingsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
