import { CustomerReview, CustomerReviewsService, ReviewStats } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Reviews state interface
interface ReviewsState {
  reviews: CustomerReview[];
  reviewStats: ReviewStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  reviewStats: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const reviews = await CustomerReviewsService.getActiveReviews();
      return reviews;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Müşteri yorumları yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchReviewStats = createAsyncThunk(
  'reviews/fetchReviewStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await CustomerReviewsService.getReviewStats();
      return stats;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Yorum istatistikleri yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviewsError: state => {
      state.error = null;
    },
    // SSR: Initial data'yı direkt set et
    setInitialData: (
      state,
      action: PayloadAction<{
        reviews: CustomerReview[];
        reviewStats: ReviewStats;
      }>
    ) => {
      state.reviews = action.payload.reviews;
      state.reviewStats = action.payload.reviewStats;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch reviews
      .addCase(fetchReviews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<CustomerReview[]>) => {
          state.loading = false;
          state.reviews = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch review stats
      .addCase(fetchReviewStats.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviewStats.fulfilled,
        (state, action: PayloadAction<ReviewStats>) => {
          state.loading = false;
          state.reviewStats = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchReviewStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReviewsError, setInitialData } = reviewsSlice.actions;
export default reviewsSlice.reducer;
