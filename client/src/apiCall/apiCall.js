export const apiCall = async (url, init = null) => {
  const response = await fetch(url, init)
  const results = await response.json()

  return results
}