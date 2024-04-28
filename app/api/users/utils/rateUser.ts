export const rateUser = async props => {
  try {
    const response = await fetch('/api/users/rating', {
      method: 'POST',
      body: JSON.stringify(props)
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      console.log({ error })
      return
    }
  } catch (error) {
    console.error('Error updating rating:', error)
    return
  }
}
