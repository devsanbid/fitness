export const checkCookie = async (redirect) => {
  const checkCookies = await fetch("http://localhost:8080/api/check-cookie", {
    method: "GET",
    credentials: "include",
  });
  const jsondata = await checkCookies.json();
  if (jsondata.status) window.location.href = redirect;
};
