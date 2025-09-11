export const Updatedata = async (form: {
  id: number;
  marketing: string;
  namalokasi: string;
  alamatlokasi: string;
  telepon: string;
  picgedung: string;
  tanggal: string;
  status: string;
  operator: string;
  sistemparkir: string;
  pk: string;
  pm: string;
  fu1: string,
  fu2: string,
  fu3: string,
  kondisi: string;
  kontrak: string;
  foto1: File | undefined,
  foto2: File | undefined,
  foto3: File | undefined,
  keterangan: string;

}) => {
  const formdata = new FormData()
  formdata.append("marketing", form.marketing)
  formdata.append("namalokasi", form.namalokasi)
  formdata.append("alamatlokasi", form.alamatlokasi)
  formdata.append("telepon", form.telepon)
  formdata.append("picgedung", form.picgedung)
  formdata.append("tanggal", form.tanggal)
  formdata.append("status", form.status)
  formdata.append("operator", form.operator)
  formdata.append("sistemparkir", form.sistemparkir)
  formdata.append("pk", form.pk)
  formdata.append("pm", form.pm)
  formdata.append("fu1", form.fu1)
  formdata.append("fu2", form.fu2)
  formdata.append("fu3", form.fu3)
  formdata.append("kondisi", form.kondisi)
  formdata.append("kontrak", form.kontrak)
  if (form.foto1) formdata.append("foto1", form.foto1)
  if (form.foto2) formdata.append("foto2", form.foto2)
  if (form.foto3) formdata.append("foto3", form.foto3)
  formdata.append("keterangan", form.keterangan)
  console.log(formdata.getAll)
  const res = await fetch(`http://localhost:8080/edit/${form.id}`, {
    method: "PUT",
    body: formdata

  });
  if (!res.ok) throw new Error("nextjs gagal update data");
  return res.json();
};
