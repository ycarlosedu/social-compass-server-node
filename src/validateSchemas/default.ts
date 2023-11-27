import * as yup from "yup";

export const RequestWithID = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
};
