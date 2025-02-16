export const SET_PATIENTS = "SET_PATIENTS";
export const FETCH_PATIENT_DETAILS = "FETCH_PATIENT_DETAILS";
export const SET_PATIENTS_LOADING = "SET_PATIENTS_LOADING";
export const PATIENT_LOADING = "PATIENT_LOADING";

export interface IPatientState {
  patientDetails: IPatient;
  isLoading: boolean;
  patientLoading: boolean;
}

export interface IPatient {
  patientId: string;
  name: string;
  age: number | null;
  gender: string;
  dateOfBirth: string; // Use Date if preferred
  address: Address;
  contactNumber: string;
  email: string;
  emergencyContact: EmergencyContact;
  medicalHistory: MedicalHistory[];
  allergies: string[];
  currentMedications: Medication[];
  insuranceDetails: InsuranceDetails[];
  appointments: Appointment[];
  registrationDate: string; // Use Date if preferred
  status: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: number | null;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  contactNumber: number | null;
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
