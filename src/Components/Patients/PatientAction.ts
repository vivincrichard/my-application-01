// Action Creator

import { SET_PATIENTS, SET_PATIENTS_LOADING } from "./types";


// Set patient list
export const setPatients = (patients: any) => ({
  type: SET_PATIENTS,
  payload: patients,
});

// Loading state for patient actions
export const setPatientsLoading = (isLoading: boolean) => ({
  type: SET_PATIENTS_LOADING,
  payload: isLoading,
});