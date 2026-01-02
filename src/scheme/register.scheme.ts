import * as zod from "zod";

const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
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
    rePassword: zod.string().nonempty("Confirm Password is required"),
    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}$/),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
export default registerSchema;
