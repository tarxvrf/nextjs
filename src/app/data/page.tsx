"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Fetchdata from '../fetchdata'
import Postdata from '../postdata'
import { useState } from 'react'



interface user {
  id: number
  name: string
}
function Data() { 
    const client = useQueryClient()
    const [namem,setname]= useState('')
    
    const {data =[] ,isLoading}= useQuery<user[]>({
      queryKey: ['message'],
      queryFn: Fetchdata,
    })
    client.refetchQueries


    const {mutate,isSuccess,isError}= useMutation({
      mutationFn: Postdata,
      onSuccess: () => {
       
        },
    })
 
  function submitdata(event: React.FormEvent){
    event.preventDefault()
    mutate({name:namem})
    
  }

if (isError) return <div>gagal terkirim</div>
   return (
  <div>
  {data?.map(rek => (
    <li key={rek.id}>{rek.name}</li>
  ))}

  <div>
  <form onSubmit={submitdata}>
  <input type="text" name='name' onChange={(e)=>setname(e.target.value)} className='border'/>
  <button type='submit' className='bg-blue-400 rounded-2xl'>kirim</button>

  </form>

  </div>
</div>

  )
}

export default Data