"use client"
import React, { useEffect, useState } from 'react'

function page() {
    const [data, setdata]= useState([])

    useEffect(()=>{
      fetch("https://go-download-production.up.railway.app/users").then(res=>{
        return res.json()
      }).then(data=>setdata(data))
    })
  return (
    <div>

    <ul>
        {data.map((rs,index)=>
        <li key={index}> {rs.name} </li>
        
        )}
    </ul>


    </div>
  )
}

export default page