import * as zod from "zod";

const forgetPassword = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});
export default forgetPassword;
