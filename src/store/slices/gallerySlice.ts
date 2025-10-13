import { GalleryItem, GalleryService } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Gallery state interface
interface GalleryState {
  images: GalleryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  images: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchGalleryImages = createAsyncThunk(
  'gallery/fetchGalleryImages',
  async (_, { rejectWithValue }) => {
    try {
      const images = await GalleryService.getActiveGalleryImages();
      return images;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Galeri resimleri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGalleryError: state => {
      state.error = null;
    },
    // SSR: Initial data'yı direkt set et
    setInitialData: (state, action: PayloadAction<GalleryItem[]>) => {
      state.images = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGalleryImages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGalleryImages.fulfilled,
        (state, action: PayloadAction<GalleryItem[]>) => {
          state.loading = false;
          state.images = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGalleryError, setInitialData } = gallerySlice.actions;
export default gallerySlice.reducer;
