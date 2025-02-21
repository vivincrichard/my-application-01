import React from "react";
import CreateUpdatePatient from "./CreateUpdatePatient";
import { IPatient } from "./types"; 

interface IProps {
  patient: IPatient;
}

const PatientIndex = (props: IProps) => {

  return (
    <>
      <h1>Patient Index</h1>
    </>
  );
};

export default PatientIndex;
