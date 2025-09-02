import { redirect } from "next/navigation";

export const Fetchdata = async () => {
  const res = await fetch("https://go-download.up.railway.app/users", {
    credentials: "include",
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/"); // ini bisa jalan di Server Component
  }

  const data = await res.json();
  return data.data;
};