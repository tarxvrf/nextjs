"use client"
import React, { useState } from 'react'
import { Postdata } from '../query/postdata';
import { useMutation } from '@tanstack/react-query';

function page() {
    const initform = {
        id: 0,
        namalokasi: "",
        alamatlokasi: "",
        telepon: "",
        picgedung: "",
        tanggal: "",
        operator:"",
        sistemparkir:"",
        pk:"",
        pm:"",
        kondisi:"",
        kontrak:"",
        status: "",
        keterangan: "",
    };
    const [tombol, settombol] = useState("submit");
    const [form, setform] = useState(initform);


    //TAMBAH DATA
    const { mutate, isError } = useMutation({
        mutationFn: Postdata,
        onSuccess: () => { },
    });

    if (isError) return <div>gagal terkirim</div>;

    function submitdata(event: React.FormEvent) {
        event.preventDefault();
        if (tombol == "submit") {
            mutate({
                namalokasi: form.namalokasi ,
                alamatlokasi: form.alamatlokasi,
                telepon: form.telepon,
                picgedung: form.picgedung,
                tanggal: form.tanggal,
                status: form.status,
                operator:form.operator,
                sistemparkir:form.sistemparkir,
                pk:form.pk,
                pm:form.pm,
                kondisi:form.kondisi,
                kontrak:form.kontrak,
                keterangan: form.keterangan,
            });

            setform(initform);
        }
      
    }



    return (
        <div className='h-screen bg-gradient-to-br from-amber-600  to-black '>
            <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-10 h-16">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Marketing Input</a>
                </div>
                <div className="flex gap-2">
                    <h1 className='text-center p-2'>Hello! Chandra</h1>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="/globe.svg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='flex w-full px-2 py-2 h-[calc(100%-64px)] overflow-y-auto sm:max-w-2xl sm:mx-auto'>
                <form
                    className="grid gap-3 w-full pt-20 px-2 "
                    onSubmit={submitdata}
                >
                    <input
                        value={form.namalokasi}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"
                        placeholder="Nama Lokasi"
                        required
                        onChange={(e) => setform({ ...form, namalokasi: e.target.value })}
                    />
                    <input
                        value={form.alamatlokasi}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"
                        required
                        placeholder="Alamat Lokasi"
                        onChange={(e) => setform({ ...form, alamatlokasi: e.target.value })}
                    />
                    <input
                        value={form.telepon}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"
                        required
                        placeholder="Telpon/Email"
                        onChange={(e) => setform({ ...form, telepon: e.target.value })}
                    />
                    <input
                        value={form.picgedung}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"
                        required
                        placeholder="PIC Gedung"
                        onChange={(e) => setform({ ...form, picgedung: e.target.value })}
                    />
                    <div className='grid grid-cols-2 gap-1'>
                    <input
                        type="date"                        
                        value={form.tanggal}
                        onChange={(e) => setform({ ...form, tanggal: e.target.value })}
                        className="input max-w-sm rounded-2xl shadow-2xl shadow-amber-200"
                        required
                    />
                    <input
                        type="input"
                        name="operator"
                        value={form.operator}
                        onChange={(e) => setform({ ...form, operator: e.target.value })}
                        className="input max-w-sm rounded-2xl shadow-2xl shadow-amber-200"
                        placeholder='Operator'
                        required
                    /></div>
                    <div className='grid sm:grid-cols-3 gap-1'>
                        <select
                            onChange={(e) => setform({ ...form,sistemparkir: e.target.value })}
                            required
                            className="select w-full rounded-2xl shadow-2xl shadow-amber-200"
                            value={form.sistemparkir}
                        >
                            <option value="">--Sistem Parkir--</option>
                            <option value="Warga">Warga</option>
                            <option value="Parking">Parking</option>
                            <option value="Manual">Manual</option>
                            <option value="Kosong">Kosong</option>
                        </select>
                        <input  onChange={(e) => setform({ ...form, pk: e.target.value })} value={form.pk} type="number" min={0} max={10} className="input w-full rounded-2xl shadow-2xl shadow-amber-200" placeholder='PK' />
                        <input  onChange={(e) => setform({ ...form, pm: e.target.value })} value={form.pm} type="number" min={0} max={10} className="input w-full rounded-2xl shadow-2xl shadow-amber-200" placeholder='PM' />
                    </div>
                    <input
                        type="input"
                        value={form.kondisi}
                        onChange={(e) => setform({ ...form, kondisi: e.target.value })}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        placeholder='Kondisi Lokasi'
                        required
                    />
                    <input
                        type="input"
                        value={form.kontrak}
                        onChange={(e) => setform({ ...form, kontrak: e.target.value })}
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        placeholder='Akhir Kontrak'
                        required
                    />
                    <select
                        onChange={(e) => setform({ ...form, status: e.target.value })}
                        required
                        className="select w-full rounded-2xl shadow-2xl shadow-amber-200"
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
                        name="Keterangan Canvasing"
                        className="textarea w-full rounded-2xl shadow-2xl "
                        placeholder="Keterangan Canvasing"
                        maxLength={200}
                    ></textarea>
                    <div className=''>
                        <button className="btn btn-success hover:bg-yellow-500  info btn-sm w-32 rounded-3xl ">{tombol}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page
