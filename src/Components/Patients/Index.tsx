import React from "react";
import CreateUpdatePatient from "./CreateUpdatePatient";
import { IPatient } from "./types"; // Import the IPatient type

interface IProps {
  patient: IPatient; // Expecting patient of type IPatient
}

const PatientIndex = (props: IProps) => {
  console.log("Patient:", props?.patient);

  return (
    <>
      <CreateUpdatePatient />
      <h1>Patient Index</h1>
    </>
  );
};

export default PatientIndex;
