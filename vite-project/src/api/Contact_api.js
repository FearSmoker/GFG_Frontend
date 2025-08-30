const API_BASE_URL = 'https://gfg-backend-rjtn.onrender.com/api/v1/contact';

export const submitContactForm = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact form');
    }

    return {
      success: true,
      data: data,
      message: data.message
    };

  } catch (error) {
    console.error('Contact API Error:', error);
    
    return {
      success: false,
      error: error.message,
      message: error.message || 'Network error. Please check your connection and try again.'
    };
  }
};