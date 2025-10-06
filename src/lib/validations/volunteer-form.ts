import { z } from "zod";

export const volunteerFormSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  skills: z.string().min(10, "Please describe your skills and experience"),
  availability: z.string().min(10, "Please describe your availability"),
  notes: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;