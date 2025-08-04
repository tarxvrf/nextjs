"use client"
import { getNamedRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import {useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
  const [form, setForm] = useState({ name: "", password: "" });
  const route = useRouter();
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch('https://go-download-production.up.railway.app/login', {
      method: 'POST',
      headers:{
        'Content-Type':' application/json'
      },
      body: JSON.stringify(form),
      credentials : 'include'
    })
    const data = await res.json()
    if (!res.ok || res.status === 500){
      alert("gagal")
    }else{
      route.push("/dashboard")
    }
   
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-xl bg-white space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <div>
        <label className="block mb-1 font-medium">User</label>
        <input
          type="text"          
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>
  );
}
