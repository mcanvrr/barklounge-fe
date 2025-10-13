import {
  AppSettings,
  AppSettingsService,
  BlogTag,
  SeoSettings,
  ServicesSection,
} from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// App settings state interface
interface AppSettingsState {
  settings: AppSettings | null;
  seoSettings: SeoSettings | null;
  servicesSection: ServicesSection | null;
  blogTags: BlogTag[];
  loading: boolean;
  error: string | null;
}

const initialState: AppSettingsState = {
  settings: null,
  seoSettings: null,
  servicesSection: null,
  blogTags: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchAppSettings = createAsyncThunk(
  'appSettings/fetchAppSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await AppSettingsService.getAppSettings();
      return settings;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Uygulama ayarları yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchSeoSettings = createAsyncThunk(
  'appSettings/fetchSeoSettings',
  async (_, { rejectWithValue }) => {
    try {
      const seoSettings = await AppSettingsService.getSeoSettings();
      return seoSettings;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'SEO ayarları yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchServicesSection = createAsyncThunk(
  'appSettings/fetchServicesSection',
  async (_, { rejectWithValue }) => {
    try {
      const servicesSection = await AppSettingsService.getServicesSection();
      return servicesSection;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Hizmetler bölümü bilgileri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchBlogTags = createAsyncThunk(
  'appSettings/fetchBlogTags',
  async (_, { rejectWithValue }) => {
    try {
      const blogTags = await AppSettingsService.getActiveBlogTags();
      return blogTags;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Blog etiketleri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    clearAppSettingsError: state => {
      state.error = null;
    },
    // SSR: Initial data'yı direkt set et
    setInitialData: (
      state,
      action: PayloadAction<{
        settings: AppSettings;
        seoSettings: SeoSettings;
        servicesSection: ServicesSection;
        blogTags: BlogTag[];
      }>
    ) => {
      state.settings = action.payload.settings;
      state.seoSettings = action.payload.seoSettings;
      state.servicesSection = action.payload.servicesSection;
      state.blogTags = action.payload.blogTags;
      state.loading = false;
      state.error = null;
    },
    // SSR: Sadece blog tags'i set et
    setInitialBlogTags: (state, action: PayloadAction<BlogTag[]>) => {
      state.blogTags = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAppSettings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAppSettings.fulfilled,
        (state, action: PayloadAction<AppSettings>) => {
          state.loading = false;
          state.settings = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAppSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch SEO settings
      .addCase(fetchSeoSettings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSeoSettings.fulfilled,
        (state, action: PayloadAction<SeoSettings>) => {
          state.loading = false;
          state.seoSettings = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchSeoSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch services section
      .addCase(fetchServicesSection.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServicesSection.fulfilled,
        (state, action: PayloadAction<ServicesSection>) => {
          state.loading = false;
          state.servicesSection = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchServicesSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch blog tags
      .addCase(fetchBlogTags.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogTags.fulfilled,
        (state, action: PayloadAction<BlogTag[]>) => {
          state.loading = false;
          state.blogTags = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchBlogTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAppSettingsError, setInitialData, setInitialBlogTags } =
  appSettingsSlice.actions;
export default appSettingsSlice.reducer;
