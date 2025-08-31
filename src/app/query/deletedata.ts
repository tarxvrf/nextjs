export const Deletedata = async (id: { id: number }) => {
  const response = await fetch(`https://go-download.up.railway.app/hapus/${id.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("gagal hapus data");
};
