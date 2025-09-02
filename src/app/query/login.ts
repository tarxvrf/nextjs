

export const login = async (form: { username: string; password: string }) => {
  const formdata = new FormData();
  formdata.append("username", form.username);
  formdata.append("password", form.password);

  const res = await fetch(`https://go-download.up.railway.app/login`, {
    method: "POST",
    body: formdata,
    credentials:"include"
  });
  if(!res.ok) throw new Error
 
};
