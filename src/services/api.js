/**
 * Centralized API Service Layer
 * Provides consistent API communication with error handling, interceptors, and retry logic
 */

// Base configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
}

// Simulated delay for demo (remove in production)
const SIMULATED_DELAY = parseInt(import.meta.env.VITE_SIMULATED_DELAY) || 0

// Request interceptor - add auth token
const addAuthToken = (config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// Response interceptor - handle errors
const handleResponse = (response) => {
  return response.data
}

// Error handler with retry logic
const handleError = async (error, retryCount = 0) => {
  const { config, response } = error

  // Network errors - retry logic
  if (!response && retryCount < API_CONFIG.retryAttempts) {
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay))
    return apiClient({ ...config, retryCount: retryCount + 1 })
  }

  // HTTP errors
  if (response) {
    const errorMessages = {
      400: 'Invalid request. Please check your input.',
      401: 'Authentication required. Please log in again.',
      403: 'You do not have permission to access this resource.',
      404: 'The requested resource was not found.',
      500: 'Server error. Please try again later.',
      503: 'Service temporarily unavailable.',
    }

    error.message = errorMessages[response.status] || `Error: ${response.statusText}`
  }

  return Promise.reject(error)
}

// Main API client
const apiClient = async (config) => {
  const finalConfig = {
    ...API_CONFIG,
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...API_CONFIG.headers,
      ...config.headers,
    },
  }

  try {
    // Simulate network delay for demo
    if (SIMULATED_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY))
    }

    addAuthToken(finalConfig)

    // In production, use actual fetch/axios
    // const response = await fetch(finalConfig.baseURL + finalConfig.url, finalConfig)
    // return handleResponse(response)

    // Demo: return mock data
    return { data: config.mockData || null }
  } catch (error) {
    return handleError(error, config.retryCount || 0)
  }
}

// API methods
export const api = {
  get: (url, params = {}, config = {}) => 
    apiClient({ ...config, method: 'GET', url, params, mockData: { url, params } }),
  
  post: (url, data = {}, config = {}) => 
    apiClient({ ...config, method: 'POST', url, data, mockData: { url, data } }),
  
  put: (url, data = {}, config = {}) => 
    apiClient({ ...config, method: 'PUT', url, data, mockData: { url, data } }),
  
  patch: (url, data = {}, config = {}) => 
    apiClient({ ...config, method: 'PATCH', url, data, mockData: { url, data } }),
  
  delete: (url, config = {}) => 
    apiClient({ ...config, method: 'DELETE', url, mockData: { url } }),
}

// Batch requests
export const apiBatch = async (requests) => {
  const results = await Promise.allSettled(
    requests.map(req => apiClient(req))
  )
  return results.map((result, index) => ({
    index,
    status: result.status,
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason : null,
  }))
}

// Request queue for rate limiting
class RequestQueue {
  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent
    this.queue = []
    this.active = 0
  }

  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject })
      this.processQueue()
    })
  }

  async processQueue() {
    while (this.queue.length > 0 && this.active < this.maxConcurrent) {
      const { request, resolve, reject } = this.queue.shift()
      this.active++
      
      try {
        const result = await apiClient(request)
        resolve(result)
      } catch (error) {
        reject(error)
      } finally {
        this.active--
        this.processQueue()
      }
    }
  }
}

export const requestQueue = new RequestQueue()

export default api
