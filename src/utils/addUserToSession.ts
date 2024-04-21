export async function addUserToSession(body) {
  try {
    const response = await fetch('/api/sessions/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      console.error('Registration failed:', error)
      return
    }
  } catch (error) {
    console.error('Error registering session:', error)
    return
  }
}
