"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Fetchdata } from "../query/fetchdata";

function page() {
  interface user {
    id: number;
    namalokasi: string,
    alamatlokasi: string,
    telepon: string,
    picgedung: string,
    tanggal: string,
    operator: string,
    sistemparkir: string,
    pk: string,
    pm: string,
    kondisi: string,
    kontrak: string,
    status: string,
    keterangan: string,
  }


  const { data } = useQuery<user[]>({
    queryKey: ["message"],
    queryFn: Fetchdata,
    refetchInterval: 2000,
  });
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6">
      {data?.map((item)=>
   
      <div key={item.id}>
      <div className="grid sm:grid-cols-3 sm:gap-6 py-20 "  >
        <div className="card bg-base-100  shadow-lg hover:shadow-xl hover:scale-150  hover:z-15 ease-out transition-all duration-200">
          <figure className="">
            <img 
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title">FOTO 1</h1>
          </div>
        </div>       
      </div>
      
      <div className="pb-3 border py-2 px-2 rounded-xl shadow-lg">
        <div className="card  ">
          <label >Nama Lokasi : <span>{item.namalokasi}</span> </label>
          <h2><span className="font-bold">Operator :</span> <span>{item.operator}</span> </h2>
          <h2><span className="font-bold">Sistem Parkir :</span>{item.sistemparkir}</h2>
          <h2><span className="font-bold">Akhir Kontrak : </span>{item.kontrak}</h2>
          <h2><span className="font-bold">Kondiisi Lokasi : </span>{item.kondisi}</h2>
          <h1>
            <span className="font-bold">Jumlah Pos Motor : </span> ||<span className="font-bold"> Jumlah Pos Mobil :</span>  ||
            <span className="font-bold">PM :</span> {item.pm} || <span className="font-bold">PK: {item.pk}</span> 
          </h1>
          <div className="grid sm:grid-cols-3 gap-2 py-4 px-2 justify-center">
            <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                FollowUp 1
              </label>
              <p className="overflow-hidden">
              
              </p>
            </div>
            <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
              <label className="label">FollowUp 2</label>
              <p className="break-words">
                
              </p>
            </div>
           <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
              <label className="label">FollowUp 3</label>
              <p className="break-words">
               
              </p>
            </div>
          </div>
          <h2>Keterangan :</h2>
        </div>
      </div>
      </div>
     
    )}

      

      
    </div>
  );
}

export default page;
