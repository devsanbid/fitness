export const getUsers = async () => {
  const response = await fetch("http://localhost:8080/api/user", {
    method: "GET",
    credentials: "include",
  });

  const jsondata = await response.json();
  return jsondata;
};
