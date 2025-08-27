"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Deletedata } from "./query/deletedata";
import { Updatedata } from "./query/updatedata";
import { Fetchdata } from "./query/fetchdata";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";


function Data() {

  interface user {
    id: number;
    marketing: string,
    namalokasi: string,
    alamatlokasi: string,
    telepon: string,
    picgedung: string,
    tanggal: string,
    operator: string,
    sistemparkir: string,
    pk: string,
    pm: string,
    fu1: string,
    fu2: string,
    fu3: string,
    kondisi: string,
    kontrak: string,
    status: string,
    foto1:string,
    keterangan: string,
  }

  const initform = {
    id: 0,
    marketing: "",
    namalokasi: "",
    alamatlokasi: "",
    telepon: "",
    picgedung: "",
    tanggal: "",
    operator: "",
    sistemparkir: "",
    pk: "",
    pm: "",
    fu1: "",
    fu2: "",
    fu3: "",
    kondisi: "",
    kontrak: "",
    status: "",
    foto1:"",
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
  const [smarketing, setmarketing] = useState("")



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
      const bysearch = item.namalokasi
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
      const bystatus = status === item.status || status == "";
      const bytanggal = startdate === item.tanggal || startdate === "";
      const bybulan =
        bulan === dayjs(item.tanggal).format("MMMM") || bulan === "";
      const bymarketing = smarketing === item.marketing || smarketing === ""

      return bysearch && bystatus && bytanggal && bybulan && bymarketing;
    });
  }, [search, status, startdate, data, smarketing, bulan]);

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

  function submitdata(event: React.FormEvent) {
    event.preventDefault();
    if (tombol == "Update") {
      updatem({
        id: form.id,
        marketing: form.marketing,
        namalokasi: form.namalokasi,
        alamatlokasi: form.alamatlokasi,
        telepon: form.telepon,
        picgedung: form.picgedung,
        tanggal: form.tanggal,
        status: form.status,
        operator: form.operator,
        sistemparkir: form.sistemparkir,
        pk: form.pk,
        pm: form.pm,
        fu1: form.fu1,
    fu2: form.fu2,
    fu3: form.fu3,
        kondisi: form.kondisi,
        kontrak: form.kontrak,
        foto1:form.foto1,
        keterangan: form.keterangan,
      });

      setform(initform);
    }

  }

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openmodal = () => {
    modalRef.current?.showModal()
  }

  const closemodal =()=>{
    modalRef.current?.close()
  }
  const Edit = (
    e: React.FormEvent, id: number, marketing: string, namalokasi: string, alamatlokasi: string, telepon: string, picgedung: string, tanggal: string, operator: string, sistemparkir: string, pk: string, pm: string,fu1:string,fu2:string,fu3:string, kondisi: string, kontrak: string, status: string,foto1:string, keterangan: string) => {
    e.preventDefault();
    settombol("Update");
    openmodal()
    setform({
      ...form,
      id,
      marketing,
      namalokasi,
      alamatlokasi,
      telepon,
      picgedung,
      tanggal,
      operator,
      sistemparkir,
      pk,
      pm,
      fu1,
      fu2,
      fu3,
      kondisi,
      kontrak,
      status,
      foto1,
      keterangan,
    });

  };


  if (iserrorhapus) return <div>error hapus data</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto px-4 py-10">

      <div>

        {/** PENCARIAN **/}
        <div>
          
            <form className="grid gap-2 sm:flex" >
            <input
              value={search}
              type="text"
              placeholder="Cari Nama Lokasi "
              onChange={(e) => setsearch(e.target.value)}
              className="input py-3 mb-3"
            />
       
          <select
            onChange={(e) => setmarketing(e.target.value)}
            required
            value={smarketing}
            className="select"
          >
            <option value="">--Pilih Marketing--</option>
            <option value="Wiwit">Wiwit</option>
            <option value="Candra">Candra</option>

          </select>
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

          <button className="btn btn-error text-xs lg:w-32" onClick={handleclear}>
            clear
          </button>
          </form>
        </div>
      </div>
      <div className="">
        <div className="overflow-x-auto rounded-box border bg-base-200 pt-10">
          <table className="table-auto table-zebra border w-full ">
            {/* head */}
            <thead>
              <tr>
                <th className="hidden sm:block">Marketing</th>
                <th>Nama lokasi</th>
                <th>Alamat Lokasi</th>
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
                <tr key={index} className="bg-base-200 pb-3 ">
                  <td key={index} className="hidden sm:block">{item.marketing}</td>
                  <td>  <Link
                    className="text-blue-600 font-bold underline"
                    href={`/survey/${item.id}`}
                    target="_blank"
                  >{item.namalokasi}</Link></td>
                  <td>

                    {item.alamatlokasi}

                  </td>
                  <td>{item.telepon}</td>
                  <td>{item.picgedung}</td>
                  <td>{dayjs(item.tanggal).format("DD-MM-YYYY")}</td>
                  <td>{item.status}</td>
                  <td>{item.keterangan}</td>
                  <td className="p-1">
                    {" "}
                    <button
                      onClick={(e) => hapusdata(e, item.id)}
                      className="bg-red-500 rounded-xl p-2 text-xs"
                    >
                      hapus
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="bg-amber-400 rounded-xl text-xs px-3 py-2 "
                      onClick={(e) =>
                        Edit(
                          e,
                          item.id,
                          item.marketing,
                          item.namalokasi,
                          item.alamatlokasi,
                          item.telepon,
                          item.picgedung,
                          item.tanggal,
                          item.operator,
                          item.sistemparkir,
                          item.pk,
                          item.pm,
                          item.fu1,
                          item.fu2,
                          item.fu3,
                          item.kondisi,
                          item.kontrak,
                          item.status,
                          item.foto1,
                          item.keterangan,
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

        <dialog ref={modalRef} id="my_modal_1" className="modal ">
          <div className="modal-box max-w-6xl bg-gray-300">
            <div className='grid w-full px-2 py-2  '>
              <form
                className="grid gap-3 "
                onSubmit={submitdata}                
              >
                <select
                  onChange={(e) => setform({ ...form, marketing: e.target.value })}
                  value={form.marketing}
                  className="select rounded-2xl "
                >
                  <option value="">--Pilih Marketing--</option>
                  <option value="Wiwit">Wiwit</option>
                  <option value="Candra">Candra</option>

                </select>
                <input
                  value={form.namalokasi}
                  className="input w-full rounded-2xl shadow-2xl "
                  type="text"
                  placeholder="Nama Lokasi"
                  onChange={(e) => setform({ ...form, namalokasi: e.target.value })}
                />
                <input
                  value={form.alamatlokasi}
                  className="input w-full rounded-2xl shadow-2xl "
                  type="text"
                  placeholder="Alamat Lokasi"
                  onChange={(e) => setform({ ...form, alamatlokasi: e.target.value })}
                />
                <input
                  value={form.telepon}
                  className="input w-full rounded-2xl shadow-2xl "
                  type="text"
                  placeholder="Telpon/Email"
                  onChange={(e) => setform({ ...form, telepon: e.target.value })}
                />
                <input
                  value={form.picgedung}
                  className="input w-full rounded-2xl shadow-2xl "
                  type="text"
                  placeholder="PIC Gedung"
                  onChange={(e) => setform({ ...form, picgedung: e.target.value })}
                />
                <div className='grid grid-cols-2 gap-1'>
                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => setform({ ...form, tanggal: e.target.value })}
                    className="input max-w-sm rounded-2xl shadow-2xl "

                  />
                  <input
                    type="input"
                    name="operator"
                    value={form.operator}
                    onChange={(e) => setform({ ...form, operator: e.target.value })}
                    className="input max-w-sm rounded-2xl shadow-2xl "
                    placeholder='Operator'

                  /></div>
                <div className='grid sm:grid-cols-3 gap-1'>
                  <select
                    onChange={(e) => setform({ ...form, sistemparkir: e.target.value })}

                    className="select w-full rounded-2xl shadow-2xl "
                    value={form.sistemparkir}
                  >
                    <option value="">--Sistem Parkir--</option>
                    <option value="Warga">Warga</option>
                    <option value="Parking">Parking</option>
                    <option value="Manual">Manual</option>
                    <option value="Kosong">Kosong</option>
                  </select>
                  <input onChange={(e) => setform({ ...form, pk: e.target.value })} value={form.pk} type="number" min={0} max={10} className="input w-full rounded-2xl shadow-2xl " placeholder='PK' />
                  <input onChange={(e) => setform({ ...form, pm: e.target.value })} value={form.pm} type="number" min={0} max={10} className="input w-full rounded-2xl shadow-2xl " placeholder='PM' />
                </div>
                <input
                  type="input"
                  value={form.kondisi}
                  onChange={(e) => setform({ ...form, kondisi: e.target.value })}
                  className="input w-full rounded-2xl shadow-2xl "
                  placeholder='Kondisi Lokasi'
                />
                <input
                  type="input"
                  value={form.kontrak}
                  onChange={(e) => setform({ ...form, kontrak: e.target.value })}
                  className="input w-full rounded-2xl shadow-2xl "
                  placeholder='Akhir Kontrak'
                />
                <select
                  onChange={(e) => setform({ ...form, status: e.target.value })}
                  className="select w-full rounded-2xl shadow-2xl "
                  value={form.status}
                >
                  <option value="">--Pilih status--</option>
                  <option value="Onprogres">Onprogres</option>
                  <option value="Tertarik">Tertarik</option>
                  <option value="Batal">Batal</option>
                  <option value="Deal">Deal</option>
                </select>
                 <input
                  type="input"
                  value={form.fu1}
                  onChange={(e) => setform({ ...form, fu1: e.target.value })}
                  className="input w-full rounded-2xl shadow-2xl "
                  placeholder='Follow Up 1'
                />
                 <input
                  type="input"
                  value={form.fu2}
                  onChange={(e) => setform({ ...form, fu2: e.target.value })}
                  className="input w-full rounded-2xl shadow-2xl "
                  placeholder='Follow Up2'
                />

                 <input
                  type="input"
                  value={form.fu3}
                  onChange={(e) => setform({ ...form,fu3: e.target.value })}
                  className="input w-full rounded-2xl shadow-2xl "
                  placeholder='Follow Up 3'
                />
                <input type="file"  />
                <textarea
                  value={form.keterangan}
                  onChange={(e) => setform({ ...form, keterangan: e.target.value })}
                  name="Keterangan Canvasing"
                  className="textarea w-full rounded-2xl shadow-2xl "
                  placeholder="Keterangan Canvasing"
                  maxLength={200}
                ></textarea>
                <div className="flex gap-3">
                     <button className="btn btn-success hover:bg-yellow-500  info btn-sm w-32 rounded-3xl ">{tombol}</button>
                     <button onClick={()=>closemodal()}className="btn btn-error hover:bg-yellow-500  info btn-sm w-32 rounded-3xl ">close</button>
               
                     </div>
                
              </form>
            </div>
          </div>
        </dialog>

      </div>
    </div>
  );
}

export default Data;


