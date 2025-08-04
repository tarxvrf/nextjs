"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

function dashboard() {
    const router = useRouter();
    const [file,setfile]= useState<File | null>(null);

    const hand= (event: { preventDefault: () => void; }) => {
      
       fetch('https://go-download-production.up.railway.app/logout',{
        method: "POST",
        credentials: 'include',
        
       }).then(res =>{
        if(res.ok){
          router.push("/")
        }
        if(res.status === 401){
          router.push("/")
        }
       })
      
            
    }
      
  useEffect(() => {
    fetch('https://go-download-production.up.railway.app/', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          router.push('/') // redirect ke login kalau belum login
        }
      })
  }, [])

  const upload = async (e : React.FormEvent ) =>{
    e.preventDefault()  
    const formdata = new FormData();
    formdata.append('file',file as File );
   
      const res = await fetch("https://go-download-production.up.railway.app/upload", {
        method: "POST",
        body: formdata,
      });

      const hasil = await res.json();
     if(res.ok){
      alert("berhasil upload")
     }else{
      alert("gagal upload")
     }
   

  }

  return (
    <div>dashboard


    <form onSubmit={hand} className='flex gap-2'>

    <input type="file" name="file" accept='image/*' onChange={(e) => setfile(e.target.files?.[0] || null)} />
    <button type='submit' className='bg-blue-500 rounded-2xl'>logout</button>
    <button onClick={upload} className='bg-blue-500 rounded-2xl'>upload</button>
    </form>

    </div>


   
  )
}

export default dashboard