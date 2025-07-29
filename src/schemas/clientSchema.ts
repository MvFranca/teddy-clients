import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  salary: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Salário deve ser um número positivo",
    }),
  companyValuation: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Valor da empresa deve ser um número positivo",
    }),
});
