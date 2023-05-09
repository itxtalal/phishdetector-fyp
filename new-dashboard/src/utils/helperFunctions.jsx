import axios from "axios";

const url = "";

export const blackListDomain = async ({ domain }) => {
  try {
    const res = await axios.post("", domain);
    return res;
  } catch (error) {
    return error;
  }
};

export const whiteListDomain = async ({ domain }) => {
  try {
    const res = await axios.post("", domain);
    return res;
  } catch (error) {
    return error;
  }
};

export const highlight = ({ search = "", children = "" }) => {
  const escapeRegExp = (str = "") =>
    str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

  const patt = new RegExp(`(${escapeRegExp(search)})`, "i");
  const parts = String(children).split(patt);

  if (search) {
    return parts.map((part, index) =>
      patt.test(part) ? <mark key={index}>{part}</mark> : part
    );
  } else {
    return children;
  }
};

export const deleteItem = async ({ url, token, paramsId }) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  const res = await axios.delete(url + `/${paramsId}`, config);
  if (res.status !== 200) return { error: "couldn't fetch", status: 404 };

  return res?.data;
};

export const loginUser = async (credentials) => {
  console.log(credentials);
  try {
    const res = await axios.post(
      "https://642a2247b11efeb75993bc29.mockapi.io/blacklisted",
      credentials
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const registerUser = async (credentials) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/user/register",
      credentials
    );
    return res;
  } catch (error) {
    const err = error;
    return err.response;
  }
};
