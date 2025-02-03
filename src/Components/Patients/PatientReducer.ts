import {
  FETCH_PATIENT_DETAILS,
  IPatientState,
  SET_PATIENTS,
  SET_PATIENTS_LOADING,
} from "./types";

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
  },
  isLoading: false,
};

export default (state = initialState, action: any): IPatientState => {
  switch (action.type) {
    case SET_PATIENTS:
      return { ...state, patientDetails: action.payload };
    case FETCH_PATIENT_DETAILS:
      return { ...state, patientDetails: action.payload };
    case SET_PATIENTS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
