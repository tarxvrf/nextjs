"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Postdata } from "../query/postdata";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";


function Page() {
  const filref = useRef<HTMLInputElement | null>(null);
  type Formtype = {
    id: number;
    marketing: string;
    namalokasi: string;
    alamatlokasi: string;
    telepon: string;
    tender: string;
    picgedung: string;
    tanggal: string;
    operator: string;
    sistemparkir: string;
    pk: string;
    pm: string;
    kondisi: string;
    kontrak: string;
    status: string;
    foto1: File | undefined;
    keterangan: string;
  };
  const initform: Formtype = {
    id: 0,
    marketing: "",
    namalokasi: "",
    alamatlokasi: "",
    telepon: "",
    tender: "",
    picgedung: "",
    tanggal: "",
    operator: "",
    sistemparkir: "",
    pk: "",
    pm: "",
    kondisi: "",
    kontrak: "",
    status: "",
    foto1: undefined,
    keterangan: "",
  };

  const [form, setform] = useState<Formtype>(initform);

  //TAMBAH DATA
  const { mutate, isError } = useMutation({
    mutationFn: (form: Formtype) => Postdata(form),
    onSuccess: () => {
      Swal.fire({
         title:"Berhasil Tersimpan",
         icon:"success",
         draggable:false
      }      
      )
    },
    onError:()=>{
      Swal.fire({
         title:"Gagal Tersimpan",
         icon:"error",
         html:`<span style="color:#FF0000"><b>Nama Lokasi </b></span>Tidak Boleh Sama`,
         draggable:false
      }      
      )
    }
  });
  function submitdata(event: React.FormEvent) {
    event.preventDefault();

    mutate(form);
    setform(initform);
    if (filref.current) {
      filref.current.value = "";
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 to-white ">
      <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-10 h-16">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Marketing Input</a>
        </div>
        <div className="flex gap-2">
          <h1 className="text-center p-2">Hello! </h1>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  width={100}
                  height={100}
                  alt="Tailwind CSS Navbar component"
                  src="/globe.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full h-[calc(100%-64px)] sm:max-w-2xl sm:mx-auto">
        <form
          className="flex flex-col w-full gap-5 pt-25 px-2 "
          onSubmit={submitdata}
        >
          <div className="flex gap-2 sm:w-96">
            <label className="floating-label">
              <span>Marketing</span>
              <select
                onChange={(e) =>
                  setform({ ...form, marketing: e.target.value })
                }
                name="marketing"
                value={form.marketing}
                className="select rounded-2xl"
                required
              >
                <option value="">--Pilih Marketing--</option>
                <option value="Wiwit">Wiwit</option>
                <option value="Candra">Candra</option>
                <option value="Rohmat">Rohmat</option>
                <option value="Fairus">Fairus</option>
              </select>
            </label>

            <label className="floating-label">
              <span>Tanggal</span>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={(e) => setform({ ...form, tanggal: e.target.value })}
                className="input max-w-sm rounded-2xl shadow-2xl shadow-amber-200"
                required
              />
            </label>
          </div>

          <label className="floating-label">
            <span>Nama Lokasi</span>
            <input
              value={form.namalokasi}
              name="namalokasi"
              className="input sm:w-96 w-full rounded-2xl shadow-2xl shadow-amber-200"
              type="text"
              placeholder="Nama Lokasi"
              onChange={(e) => setform({ ...form, namalokasi: e.target.value })}
              required
            />
          </label>
          <label className="floating-label">
            <span>Alamat Lokasi</span>
            <input
              value={form.alamatlokasi}
              name="alamatlokasi"
              className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
              type="text"
              placeholder="Alamat Lokasi"
              onChange={(e) =>
                setform({ ...form, alamatlokasi: e.target.value })
              }
            />
          </label>
          <div className="flex gap-3 ">
            <label className="floating-label">
              <span>Up/Pic Client</span>
              <input
                value={form.picgedung}
                name="picgedung"
                className="input sm:w-64 rounded-2xl shadow-2xl shadow-amber-200"
                type="text"
                placeholder="PIC Gedung"
                onChange={(e) =>
                  setform({ ...form, picgedung: e.target.value })
                }
              />
            </label>
            <label className="floating-label">
              <span>Telpon/Email</span>
              <input
                value={form.telepon}
                name="telepon"
                className="input rounded-2xl shadow-2xl shadow-amber-200"
                type="text"
                placeholder="Telpon/Email"
                onChange={(e) => setform({ ...form, telepon: e.target.value })}
              />
            </label>
            <label className="floating-label">
              <span>Tender</span>
              <select
                onChange={(e) => setform({ ...form, tender: e.target.value })}
                name="tender"
                value={form.tender}
                className="select rounded-2xl"
                required
              >
                <option value="">--Pilih Tender-</option>
                <option value="GB">GB</option>
                <option value="MP">MP</option>
                <option value="GB-MP">GB-MP</option>
              </select>
            </label>
          </div>

          <label className="floating-label">
            <span>Keterangan</span>
            <textarea
              value={form.keterangan}
              onChange={(e) => setform({ ...form, keterangan: e.target.value })}
              name="keterangan"
              className="textarea w-full sm:min-h-96 h-64 rounded-2xl shadow-2xl "
              placeholder="Keterangan Canvasing"
              maxLength={200}
            ></textarea>
          </label>
          <div className="sm:pt-5 pb-2">
            <button className="btn btn-success text-white hover:bg-yellow-500  info btn-md w-full rounded-3xl ">
              kirim
            </button>
          </div>
          {/*        <div className='grid sm:grid-cols-3 gap-1'>
                        <select
                            onChange={(e) => setform({ ...form, sistemparkir: e.target.value })}
                            name='sistemparkir'
                            className="select w-full rounded-2xl shadow-2xl shadow-amber-200"
                            value={form.sistemparkir}
                        >
                            <option value="">--Sistem Parkir--</option>
                            <option value="Warga">Warga</option>
                            <option value="Parking">Parking</option>
                            <option value="Manual">Manual</option>
                            <option value="Kosong">Kosong</option>
                        </select>

                          <div className="grid grid-cols-2 gap-1">
                    <input
                    type="input"
                    name="operator"
                    value={form.operator}
                    onChange={(e) => setform({ ...form, operator: e.target.value })}
                    className="input max-w-sm rounded-2xl shadow-2xl shadow-amber-200"
                    placeholder="Operator"
                    />
          </div>
                       
                        <input onChange={(e) => setform({ ...form, pk: e.target.value })} value={form.pk} type="number" min={0} max={10} className="input w-full rounded-2xl shadow-2xl shadow-amber-200" placeholder='PK' />
                        <input onChange={(e) => setform({ ...form, pm: e.target.value })} value={form.pm} type="number" min={0} max={10} className="input w-full rounded-2xl shadow-2xl shadow-amber-200" placeholder='PM' />
                    </div>
                    <input
                        type="input"
                        name='kondisi'
                        value={form.kondisi}
                        onChange={(e) => setform({ ...form, kondisi: e.target.value })}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        placeholder='Kondisi Lokasi'

                    />
                    <input
                        type="input"
                        name='kontrak'
                        value={form.kontrak}
                        onChange={(e) => setform({ ...form, kontrak: e.target.value })}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        placeholder='Akhir Kontrak'

                    />
                    <select
                        onChange={(e) => setform({ ...form, status: e.target.value })}
                        name='status'
                        className="select w-full rounded-2xl shadow-2xl shadow-amber-200"
                        value={form.status}
                    >
                        <option value="">--Pilih status--</option>
                        <option value="Onprogres">Onprogres</option>
                        <option value="Tertarik">Tertarik</option>
                        <option value="Batal">Batal</option>
                        <option value="Deal">Deal</option>
                    </select>
                    <input type="file" ref={filref} name='foto1'accept="image/*" capture={"environment"} onChange={(e) => setform({ ...form, foto1: e.target.files?.[0] || undefined})} />
                 */}
        </form>
      </div>
    </div>
  );
}

export default Page;
