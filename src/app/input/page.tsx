"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Postdata } from '../query/postdata';
import { Mutation, useMutation } from '@tanstack/react-query';

function Page() {
    type Formtype = {
        id: number,
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
        kondisi: string,
        kontrak: string,
        status: string,
        foto1?: File,
        keterangan: string,
    }
    const initform: Formtype = {
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
        onSuccess: () => { },
    });


    if (isError) return <div>gagal terkirim</div>;

    function submitdata(event: React.FormEvent) {
        event.preventDefault();

        mutate(form)
        setform(initform);


    }


    return (
        <div className='h-screen bg-gradient-to-br from-amber-600  to-black '>
            <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-10 h-16">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Marketing Input</a>
                </div>
                <div className="flex gap-2">
                    <h1 className='text-center p-2'>Hello! </h1>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image
                                    width={100}
                                    height={100}
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
                    <select
                        onChange={(e) => setform({ ...form, marketing: e.target.value })}

                        value={form.marketing}
                        className="select "
                    >
                        <option value="">--Pilih Marketing--</option>
                        <option value="Wiwit">Wiwit</option>
                        <option value="Candra">Candra</option>

                    </select>
                    <input
                        value={form.namalokasi}
                        name='namalokasi'
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"
                        placeholder="Nama Lokasi"

                        onChange={(e) => setform({ ...form, namalokasi: e.target.value })}
                    />
                    <input
                        value={form.alamatlokasi}
                        name='alamatlokasi'
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"

                        placeholder="Alamat Lokasi"
                        onChange={(e) => setform({ ...form, alamatlokasi: e.target.value })}
                    />
                    <input
                        value={form.telepon}
                        name='telepon'
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"

                        placeholder="Telpon/Email"
                        onChange={(e) => setform({ ...form, telepon: e.target.value })}
                    />
                    <input
                        value={form.picgedung}
                        name='picgedung'
                        className="input w-full rounded-2xl shadow-2xl shadow-amber-200"
                        type="text"

                        placeholder="PIC Gedung"
                        onChange={(e) => setform({ ...form, picgedung: e.target.value })}
                    />
                    <div className='grid grid-cols-2 gap-1'>
                        <input
                            type="date"
                            name='tanggal'
                            value={form.tanggal}
                            onChange={(e) => setform({ ...form, tanggal: e.target.value })}
                            className="input max-w-sm rounded-2xl shadow-2xl shadow-amber-200"

                        />
                        <input
                            type="input"
                            name="operator"
                            value={form.operator}
                            onChange={(e) => setform({ ...form, operator: e.target.value })}
                            className="input max-w-sm rounded-2xl shadow-2xl shadow-amber-200"
                            placeholder='Operator'

                        /></div>
                    <div className='grid sm:grid-cols-3 gap-1'>
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
                    <input type="file" name='file' onChange={(e) => setform({ ...form, foto1: e.target.files ? e.target.files[0] : undefined })} />
                    <textarea

                        value={form.keterangan}

                        onChange={(e) => setform({ ...form, keterangan: e.target.value })}

                        name="keterangan"
                        className="textarea w-full rounded-2xl shadow-2xl "
                        placeholder="Keterangan Canvasing"
                        maxLength={200}
                    ></textarea>
                    <div className=''>
                        <button className="btn btn-success hover:bg-yellow-500  info btn-sm w-32 rounded-3xl ">kirim</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
