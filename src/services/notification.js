/**
 * Notification Service
 * Toast notification system with types, queues, and accessibility
 */

import { createContext, useCallback, useContext, useState } from 'react'

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

// Default duration in milliseconds
const DEFAULT_DURATION = 5000

// Notification context
const NotificationContext = createContext(null)

// Notification provider
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  // Add notification
  const notify = useCallback(({ 
    type = NOTIFICATION_TYPES.INFO,
    title,
    message,
    duration = DEFAULT_DURATION,
    persistent = false,
    action,
    actionLabel,
    onAction,
    closable = true,
  }) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
    
    const notification = {
      id,
      type,
      title,
      message,
      duration: persistent ? 0 : duration,
      persistent,
      action,
      actionLabel,
      onAction,
      closable,
      timestamp: new Date(),
    }

    setNotifications(prev => [...prev, notification])

    // Auto-remove if not persistent
    if (!persistent && duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }, [])

  // Convenience methods
  const success = useCallback((title, message) => 
    notify({ type: NOTIFICATION_TYPES.SUCCESS, title, message }), [notify])
  
  const error = useCallback((title, message) => 
    notify({ type: NOTIFICATION_TYPES.ERROR, title, message, duration: 8000 }), [notify])
  
  const warning = useCallback((title, message) => 
    notify({ type: NOTIFICATION_TYPES.WARNING, title, message }), [notify])
  
  const info = useCallback((title, message) => 
    notify({ type: NOTIFICATION_TYPES.INFO, title, message }), [notify])

  // Remove notification
  const remove = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  // Clear all notifications
  const clear = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      notify, 
      success, 
      error, 
      warning, 
      info, 
      remove, 
      clear 
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

// Hook to use notifications
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Toast Container Component (for rendering notifications)
export function ToastContainer({ position = 'top-right' }) {
  const { notifications, remove } = useNotifications()

  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }

  return (
    <div 
      aria-live="polite" 
      aria-atomic="true"
      className={`fixed z-50 flex flex-col gap-2 ${positionStyles[position]}`}
    >
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} onClose={remove} />
      ))}
    </div>
  )
}

// Toast component
export function Toast({ notification, onClose }) {
  const { 
    id, type, title, message, actionLabel, onAction, closable 
  } = notification

  const iconMap = {
    [NOTIFICATION_TYPES.SUCCESS]: '✓',
    [NOTIFICATION_TYPES.ERROR]: '✕',
    [NOTIFICATION_TYPES.WARNING]: '⚠',
    [NOTIFICATION_TYPES.INFO]: 'ℹ',
  }

  const typeStyles = {
    [NOTIFICATION_TYPES.SUCCESS]: 'bg-green-500/10 border-green-500/30 text-green-400',
    [NOTIFICATION_TYPES.ERROR]: 'bg-red-500/10 border-red-500/30 text-red-400',
    [NOTIFICATION_TYPES.WARNING]: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    [NOTIFICATION_TYPES.INFO]: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  }

  const handleClick = () => {
    if (actionLabel && onAction) {
      onAction()
      onClose(id)
    }
  }

  return (
    <div 
      role="alert"
      aria-live="polite"
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg
        max-w-sm w-full animate-slide-in
        ${typeStyles[type]}
      `}
    >
      <span className="text-lg flex-shrink-0" aria-hidden="true">
        {iconMap[type]}
      </span>
      
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium text-sm">{title}</p>}
        {message && <p className="text-sm opacity-90 mt-0.5">{message}</p>}
        {actionLabel && (
          <button
            onClick={handleClick}
            className="text-sm underline mt-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-current rounded"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {closable && (
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-current rounded"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default {
  NotificationProvider,
  ToastContainer,
  useNotifications,
  NOTIFICATION_TYPES,
}
