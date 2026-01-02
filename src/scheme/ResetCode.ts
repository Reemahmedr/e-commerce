import * as zod from "zod";

const resetCode = zod.object({
  resetCode: zod.string().nonempty("Code is required"),
});
export default resetCode;
