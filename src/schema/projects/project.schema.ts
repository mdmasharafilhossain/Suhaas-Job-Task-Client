import z from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Project name is required" })
    .min(3, { message: "Project name must be at least 3 characters" })
    .max(100, { message: "Project name is too long" })
    .trim(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description is too long" })
    .trim(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
