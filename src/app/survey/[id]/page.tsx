import Image from "next/image"
interface Pageprops {
  params: Promise<{
    id: string
  }>
}

async function page({ params }: Pageprops) {

  const { id } = await params
  const res = await fetch(`http://localhost:8080/users/${id}`, {
    cache: "no-store", // biar data selalu fresh
  });
  const data = await res.json();
console.log(data.data.foto1)

  return (


    <div className=" max-w-6xl mx-auto sm:px-20 px-2 pt-2 sm:pt-20 ">


      <div key={data.data.id}>
        <div className="grid sm:grid-cols-3 sm:gap-6  "  >
          <div className="card bg-base-100  shadow-lg hover:shadow-xl sm:hover:scale-150  hover:z-15  transition-all duration-200">
            <figure className="">
              <Image width={500} height={500} alt="" src={data.data.foto1 ===""?`/images/window.svg`:`http://localhost:8080/${data.data.foto1}`} />
            </figure>
            <div className="card-body">
              <h1 className="card-title">FOTO 1 </h1>
            </div>
          </div>
        </div>

        <div className="pb-3 border py-2 px-2 rounded-xl shadow-lg">
          <div className="card  ">
            <label >Nama Lokasi : <span>{data.data.namalokasi}</span> </label>
            <h2><span className="font-bold">Operator :</span> <span>{data.data.operator}</span> </h2>
            <h2><span className="font-bold">Sistem Parkir :</span>{data.data.sistemparkir}</h2>
            <h2><span className="font-bold">Akhir Kontrak : </span>{data.data.kontrak}</h2>
            <h2><span className="font-bold">Kondiisi Lokasi : </span>{data.data.kondisi}</h2>
            <h1>
              <span className="font-bold">Jumlah Pos Motor : </span> <br /><span className="font-bold"> Jumlah Pos Mobil :</span><br />
              <span className="font-bold">PM :</span> {data.data.pm} || <span className="font-bold">PK:</span> {data.data.pk}
            </h1>
            <div className="grid sm:grid-cols-3 gap-2 py-4 px-2 justify-center">
              <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  FollowUp 1
                </label>
                <p className="overflow-hidden">

                </p>
              </div>
              <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
                <label className="label">FollowUp 2</label>
                <p className="break-words">

                </p>
              </div>
              <div className="border rounded-lg p-3 w-full bg-white shadow-sm">
                <label className="label">FollowUp 3</label>
                <p className="break-words">

                </p>
              </div>
            </div>
            <h2><span className="font-bold">Keterangan :</span> {data.data.keterangan}</h2>
          </div>
        </div>
      </div>



    </div>
  );

}

export default page;
