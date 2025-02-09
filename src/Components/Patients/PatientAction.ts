// Action Creator

import { ThunkAction } from "redux-thunk";
import { IPatient, SET_PATIENTS, SET_PATIENTS_LOADING } from "./types";
import { Action } from "redux";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

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

export const createPatient =
  (patientData: IPatient): ThunkAction<void, null, null, Action<string>> =>
  async (dispatch) => {
    try{
      dispatch(setPatientsLoading(true));
      const response = await axios.post(`http://localhost:4000/patients`,patientData);
      dispatch(setPatientsLoading(false))
    }catch{}
  };



  