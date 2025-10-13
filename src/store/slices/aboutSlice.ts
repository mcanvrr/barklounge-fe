import { About, AboutContent, AppSettingsService } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// About state interface
interface AboutState {
  about: About | null;
  aboutContent: AboutContent | null;
  loading: boolean;
  error: string | null;
}

const initialState: AboutState = {
  about: null,
  aboutContent: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAbout = createAsyncThunk(
  'about/fetchAbout',
  async (_, { rejectWithValue }) => {
    try {
      const about = await AppSettingsService.getAbout();
      return about;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Hakkımızda bilgileri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchAboutContent = createAsyncThunk(
  'about/fetchAboutContent',
  async (_, { rejectWithValue }) => {
    try {
      const aboutContent = await AppSettingsService.getAboutContent();
      return aboutContent;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Hakkımızda içerik bilgileri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    clearAboutError: state => {
      state.error = null;
    },
    // SSR: Initial data'yı direkt set et
    setInitialData: (
      state,
      action: PayloadAction<{ about: About; aboutContent: AboutContent }>
    ) => {
      state.about = action.payload.about;
      state.aboutContent = action.payload.aboutContent;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch about
      .addCase(fetchAbout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action: PayloadAction<About>) => {
        state.loading = false;
        state.about = action.payload;
        state.error = null;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch about content
      .addCase(fetchAboutContent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAboutContent.fulfilled,
        (state, action: PayloadAction<AboutContent>) => {
          state.loading = false;
          state.aboutContent = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAboutContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAboutError, setInitialData } = aboutSlice.actions;
export default aboutSlice.reducer;
