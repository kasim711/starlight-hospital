import { Article, Category, AppointmentRequest, Enquiry } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api';

function getToken(): string {
  return localStorage.getItem('starlight_token') || '';
}

async function safeFetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  
  if (!contentType.includes('application/json')) {
    throw new Error('Backend server is starting up or disconnected. Please retry in a few seconds.');
  }

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Server request failed');
  }
  return json;
}

export async function fetchArticles(params?: { category?: string; search?: string; limit?: number; page?: number }) {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.limit) query.append('limit', String(params.limit));
  if (params?.page) query.append('page', String(params.page));

  return safeFetchJson(`${API_BASE}/articles?${query.toString()}`) as Promise<{ articles: Article[]; total: number; page: number; limit: number }>;
}

export async function fetchAdminArticles(tokenOrParams?: any, paramsParam?: any) {
  let token = getToken();
  let params = tokenOrParams;

  if (typeof tokenOrParams === 'string') {
    token = tokenOrParams;
    params = paramsParam;
  }

  const query = new URLSearchParams();
  if (params?.status) query.append('status', params.status);
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);

  return safeFetchJson(`${API_BASE}/articles/admin/all?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  }) as Promise<{ articles: Article[] }>;
}

export async function createArticleApi(tokenOrData: any, optionalData?: any) {
  let token = getToken();
  let data = tokenOrData;

  if (typeof tokenOrData === 'string' && optionalData) {
    token = tokenOrData;
    data = optionalData;
  }

  return safeFetchJson(`${API_BASE}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
}

export async function updateArticleApi(tokenOrId: any, idOrData?: any, optionalData?: any) {
  let token = getToken();
  let id = tokenOrId;
  let data = idOrData;

  if (typeof tokenOrId === 'string' && idOrData !== undefined && optionalData !== undefined) {
    token = tokenOrId;
    id = idOrData;
    data = optionalData;
  }

  return safeFetchJson(`${API_BASE}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
}

export async function deleteArticleApi(tokenOrId: any, optionalId?: any) {
  let token = getToken();
  let id = tokenOrId;

  if (typeof tokenOrId === 'string' && optionalId !== undefined) {
    token = tokenOrId;
    id = optionalId;
  }

  return safeFetchJson(`${API_BASE}/articles/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function fetchAdminStats(tokenParam?: string) {
  const token = tokenParam || getToken();
  return safeFetchJson(`${API_BASE}/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  }) as Promise<{
    articles: { total: number; published: number; draft: number };
    appointments: { total: number; new: number; confirmed: number };
    enquiries: { total: number; new: number };
  }>;
}

export async function fetchAppointmentsApi(tokenParam?: string, status?: string) {
  const token = tokenParam || getToken();
  const query = status ? `?status=${status}` : '';
  return safeFetchJson(`${API_BASE}/appointments${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  }) as Promise<{ appointments: AppointmentRequest[] }>;
}

export const fetchAdminAppointments = fetchAppointmentsApi;

export async function updateAppointmentStatusApi(tokenOrId: any, idOrStatus?: any, statusOrNotes?: any, optionalNotes?: any) {
  let token = getToken();
  let id = tokenOrId;
  let status = idOrStatus;
  let admin_notes = statusOrNotes;

  if (typeof tokenOrId === 'string' && typeof idOrStatus === 'number') {
    token = tokenOrId;
    id = idOrStatus;
    status = statusOrNotes;
    admin_notes = optionalNotes;
  }

  return safeFetchJson(`${API_BASE}/appointments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status, admin_notes })
  });
}

export const updateAppointmentApi = updateAppointmentStatusApi;

export async function fetchEnquiriesApi(tokenParam?: string, status?: string) {
  const token = tokenParam || getToken();
  const query = status ? `?status=${status}` : '';
  return safeFetchJson(`${API_BASE}/enquiries${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  }) as Promise<{ enquiries: Enquiry[] }>;
}

export const fetchAdminEnquiries = fetchEnquiriesApi;

export async function updateEnquiryStatusApi(tokenOrId: any, idOrStatus?: any, optionalStatus?: any) {
  let token = getToken();
  let id = tokenOrId;
  let status = idOrStatus;

  if (typeof tokenOrId === 'string' && typeof idOrStatus === 'number') {
    token = tokenOrId;
    id = idOrStatus;
    status = optionalStatus;
  }

  return safeFetchJson(`${API_BASE}/enquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status })
  });
}

export const updateEnquiryApi = updateEnquiryStatusApi;

export async function fetchArticleBySlug(slug: string) {
  return safeFetchJson(`${API_BASE}/articles/${slug}`) as Promise<{ article: Article; related: Article[] }>;
}

export async function fetchCategories() {
  return safeFetchJson(`${API_BASE}/categories`) as Promise<{ categories: Category[] }>;
}

export async function fetchServices() {
  return safeFetchJson(`${API_BASE}/services`) as Promise<{ services: any[] }>;
}

export async function fetchServiceDetail(serviceId: string) {
  return safeFetchJson(`${API_BASE}/services/${serviceId}`) as Promise<{ service: any }>;
}

export async function fetchSettings() {
  return safeFetchJson(`${API_BASE}/settings`) as Promise<{ settings: { [key: string]: string } }>;
}

export async function fetchPageContent(slug: string) {
  return safeFetchJson(`${API_BASE}/pages/${slug}`) as Promise<{ page: any }>;
}

export async function loginAdminApi(credentials: { email: string; password: string } | string, passwordParam?: string) {
  let bodyPayload: { email: string; password: string };
  if (typeof credentials === 'string') {
    bodyPayload = { email: credentials, password: passwordParam || '' };
  } else {
    bodyPayload = credentials;
  }

  return safeFetchJson(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload)
  }) as Promise<{ token: string; user: any }>;
}

export async function submitAppointmentRequest(data: {
  full_name: string;
  phone_number: string;
  service_needed: string;
  preferred_date?: string;
  preferred_time?: string;
  message: string;
  consent: boolean;
}) {
  return safeFetchJson(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }) as Promise<{ message: string; id: number }>;
}

export async function submitContactEnquiry(data: {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  preferred_contact?: string;
  consent: boolean;
}) {
  return safeFetchJson(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }) as Promise<{ message: string; id: number }>;
}
