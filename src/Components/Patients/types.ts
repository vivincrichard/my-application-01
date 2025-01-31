export interface Patient {
  patientId: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string; // Use Date if preferred
  address: Address;
  contactNumber: string;
  email: string;
  emergencyContact: EmergencyContact;
  medicalHistory: MedicalHistory[];
  allergies: string[];
  currentMedications: Medication[];
  insuranceDetails: InsuranceDetails;
  appointments: Appointment[];
  registrationDate: string; // Use Date if preferred
  status: "Active" | "Inactive" | "Archived";
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  contactNumber: string;
}

interface MedicalHistory {
  condition: string;
  diagnosedDate: string; // Use Date if preferred
  status: "Ongoing" | "Managed" | "Resolved";
}

interface Medication {
  medicationName: string;
  dosage: string;
  frequency: string;
}

interface InsuranceDetails {
  provider: string;
  policyNumber: string;
  validUntil: string; // Use Date if preferred
}

interface Appointment {
  appointmentId: string;
  date: string; // Use Date if preferred
  time: string;
  doctor: string;
  department: string;
  status: "Confirmed" | "Cancelled" | "Pending";
}
