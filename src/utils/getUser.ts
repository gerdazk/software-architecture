export async function getUser(email) {
  try {
    const response = await fetch(`/api/users/?email=${email}`)

    if (response.ok) {
      const data = await response.json()
      console.log('From getUser', data)
      return data.user
    } else {
      const error = await response.json()
      console.log({ error })
      return null
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
