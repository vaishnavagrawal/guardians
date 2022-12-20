import { object, string, z } from "zod";

export const onboardingSchema = object({
  basic: object({
    name: string().min(1),
    email: string().email(),
    mobile: string().min(1),
  }),
  medical: object({
    allergies: string().min(1),
    currentMedications: string().min(1),
    medicalConditions: string().min(1),
  }),
  contact: object({
    emergency: string().min(1),
  }),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

export const defaultOnboardingData: OnboardingData = {
  basic: {
    name: "Vaishnav Agrawal",
    email: "vaishnavkagrawal2.0@gmail.com",
    mobile: "9022197577",
  },
  medical: {
    allergies: "N/A",
    currentMedications: "N/A",
    medicalConditions: "N/A",
  },
  contact: {
    emergency: "9022197577",
  },
};
