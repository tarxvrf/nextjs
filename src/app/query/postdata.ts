

export const Postdata = async (form: {
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
  foto1: File | undefined,
  keterangan: string,
}) => {
  const formdata = new FormData()
  formdata.append("marketing", form.marketing)
  formdata.append("namalokasi", form.namalokasi)
  formdata.append("alamatlokasi", form.alamatlokasi)
  formdata.append("telepon", form.telepon)
  formdata.append("picgedung", form.picgedung)
  formdata.append("tanggal", form.tanggal)
  formdata.append("operator", form.operator)
  formdata.append("sistemparkir", form.sistemparkir)
  formdata.append("pk", form.pk)
  formdata.append("pm", form.pm)
  formdata.append("kondisi", form.kondisi)
  formdata.append("kontrak", form.kontrak)
  formdata.append("status", form.status)
  formdata.append("foto1",form.foto1 as File ?? undefined)
  //
  console.log(form.foto1)
  formdata.append("keterangan", form.keterangan)

  const res = await fetch("http://localhost:8080/kirim", {
    method: "POST",
    credentials:"include",
    body: formdata,
  });
  console.log(formdata)
  if (!res.ok) throw new Error(res.statusText);
  return res.json;
};
