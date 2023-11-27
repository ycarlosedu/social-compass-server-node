import * as yup from "yup";

export const CreateMarketSchema = {
  body: yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number().required(),
      image: yup.string(),
      sellerId: yup.string().required(),
    })
    .required(),
};

export const UpdateMarketSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      name: yup.string(),
      description: yup.string(),
      price: yup.number(),
      image: yup.string(),
    })
    .required(),
};

export const BuyMarketSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      userId: yup.string(),
    })
    .required(),
};
