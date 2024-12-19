
const options = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVpa2VuIiwiZW1haWwiOiJEYW5TdHIxNjIyMUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczNDYxMjUwMX0.kdqFQFoJrAEbfiBvonCs3fC5Muc_fnzgf56Tt_8Nf8w',
      'X-Noroff-API-Key': '486ac6ab-b456-4770-bd5e-b4ea0f8a7582'
    }
  };


// Handle form submission
document.getElementById('auth-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVpa2VuIiwiZW1haWwiOiJEYW5TdHIxNjIyMUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczNDYxMjUwMX0.kdqFQFoJrAEbfiBvonCs3fC5Muc_fnzgf56Tt_8Nf8w',
          'X-Noroff-API-Key': '486ac6ab-b456-4770-bd5e-b4ea0f8a7582',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed: Invalid email or password');
      }
  
      const result = await response.json();
  
      // Save access token to localStorage for authenticated requests
      localStorage.setItem('accessToken', result.data.accessToken);
  
      // Redirect to profile page
      window.location.href = 'profile/index.html';
    } catch (error) {
      // Display error message
      document.getElementById('error-message').innerText = error.message;
    }
  });
  