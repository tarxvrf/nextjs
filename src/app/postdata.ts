"use client"

type User={
   name : string

}
const Postdata = async(user :User)=>{
    const res = await fetch('https://go-download-production.up.railway.app/kirim',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'                       
        },body : JSON.stringify(user),
           
    })
    if(!res.ok) throw new Error(res.statusText)
    return res.json
}
export default Postdata