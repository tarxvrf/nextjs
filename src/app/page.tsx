"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Deletedata } from "./query/deletedata";
import { Updatedata } from "./query/updatedata";
import { Fetchdata } from "./query/fetchdata";
import { Postdata } from "./query/postdata";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

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
function Data() {
  // LIHAT DAATA
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

  const { data, isLoading } = useQuery<user[]>({
    queryKey: ["message"],
    queryFn: Fetchdata,
    refetchInterval: 2000,
  });

  const [form, setform] = useState(initform);
  const [status, setstatus] = useState("");
  const [search, setsearch] = useState("");
  const [startdate, settanggal] = useState("");
  const [bulan, setbulan] = useState("");
  const [tombol, settombol] = useState("submit");

  // Logic Filter
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
  //TAMBAH DATA
  const { mutate, isError } = useMutation({
    mutationFn: Postdata,
    onSuccess: () => {},
  });

  function submitdata(event: React.FormEvent) {
    event.preventDefault();
    if (tombol == "submit") {
      mutate({
        name: form.name,
        lokasi: form.lokasi,
        telepon: form.telepon,
        picgedung: form.picgedung,
        tanggal: form.tanggal,
        status: form.status,
        keterangan: form.keterangan,
      });

      setform(initform);
    }
    if (tombol == "Update") {
      updatem({
        id: form.id,
        name: form.name,
        lokasi: form.lokasi,
        telepon: form.telepon,
        picgedung: form.picgedung,
        tanggal: form.tanggal,
        status: form.status,
        keterangan: form.keterangan,
      });
      setform({ ...form, name: "" });
      settombol("submit");
      setform(initform);
    }
  }

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
  if (isError) return <div>gagal terkirim</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <form
          className="w-full grid grid-cols-4 gap-2 px-2  max-w-6xl"
          onSubmit={submitdata}
        >
          <input
            value={form.name}
            className="input"
            type="text"
            placeholder="nama"
            required
            onChange={(e) => setform({ ...form, name: e.target.value })}
          />
          <input
            value={form.lokasi}
            className="input"
            type="text"
            required
            placeholder="Lokasi"
            onChange={(e) => setform({ ...form, lokasi: e.target.value })}
          />
          <input
            value={form.telepon}
            className="input"
            type="text"
            required
            placeholder="Telpon/Email"
            onChange={(e) => setform({ ...form, telepon: e.target.value })}
          />
          <input
            value={form.picgedung}
            className="input"
            type="text"
            required
            placeholder="PIC Gedung"
            onChange={(e) => setform({ ...form, picgedung: e.target.value })}
          />
          <input
            type="date"
            name=""
            value={form.tanggal}
            onChange={(e) => setform({ ...form, tanggal: e.target.value })}
            className="input"
            required
          />
          <select
            onChange={(e) => setform({ ...form, status: e.target.value })}
            required
            className="select"
            value={form.status}
          >
            <option value="">--Pilih status--</option>
            <option value="Onprogres">Onprogres</option>
            <option value="Tertarik">Tertarik</option>
            <option value="Batal">Batal</option>
            <option value="Deal">Deal</option>
          </select>
          <textarea
            value={form.keterangan}
            onChange={(e) => setform({ ...form, keterangan: e.target.value })}
            required
            name="keterangan"
            className="textarea"
            placeholder="keterangan"
            maxLength={200}
          ></textarea>
          <button className="btn btn-info btn-xs">{tombol}</button>

          {/** PENCARIAN **/}
          <div className="flex gap-5 border w-2xl">
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
              <input value={startdate} type="date" onChange={(e) => settanggal(e.target.value)} />
            </label>

            <button className="btn btn-error text-xs" onClick={handleclear}>
              clear
            </button>
          </div>
        </form>
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
      </div>
    </div>
  );
}

export default Data;
