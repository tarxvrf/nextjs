

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
  foto1?: File | string,
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
  formdata.append("pm", form.marketing)
  formdata.append("kondisi", form.kondisi)
  formdata.append("kontrak", form.kontrak)
  formdata.append("status", form.status)
  formdata.append("file", form.foto1 as File | string)
  formdata.append("keterangan", form.keterangan)
  console.log(formdata)

  const res = await fetch("http://localhost:8080/kirim", {
    method: "POST",   
   
    body: formdata,
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json;
};
