/**
 * Authentication Service with Role-Based Access Control (RBAC)
 * Supports multiple user roles with permission-based feature access
 */

// User roles configuration
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
}

// Permission definitions
export const PERMISSIONS = {
  // Dashboard permissions
  VIEW_DASHBOARD: 'view_dashboard',
  EXPORT_DATA: 'export_data',
  
  // Customer permissions
  VIEW_CUSTOMERS: 'view_customers',
  EDIT_CUSTOMER: 'edit_customer',
  DELETE_CUSTOMER: 'delete_customer',
  
  // Analytics permissions
  VIEW_ANALYTICS: 'view_analytics',
  CREATE_REPORTS: 'create_reports',
  
  // Model permissions
  VIEW_MODEL_INSIGHTS: 'view_model_insights',
  CONFIGURE_MODEL: 'configure_model',
  
  // User management
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  
  // System permissions
  VIEW_SETTINGS: 'view_settings',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
}

// Role-permission mapping
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.VIEW_CUSTOMERS,
    PERMISSIONS.EDIT_CUSTOMER,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.CREATE_REPORTS,
    PERMISSIONS.VIEW_MODEL_INSIGHTS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
  ],
  [ROLES.ANALYST]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.VIEW_CUSTOMERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.CREATE_REPORTS,
    PERMISSIONS.VIEW_MODEL_INSIGHTS,
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_CUSTOMERS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
}

// Mock users for demo
const MOCK_USERS = {
  'admin@company.com': {
    id: 'u1',
    email: 'admin@company.com',
    name: 'Admin User',
    role: ROLES.ADMIN,
    avatar: null,
    tenantId: 'tenant_1',
  },
  'manager@company.com': {
    id: 'u2',
    email: 'manager@company.com',
    name: 'Sarah Manager',
    role: ROLES.MANAGER,
    avatar: null,
    tenantId: 'tenant_1',
  },
  'analyst@company.com': {
    id: 'u3',
    email: 'analyst@company.com',
    name: 'John Analyst',
    role: ROLES.ANALYST,
    avatar: null,
    tenantId: 'tenant_1',
  },
  'viewer@company.com': {
    id: 'u4',
    email: 'viewer@company.com',
    name: 'Mike Viewer',
    role: ROLES.VIEWER,
    avatar: null,
    tenantId: 'tenant_1',
  },
}

// Auth state
let currentUser = null
let authListeners = []

// Subscribe to auth changes
export const onAuthChange = (callback) => {
  authListeners.push(callback)
  return () => {
    authListeners = authListeners.filter(cb => cb !== callback)
  }
}

// Notify all listeners
const notifyListeners = () => {
  authListeners.forEach(cb => cb(currentUser))
}

// Get current user
export const getCurrentUser = () => currentUser

// Check if user is authenticated
export const isAuthenticated = () => !!currentUser

// Get user role
export const getUserRole = () => currentUser?.role || null

// Check if user has specific permission
export const hasPermission = (permission) => {
  if (!currentUser) return false
  const userPermissions = ROLE_PERMISSIONS[currentUser.role] || []
  return userPermissions.includes(permission)
}

// Check if user has any of the specified permissions
export const hasAnyPermission = (permissions) => {
  return permissions.some(p => hasPermission(p))
}

// Check if user has all specified permissions
export const hasAllPermissions = (permissions) => {
  return permissions.every(p => hasPermission(p))
}

// Login
export const login = async (email, password) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const user = MOCK_USERS[email]
  if (!user) {
    throw new Error('Invalid credentials')
  }
  
  // Demo: accept any password for mock users
  currentUser = { ...user }
  localStorage.setItem('auth_user', JSON.stringify(currentUser))
  notifyListeners()
  
  return currentUser
}

// Logout
export const logout = async () => {
  currentUser = null
  localStorage.removeItem('auth_user')
  notifyListeners()
}

// Initialize auth from storage
export const initializeAuth = () => {
  const stored = localStorage.getItem('auth_user')
  if (stored) {
    try {
      currentUser = JSON.parse(stored)
      notifyListeners()
    } catch (e) {
      localStorage.removeItem('auth_user')
    }
  }
}

// Get user permissions
export const getUserPermissions = () => {
  if (!currentUser) return []
  return ROLE_PERMISSIONS[currentUser.role] || []
}

// Check role access
export const hasRole = (roles) => {
  if (!currentUser) return false
  const roleArray = Array.isArray(roles) ? roles : [roles]
  return roleArray.includes(currentUser.role)
}

// Role display names
export const ROLE_DISPLAY_NAMES = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.ANALYST]: 'Analyst',
  [ROLES.VIEWER]: 'Viewer',
}

// Permission display names
export const PERMISSION_DISPLAY_NAMES = {
  [PERMISSIONS.VIEW_DASHBOARD]: 'View Dashboard',
  [PERMISSIONS.EXPORT_DATA]: 'Export Data',
  [PERMISSIONS.VIEW_CUSTOMERS]: 'View Customers',
  [PERMISSIONS.EDIT_CUSTOMER]: 'Edit Customers',
  [PERMISSIONS.DELETE_CUSTOMER]: 'Delete Customers',
  [PERMISSIONS.VIEW_ANALYTICS]: 'View Analytics',
  [PERMISSIONS.CREATE_REPORTS]: 'Create Reports',
  [PERMISSIONS.VIEW_MODEL_INSIGHTS]: 'View Model Insights',
  [PERMISSIONS.CONFIGURE_MODEL]: 'Configure Model',
  [PERMISSIONS.VIEW_USERS]: 'View Users',
  [PERMISSIONS.MANAGE_USERS]: 'Manage Users',
  [PERMISSIONS.VIEW_SETTINGS]: 'View Settings',
  [PERMISSIONS.MANAGE_SETTINGS]: 'Manage Settings',
  [PERMISSIONS.VIEW_AUDIT_LOGS]: 'View Audit Logs',
}

export default {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  getUserPermissions,
  getUserRole,
  initializeAuth,
  ROLES,
  PERMISSIONS,
}
