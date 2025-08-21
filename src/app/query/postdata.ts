import { stat } from "fs";

type User = {
  name: string;
  lokasi: string;
  telepon: string;
  picgedung: string;
  tanggal: string;
  status: string;
  keterangan: string;
};

export const Postdata = async ({
  name,
  lokasi,
  telepon,
  picgedung,
  tanggal,
  status,
  keterangan,
}: User) => {
  const newdata = {
    name: name,
    lokasi: lokasi,
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
