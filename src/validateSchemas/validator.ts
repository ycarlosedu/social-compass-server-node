import yupConfig from "./config";

export const validatorCompiler = ({ schema }: any) => {
  return function (data: any) {
    try {
      const value = schema.validateSync(data, yupConfig);
      return { value };
    } catch (error: any) {
      return { error };
    }
  };
};
