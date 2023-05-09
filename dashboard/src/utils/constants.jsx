import * as Yup from "yup";

export const BlackSchema = Yup.object().shape({
  domain: Yup.string().required("Domain Required"),
});
export const WhiteSchema = Yup.object().shape({
  domain: Yup.string().required("Domain Required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short- should be 8 chars min.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

export const RegistrationValidation = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short- should be 8 chars min.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  name: Yup.string()
    .required("Required")
    .min(5, "Name is too short- should be 5 chars min."),
});
