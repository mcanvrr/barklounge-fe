import { ContactMessage, ContactMessagesService } from '@/lib/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Contact state interface
interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunks
export const sendContactMessage = createAsyncThunk(
  'contact/sendContactMessage',
  async (contactData: ContactMessage, { rejectWithValue }) => {
    try {
      const response = await ContactMessagesService.sendContactMessage(
        contactData
      );
      return response;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'İletişim mesajı gönderilirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactError: state => {
      state.error = null;
    },
    clearContactSuccess: state => {
      state.success = false;
    },
    resetContactState: state => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendContactMessage.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearContactError, clearContactSuccess, resetContactState } =
  contactSlice.actions;
export default contactSlice.reducer;
