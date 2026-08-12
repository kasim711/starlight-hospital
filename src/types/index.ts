export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  image_alt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  medical_review_status: 'Not Required' | 'Needs Review' | 'Reviewed';
  published_at?: string;
  reading_time: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface AppointmentRequest {
  id: number;
  full_name: string;
  phone_number: string;
  service_needed: string;
  preferred_date?: string;
  preferred_time?: string;
  message: string;
  consent: number;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  preferred_contact: string;
  consent: number;
  status: 'New' | 'In Progress' | 'Handled' | 'Archived';
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  heroHeading: string;
  description: string;
  whatToExpect: string;
  whoItIsFor: string;
  beforeYourVisit: string[];
  iconName: string;
  image: string;
  faqs?: { question: string; answer: string }[];
}
