import { z } from "zod";

export const supportFormSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  guardian_name: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please provide a complete address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6, "Pincode must be 6 digits"),
  disability_type: z.string().min(1, "Please specify the type of disability"),
  support_needed: z.string().min(10, "Please describe the support needed in detail"),
  income_proof_file: z.instanceof(File).optional(),
  medical_proof_file: z.instanceof(File).optional(),
  additional_notes: z.string().optional(),
});

export type SupportFormData = z.infer<typeof supportFormSchema>;