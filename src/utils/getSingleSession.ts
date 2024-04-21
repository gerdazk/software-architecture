export async function getSingleSession(id: string) {
  try {
    const response = await fetch(`/api/sessions/?id=${id}`)

    if (response.ok) {
      const data = await response.json()
      console.log({ data, id })
      return data
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
