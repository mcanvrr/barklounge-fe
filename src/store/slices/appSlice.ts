import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Application-wide state that actually needs to be managed
interface AppState {
  // UI State
  isMobileMenuOpen: boolean;
  isLoading: boolean;

  // Contact Form State
  contactForm: {
    data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      petType: string;
    };
    errors: Record<string, string>;
    isSubmitting: boolean;
  };

  // Theme/UI Preferences
  theme: 'light' | 'dark' | 'auto';
  language: 'tr' | 'en';
}

const initialState: AppState = {
  isMobileMenuOpen: false,
  isLoading: false,
  contactForm: {
    data: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      petType: '',
    },
    errors: {},
    isSubmitting: false,
  },
  theme: 'light',
  language: 'tr',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // UI Actions
    toggleMobileMenu: state => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Contact Form Actions
    updateContactForm: (
      state,
      action: PayloadAction<Partial<AppState['contactForm']['data']>>
    ) => {
      state.contactForm.data = { ...state.contactForm.data, ...action.payload };
    },
    setContactFormErrors: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.contactForm.errors = action.payload;
    },
    setContactFormSubmitting: (state, action: PayloadAction<boolean>) => {
      state.contactForm.isSubmitting = action.payload;
    },
    resetContactForm: state => {
      state.contactForm = initialState.contactForm;
    },

    // Theme Actions
    setTheme: (state, action: PayloadAction<AppState['theme']>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<AppState['language']>) => {
      state.language = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  setLoading,
  updateContactForm,
  setContactFormErrors,
  setContactFormSubmitting,
  resetContactForm,
  setTheme,
  setLanguage,
} = appSlice.actions;

export default appSlice.reducer;
