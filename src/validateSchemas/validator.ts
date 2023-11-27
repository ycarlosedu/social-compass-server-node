import yupConfig from "./config"

export const validatorCompiler = ({ schema }: any) => {
  return function (data: any) {
    try {
      const result = schema.validateSync(data, yupConfig)
      console.log("🚀 ~ file: validator.ts:7 ~ result:", result)
      return { value: result }
    } catch (e) {
      return { error: e }
    }
  }
}