export async function getCoachSessions(email) {
  try {
    const response = await fetch(`/api/sessions/coachSessions/?email=${email}`)
    console.log('FROM getCoachSessions ', email)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      console.log({ error })
      return
    }
  } catch (error) {
    console.error('Error fetching sessions1:', error)
    return
  }
}
