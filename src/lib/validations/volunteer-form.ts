import { z } from "zod";

export const volunteerFormSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .refine(
      (value) => /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(value),
      { message: "Please enter a valid Indian phone number" }
    ),
  skills: z.string().min(10, "Please describe your skills and experience"),
  availability: z.string().min(10, "Please describe your availability"),
  notes: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;