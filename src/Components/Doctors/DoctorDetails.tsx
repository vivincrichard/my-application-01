import { useParams } from "react-router-dom";
import { useDoctorId } from "./DoctorQuery";
import { string } from "yup";
import { useState } from "react";

function DoctorDetails() {
  const { id } = useParams();
  console.log("hhhhhh", id);
  const [selectedId, setSelectedId] = useState<any>(id);

  const { data: doctorDetails } = useDoctorId(selectedId);

  console.log("ddddd", doctorDetails);

  return (
    <>
      <h1>Doctor Details Page</h1>
      <div className="card">
        <div className="row card-body">
          <span className="col-4 m-0 p-0">
            Name&nbsp;:&nbsp;{doctorDetails?.firstName}&nbsp;
            {doctorDetails?.lastName}
          </span>
          <span className="col-4 m-0 p-0">
            contact&nbsp;:&nbsp;{doctorDetails?.contact}
          </span>
          <span className="col-4 m-0 p-0">
            Email&nbsp;:&nbsp;{doctorDetails?.email}
          </span>
          <span className="col-4 m-0 p-0">
            Qualification&nbsp;:&nbsp;{doctorDetails?.qualification}
          </span>
          <span className="col-4 m-0 p-0">
            Specialization&nbsp;:&nbsp;{doctorDetails?.specialization}
          </span>
          <span className="col-4 m-0 p-0">
            MRI No&nbsp;:&nbsp;{doctorDetails?.MRI}
          </span>
          <span className="col-4 m-0 p-0">
            State Medical No&nbsp;:&nbsp;{doctorDetails?.stateMedicalCouncil}
          </span>
          <span className="col-4 m-0 p-0">
            Reg Date&nbsp;:&nbsp;{doctorDetails?.registrationDate}
          </span>
        </div>
      </div>
    </>
  );
}

export default DoctorDetails;
