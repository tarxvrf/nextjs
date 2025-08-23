"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Fetchdata } from "../query/fetchdata";

function page() {
  interface user {
    id: number;
    name: string;
    lokasi: string;
    telepon: string;
    picgedung: string;
    tanggal: string;
    status: string;
    keterangan: string;
  }

  const { data } = useQuery<user[]>({
    queryKey: ["message"],
    queryFn: Fetchdata,
    refetchInterval: 2000,
  });
  return (
    <div className="max-w-6xl mx-auto px-6 pt-6">
      <div className="grid sm:grid-cols-3 sm:gap-6 py-20 ">
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
        <div className="card bg-base-100  shadow-lg hover:shadow-xl hover:scale-150 hover:z-15 ease-out transition-all duration-200">
          <figure className="">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title">FOTO 2</h1>
          </div>
        </div>

        <div className="card bg-base-100  shadow-lg hover:shadow-xl hover:scale-150  hover:z-15 ease-out transition-all duration-200">
          <figure className="">
            <img
              src="http://localhost:8080/uploads/detos.jpg"
              alt="Shoes"
              className=""
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title">FOTO 3</h1>
          </div>
        </div>
      </div>

      <div className="pb-3 border py-2 px-2 rounded-xl shadow-lg">
        <div className="card  ">
          <label >Nama Lokasi : <span>PT BINTANG</span> </label>
          <h2><span className="font-bold">Operator :</span> <span>MIKA</span> </h2>
          <h2><span className="font-bold">Sistem Parkir :</span>Kosong</h2>
          <h2><span className="font-bold">Akhir Kontrak : </span>5thn</h2>
          <h2><span className="font-bold">Kondiisi Lokasi : </span>Banayak Pungli</h2>
          <h1>
            <span className="font-bold">Jumlah Pos Motor : </span>1 ||<span className="font-bold"> Jumlah Pos Mobil :</span> 2 ||
            <span className="font-bold">PM :</span>  1|| <span className="font-bold">PK:</span> 1
          </h1>
          <div className="grid sm:grid-cols-3 gap-2 py-4 px-2 justify-center">
            <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                FollowUp 1
              </label>
              <p className="overflow-hidden">
                Rapat dengan Manajemen
                fdfasfdfasfdsfafdsfasfdsaf
              </p>
            </div>
            <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
              <label className="label">FollowUp 2</label>
              <p className="break-words">
                Rapat dengan Manajemen fdfasfdf
              </p>
            </div>
           <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
              <label className="label">FollowUp 3</label>
              <p className="break-words">
                Rapat dengan Manajemen
                fdfasfdfasfdsfafdsfasfdsafdf
              </p>
            </div>
          </div>
          <h2>Keterangan :</h2>
        </div>
      </div>
    </div>
  );
}

export default page;
