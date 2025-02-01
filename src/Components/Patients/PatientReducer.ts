import { IPatientState } from "./types";

const initialState: IPatientState = {
  patientDetails: {
    patientId: "",
    name: "",
    age: null,
    gender: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: null,
    },
    contactNumber: "",
    email: "",
    emergencyContact: {
      name: "",
      relationship: "",
      contactNumber: null,
    },
    medicalHistory: [],
    allergies: [],
    currentMedications: [],
    insuranceDetails: [],
    appointments: [],
    registrationDate: "",
    status: "",
  }
};

export default (state = initialState, action: any): IPatientState => {
  switch (action.type) {
    default:
      return state;
  }
};
