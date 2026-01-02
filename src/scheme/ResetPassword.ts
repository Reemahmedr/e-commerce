import * as zod from "zod";

const ResetPassword = zod.object({
  email: zod
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  newPassword: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
export default ResetPassword;
