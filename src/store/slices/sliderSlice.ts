import { SliderItem, SliderService } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slider state interface
interface SliderState {
  slides: SliderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: SliderState = {
  slides: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchSlides = createAsyncThunk(
  'slider/fetchSlides',
  async (_, { rejectWithValue }) => {
    try {
      const slides = await SliderService.getActiveSlides();
      return slides;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Slider resimleri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    clearSliderError: state => {
      state.error = null;
    },
    // SSR: Initial data'yı direkt set et (loading yok!)
    setInitialData: (state, action: PayloadAction<SliderItem[]>) => {
      state.slides = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSlides.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSlides.fulfilled,
        (state, action: PayloadAction<SliderItem[]>) => {
          state.loading = false;
          state.slides = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSliderError, setInitialData } = sliderSlice.actions;
export default sliderSlice.reducer;
