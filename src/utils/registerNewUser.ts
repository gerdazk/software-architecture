export async function registerUser({
  name,
  email,
  password,
  requestedToBeCoach
}) {
  try {
    const response = await fetch('/api/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, requestedToBeCoach })
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
    console.error('Error registering user:', error)
    return
  }
}
