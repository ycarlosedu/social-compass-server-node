import * as yup from "yup";

export const UpdateUserSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      name: yup.string(),
      occupation: yup.string(),
      sex: yup.mixed().oneOf(["Male", "Female"]),
      birthdate: yup.string(),
      address: yup.string(),
      phone: yup.string(),
      image: yup.string(),
    })
    .required(),
};
