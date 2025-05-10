import { z } from "zod";

// Login formu için Zod şeması
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Kullanıcı adı en az 3 karakter olmalıdır" })
    .max(50, { message: "Kullanıcı adı 50 karakterden fazla olamaz" }),
  password: z
    .string()
    .min(5, { message: "Şifre en az 5 karakter olmalıdır" })
    .max(100, { message: "Şifre 100 karakterden fazla olamaz" }),
});

// Şema tipi
export type LoginFormData = z.infer<typeof loginSchema>;
