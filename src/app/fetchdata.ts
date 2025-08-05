"use client"


const Fetchdata = async () => {
      const res = await fetch('https://go-download-production.up.railway.app/users')
      const data = await res.json()
  if (!res.ok) throw new Error('Failed to fetch')
  return data.message
}


export default Fetchdata;