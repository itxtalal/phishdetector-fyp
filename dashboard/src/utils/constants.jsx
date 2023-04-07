import * as Yup from "yup";

export const BlackSchema = Yup.object().shape({
  domain: Yup.string().required("Domain Required"),
});
export const WhiteSchema = Yup.object().shape({
  domain: Yup.string().required("Domain Required"),
});
