import { stat } from "fs";

interface User {

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
};

export const Postdata = async ({
  namalokasi,
  alamatlokasi,
  telepon,
  picgedung,
  tanggal,
  status,
  keterangan,
  operator, sistemparkir, pk, pm, kondisi, kontrak
}: User) => {
  const newdata = {
    namalokasi: namalokasi,
    alamatlokasi: alamatlokasi,
    operator: operator,
    sistemparkir: sistemparkir,
    pk: pk, pm: pm, kondisi: kondisi, kontrak: kontrak,
    telepon: telepon,
    picgedung: picgedung,
    tanggal: tanggal,
    status: status,
    keterangan: keterangan,
  };
  const res = await fetch("http://localhost:8080/kirim", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newdata),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json;
};
