import { ServiceItem, ServicesService } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services state interface
interface ServicesState {
  services: ServiceItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const services = await ServicesService.getActiveServices();
      return services;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Servisler yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchServicesByType = createAsyncThunk(
  'services/fetchServicesByType',
  async (type: 'hotel' | 'grooming' | 'daycare', { rejectWithValue }) => {
    try {
      const services = await ServicesService.getServicesByType(type);
      return { services, type };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Servisler yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServicesError: state => {
      state.error = null;
    },
    // SSR: Initial data'yı direkt set et
    setInitialData: (state, action: PayloadAction<ServiceItem[]>) => {
      state.services = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<ServiceItem[]>) => {
          state.loading = false;
          state.services = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch services by type
      .addCase(fetchServicesByType.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesByType.fulfilled, (state, action) => {
        state.loading = false;
        // This could be used to filter or categorize services
        state.services = action.payload.services;
        state.error = null;
      })
      .addCase(fetchServicesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearServicesError, setInitialData } = servicesSlice.actions;
export default servicesSlice.reducer;
