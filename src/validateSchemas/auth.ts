import * as yup from "yup"

export const LoginSchema = {
  body: yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }).required()
}

export const RegisterSchema = {
  body: yup.object({
    username: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
      .oneOf([yup.ref('password')], 'Passwords must match')
  }).required()
}