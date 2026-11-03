import { z } from "zod";

// Schema for validating registration data
export const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener como minimo 3 caracteres"),
  email: z.string().email("El format del correo electronico no es valido"),
  password: z.string().min(6, "La contraseña debe tener como minimo 6 caracteres"),
});

// Schema for validating login data
export const loginSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener como minimo 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener como minimo 6 caracteres"),
});

