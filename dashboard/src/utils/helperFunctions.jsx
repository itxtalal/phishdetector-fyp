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
