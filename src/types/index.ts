// Common Types
export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// Navigation Types
export interface NavigationLink {
  href: string;
  text: string;
  isExternal?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

// Generic API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Header Types
export interface HeaderTopItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

export interface SocialLink {
  key: string;
  href: string;
  buttonClassname: string;
  icon: React.ReactNode;
}

// Service Types (API compatible + static data)
export interface Service {
  id: string;
  title: string;
  description: string;
  features?: string[];
  service_type?: 'hotel' | 'grooming' | 'daycare' | 'training';
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  // Static data fields
  icon?: React.ComponentType<{ className?: string }>;
  iconBg?: string;
}

// Contact Types
export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  info: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  pet_type?: 'dog' | 'cat';
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
}

// Blog Types (API compatible)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author: string;
  tags?: string[];
  read_time?: number;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Review Types (API compatible)
export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar?: string;
  review_date: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  id: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

// Slider Types (API compatible + static data)
export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  // Static data fields
  image?: string;
  buttonText?: string;
  buttonColor?: string;
}

// Pet Types
export interface Pet {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  color: string;
}

// Component Props Types
export interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  background?: 'light' | 'dark' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
}

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'light' | 'dark';
}

// Utility Types
export type PetType = 'dog' | 'cat';
export type ServiceType = 'hotel' | 'grooming' | 'daycare' | 'training';

// Theme Types
export type ThemeVariant = 'light' | 'dark' | 'gradient';
export type SizeVariant = 'sm' | 'md' | 'lg';
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';

// Generic State Types
export interface BaseState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export interface SingleState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
