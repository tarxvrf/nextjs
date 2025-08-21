
export const Fetchdata = async () => {
      const res = await fetch('http://localhost:8080/users')
      const data = await res.json()
  if (!res.ok) throw new Error('Failed to fetch')
  return data.data
}

