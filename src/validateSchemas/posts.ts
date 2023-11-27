import * as yup from "yup";

export const CreatePostSchema = {
  body: yup
    .object({
      text: yup.string().required(),
      location: yup.string(),
      image: yup.string(),
      authorId: yup.string().required(),
    })
    .required(),
};

export const UpdatePostSchema = {
  params: yup
    .object({
      id: yup.string().required(),
    })
    .required(),
  body: yup
    .object({
      text: yup.string(),
      location: yup.string(),
      image: yup.string(),
    })
    .required(),
};
