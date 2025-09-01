import toast from "react-hot-toast";

// Handle rate limit errors specifically
export function handleRateLimitError(error, data) {
  const message = data?.error || error.message || 'Rate limit exceeded';
  const retryAfter = data?.retryAfter || 'some time';
  
  toast.error(`${message} Please wait ${retryAfter}.`, {
    duration: 6000,
    style: {
      background: '#FEF2F2',
      color: '#DC2626',
      border: '1px solid #FECACA'
    }
  });
}

// Handle validation errors (400 status)
export function handleValidationError(error, data) {
  const message = data?.error || error.message || 'Validation failed';
  
  toast.error(message, {
    duration: 4000,
    style: {
      background: '#FEF3C7',
      color: '#D97706',
      border: '1px solid #FDE68A'
    }
  });
}

// Handle authentication errors (401/403)
export function handleAuthError(error, data, navigate) {
  const message = data?.error || error.message || 'Authentication failed';
  
  // Clear invalid token
  localStorage.removeItem('access_token');
  
  toast.error(message, {
    duration: 4000,
    style: {
      background: '#FEF2F2',
      color: '#DC2626'
    }
  });
  
  // Redirect to signin after a short delay
  setTimeout(() => {
    navigate('/signin');
  }, 1500);
}

// Handle server errors (500+)
export function handleServerError(error, data) {
  const message = data?.error || error.message || 'Server error occurred';
  
  toast.error(message, {
    duration: 5000,
    style: {
      background: '#FEF2F2',
      color: '#DC2626'
    }
  });
}

// Handle network/unknown errors
export function handleNetworkError(error) {
  console.error('Network error:', error);
  
  toast.error('Network error. Please check your connection and try again.', {
    duration: 4000,
    style: {
      background: '#F3F4F6',
      color: '#374151'
    }
  });
}

// Handle success responses
export function handleSuccess(message) {
  toast.success(message, {
    duration: 4000,
    style: {
      background: '#F0FDF4',
      color: '#166534',
      border: '1px solid #BBF7D0'
    }
  });
}

// Main error handler that routes to appropriate handlers
export function handleApiError(error, response, data, navigate) {
  console.error('API Error:', { error, response, data });
  
  if (!response) {
    // Network error
    handleNetworkError(error);
    return;
  }
  
  switch (response.status) {
    case 429:
      handleRateLimitError(error, data);
      break;
      
    case 400:
      handleValidationError(error, data);
      break;
      
    case 401:
    case 403:
      handleAuthError(error, data, navigate);
      break;
      
    case 404:
      toast.error(data?.error || 'Resource not found');
      break;
      
    case 500:
    case 502:
    case 503:
    case 504:
      handleServerError(error, data);
      break;
      
    default:
      toast.error(data?.error || error.message || 'An unexpected error occurred');
  }
}

// Utility to disable form elements temporarily for rate limiting
export function disableFormTemporarily(formId, duration = '1 hour') {
  const form = document.getElementById(formId);
  const submitButtons = form?.querySelectorAll('button[type="submit"], input[type="submit"]');
  
  if (submitButtons) {
    submitButtons.forEach(btn => {
      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = `Please wait ${duration}`;
      
      // Store original text to restore later if needed
      btn.dataset.originalText = originalText;
    });
  }
}

// Utility to re-enable form elements
export function enableForm(formId) {
  const form = document.getElementById(formId);
  const submitButtons = form?.querySelectorAll('button[type="submit"], input[type="submit"]');
  
  if (submitButtons) {
    submitButtons.forEach(btn => {
      btn.disabled = false;
      if (btn.dataset.originalText) {
        btn.textContent = btn.dataset.originalText;
        delete btn.dataset.originalText;
      }
    });
  }
}