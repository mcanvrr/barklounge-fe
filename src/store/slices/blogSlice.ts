import { BlogPost, BlogPostsService } from '@/lib/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Blog state interface
interface BlogState {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  featuredPosts: [],
  currentPost: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPublishedPosts = createAsyncThunk(
  'blog/fetchPublishedPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await BlogPostsService.getPublishedPosts();
      return posts;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Blog yazıları yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchFeaturedPosts = createAsyncThunk(
  'blog/fetchFeaturedPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await BlogPostsService.getFeaturedPosts();
      return posts;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Öne çıkan yazılar yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

export const fetchPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const post = await BlogPostsService.getPostBySlug(slug);
      return post;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Blog yazısı yüklenirken hata oluştu';
      return rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogError: state => {
      state.error = null;
    },
    clearCurrentPost: state => {
      state.currentPost = null;
    },
    // SSR: Initial data'yı direkt set et
    setInitialData: (
      state,
      action: PayloadAction<{ posts: BlogPost[]; featuredPosts: BlogPost[] }>
    ) => {
      state.posts = action.payload.posts;
      state.featuredPosts = action.payload.featuredPosts;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch published posts
      .addCase(fetchPublishedPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPublishedPosts.fulfilled,
        (state, action: PayloadAction<BlogPost[]>) => {
          state.loading = false;
          state.posts = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchPublishedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch featured posts
      .addCase(fetchFeaturedPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeaturedPosts.fulfilled,
        (state, action: PayloadAction<BlogPost[]>) => {
          state.loading = false;
          state.featuredPosts = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchFeaturedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch post by slug
      .addCase(fetchPostBySlug.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostBySlug.fulfilled,
        (state, action: PayloadAction<BlogPost>) => {
          state.loading = false;
          state.currentPost = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.currentPost = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearBlogError, clearCurrentPost, setInitialData } =
  blogSlice.actions;
export default blogSlice.reducer;
