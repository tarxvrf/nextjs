export const Deletedata = async (id: { id: number }) => {
  const response = await fetch(`http://localhost:8080/hapus/${id.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("gagal hapus data");
};
