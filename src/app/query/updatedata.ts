export const Updatedata = async ({
  id,
  name,
  lokasi,
  telepon,
  picgedung,
  tanggal,
  status,
  keterangan,
}: {
  id: number;
  name: string;
  lokasi: string;
  telepon: string;
  picgedung: string;
  tanggal: string;
  status: string;
  keterangan: string;
}) => {
  const res = await fetch(`http://localhost:8080/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      lokasi: lokasi,
      telepon: telepon,
      picgedung: picgedung,
      tanggal: tanggal,
      status: status,
      keterangan: keterangan,
    }),
  });
  if (!res.ok) throw new Error("nextjs gagal update data");
  return res.json();
};
