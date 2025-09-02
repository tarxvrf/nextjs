// app/login/page.tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "./query/login";
import { useRouter } from "next/navigation";
type formtype = {
  username: string;
  password: string;
};

const initform: formtype = {
  username: "",
  password: "",
};
export default function LoginPage() {
   const router = useRouter()
  const [form, setForm] = useState<formtype>(initform);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { mutate: logins} = useMutation({
    
    mutationFn: (form: formtype) => login(form),
    onSuccess: ()=>{
         router.push("/dashboard");
    },   

  });
  const handleSubmit = async (e: React.FormEvent) => {
   
    e.preventDefault();
    logins({ username: form.username, password: form.password });
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-3">
      <div className="card w-96 bg-base-100 shadow-2xl rounded-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="you@example.com"
              value={form.username}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>

          

          {/** <p className="text-center text-sm mt-2">
            Belum punya akun?{" "}
            <a href="/register" className="link link-primary">
              Daftar
            </a>
          </p>*/}
        </form>
      </div>
    </div>
  );
}
