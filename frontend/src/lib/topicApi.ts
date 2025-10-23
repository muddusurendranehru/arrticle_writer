import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with auth
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Topics API
export const topicsApi = {
  // Get all topics for user
  getAll: () =>
    axios.get(`${API_URL}/api/topics`, {
      headers: getAuthHeaders()
    }),

  // Get single topic
  getById: (id: string) =>
    axios.get(`${API_URL}/api/topics/${id}`, {
      headers: getAuthHeaders()
    }),

  // Create new topic
  create: (data: { name: string; description?: string }) =>
    axios.post(`${API_URL}/api/topics`, data, {
      headers: getAuthHeaders()
    }),

  // Update topic
  update: (id: string, data: { name?: string; description?: string; status?: string }) =>
    axios.put(`${API_URL}/api/topics/${id}`, data, {
      headers: getAuthHeaders()
    }),

  // Delete topic
  delete: (id: string) =>
    axios.delete(`${API_URL}/api/topics/${id}`, {
      headers: getAuthHeaders()
    })
};

// Research Entries API
export const entriesApi = {
  // Get all entries for a topic
  getByTopic: (topicId: string) =>
    axios.get(`${API_URL}/api/topics/${topicId}/entries`, {
      headers: getAuthHeaders()
    }),

  // Get single entry
  getById: (id: string) =>
    axios.get(`${API_URL}/api/topics/entries/${id}`, {
      headers: getAuthHeaders()
    }),

  // Add entry to topic
  create: (topicId: string, data: {
    originalText: string;
    source?: string;
    notes?: string;
  }) =>
    axios.post(`${API_URL}/api/topics/${topicId}/entries`, data, {
      headers: getAuthHeaders()
    }),

  // Update entry (usually to add rewritten text)
  update: (id: string, data: {
    originalText?: string;
    rewrittenText?: string;
    source?: string;
    notes?: string;
    isProcessed?: boolean;
  }) =>
    axios.put(`${API_URL}/api/topics/entries/${id}`, data, {
      headers: getAuthHeaders()
    }),

  // Delete entry
  delete: (id: string) =>
    axios.delete(`${API_URL}/api/topics/entries/${id}`, {
      headers: getAuthHeaders()
    })
};


