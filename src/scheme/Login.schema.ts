import * as zod from "zod";

const loginSchema = zod
  .object({
    email: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
export default loginSchema;
