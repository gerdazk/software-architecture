export async function loginUser({email, password}) {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

  
      if (response.ok) {
        const data = await response.json();
        return data.user
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
        return
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return
    }
  }