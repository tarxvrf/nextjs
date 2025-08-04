"use client"
import React, { useEffect, useState } from 'react'


interface user {
    name : string,
}
function Data() {
    const [data, setdata]= useState<user[]>([])

    useEffect(()=>{
      fetch("https://go-download-production.up.railway.app/users")
      .then(response => response.json()).then(datax => setdata(datax.message))
    },[])
  
   return (
    <div>

    <div>
    {data?.map((re,index)=>
    <li key={index}>{re.name }</li>
    
    )}
  </div>


    </div>
  )
}

export default Data