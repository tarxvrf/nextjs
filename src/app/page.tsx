"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Deletedata } from "./query/deletedata";
import { Updatedata } from "./query/updatedata";
import { Fetchdata } from "./query/fetchdata";
import { Postdata } from "./query/postdata";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";


function Data() {
 
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

      const initform = {
    id: 0,
    name: "",
    lokasi: "",
    telepon: "",
    picgedung: "",
    tanggal: "",
    status: "",
    keterangan: "",
  };
   const [form, setform] = useState(initform);
 // LIHAT DAATA

  const { data, isLoading } = useQuery<user[]>({
    queryKey: ["message"],
    queryFn: Fetchdata,
    refetchInterval: 2000,
  });

  
  const [status, setstatus] = useState("");
  const [search, setsearch] = useState("");
  const [startdate, settanggal] = useState("");
  const [bulan, setbulan] = useState("");

   const { mutate, isError } = useMutation({
          mutationFn: Postdata,
          onSuccess: () => { },
      });
  

  const capaionprogres = useMemo(() => {
    return data?.filter((item) => item.status === "Onprogres").length;
  }, [data]);
  const capaitertarik = useMemo(() => {
    return data?.filter((item) => item.status === "Tertarik").length;
  }, [data]);
  const capaideal = useMemo(() => {
    return data?.filter((item) => item.status === "Deal").length;
  }, [data]);
  const capaibatal = useMemo(() => {
    return data?.filter((item) => item.status === "Batal").length;
  }, [data]);
  const totalprospek = useMemo(() => {
    return data?.filter((item) => item.status).length;
  }, [data]);
  // Logic Filterc
  const filtered = useMemo(() => {
    return data?.filter((item) => {
      const bysearch = item.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
      const bystatus = status === item.status || status == "";
      const bytanggal = startdate === item.tanggal || startdate === "";
      const bybulan =
        bulan === dayjs(item.tanggal).format("MMMM") || bulan === "";

      return bysearch && bystatus && bytanggal && bybulan;
    });
  }, [search, status, startdate, data, bulan]);

  //Unik Bulan
  const unikbulan = [
    ...new Set(data?.map((item) => dayjs(item.tanggal).format("MMMM"))),
  ];
  //Clear filter
  const handleclear = (e: FormEvent) => {
    e.preventDefault();
    setbulan("");
    setstatus("");
    setsearch("");
    setstatus("");
    settanggal("");
  };

  // END Logic Filter//

  // HAPUS DATA
  const { mutate: hapus, isError: iserrorhapus } = useMutation({
    mutationFn: Deletedata,
    onSuccess: () => {
      console.log("data berhasil dihapus");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const hapusdata = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    console.log(id);
    hapus({ id: id });
  };

  // Update Data
  const { mutate: updatem } = useMutation({
    mutationFn: Updatedata,
    onSuccess: () => {
      console.log("data berhasil diupdate");
    },
  });
  const [tombol, settombol] = useState("submit");

  const Edit = (
    e: React.FormEvent,
    id: number,
    name: string,
    lokasi: string,
    telepon: string,
    picgedung: string,
    tanggal: string,
    status: string,
    keterangan: string
  ) => {
    e.preventDefault();
    settombol("Update");
    setform({
      ...form,
      id,
      name,
      lokasi,
      telepon,
      picgedung,
      tanggal,
      status,
      keterangan,
    });
  };

  if (iserrorhapus) return <div>error hapus data</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mx-auto px-4 py-10">
      <div>
        
        {/** PENCARIAN **/}
        <div className="flex gap-5 w-2xl pt-6">
          <div>
            <input
              value={search}
              type="text"
              placeholder="search"
              onChange={(e) => setsearch(e.target.value)}
              className="input py-3 mb-3"
            />
          </div>
          <select
            onChange={(e) => setstatus(e.target.value)}
            required
            value={status}
            className="select "
          >
            <option value="">--Pilih status--</option>
            <option value="Onprogres">Onprogres</option>
            <option value="Tertarik">Tertarik</option>
            <option value="Batal">Batal</option>
            <option value="Deal">Deal</option>
          </select>

          <select
            onChange={(e) => setbulan(e.target.value)}
            required
            value={bulan}
            className="select"
          >
            <option value={""}>Pilih bulan</option>
            {unikbulan.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="" className="input flex gap-1">
            <input
              value={startdate}
              type="date"
              onChange={(e) => settanggal(e.target.value)}
            />
          </label>

          <button className="btn btn-error text-xs" onClick={handleclear}>
            clear
          </button>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 pt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Lokasi</th>
                <th>No telpon</th>
                <th>PIC Gedung</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {filtered?.map((item, index) => (
                <tr key={index}>
                  <th key={index}>{item.id}</th>
                  <td>{item.name}</td>
                  <td>
                    <Link
                      className="text-blue-600 font-bold underline"
                      href={"/survey"}
                      target="_blank"
                    >
                      {item.lokasi}
                    </Link>
                  </td>
                  <td>{item.telepon}</td>
                  <td>{item.picgedung}</td>
                  <td>{dayjs(item.tanggal).format("DD-MM-YYYY")}</td>
                  <td>{item.status}</td>
                  <td>{item.keterangan}</td>
                  <td>
                    {" "}
                    <button
                      onClick={(e) => hapusdata(e, item.id)}
                      className="bg-red-500 rounded-2xl p-1 text-xs"
                    >
                      hapus
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="bg-amber-400 rounded-xl text-xs p-1"
                      onClick={(e) =>
                        Edit(
                          e,
                          item.id,
                          item.name,
                          item.lokasi,
                          item.telepon,
                          item.picgedung,
                          item.tanggal,
                          item.status,
                          item.keterangan
                        )
                      }
                    >
                      edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-10">
          <h3>Pencapaian Onprogres = {capaionprogres}</h3>
          <h3>Pencapaian Tertarik = {capaitertarik}</h3>
          <h3>Pencapaian Batal = {capaibatal}</h3>
          <h3>Pencapaian Onprogres = {capaideal}</h3>
          <h1 className="text-xl font-bold">Total Prospek = {totalprospek}</h1>
        </div>

        <div
          className="radial-progress bg-primary text-primary-content border-primary border-4"
          style={{ "--value": 70 } as React.CSSProperties}
          aria-valuenow={70}
          role="progressbar"
        >
          70%
        </div>
       
      </div>
    </div>
  );
}

export default Data;
