

export const login = async (form: { username: string; password: string }) => {
  const formdata = new FormData();
  formdata.append("username", form.username);
  formdata.append("password", form.password);

  const res = await fetch(`http://localhost:8080/login`, {
    method: "POST",
    body: formdata,
    credentials:"include"
  });
  if(!res.ok) throw new Error
 
};
