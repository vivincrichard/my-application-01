import { useState } from "react";
import Slider from "../HOD/Slider";
import CreateUpdateHospital from "./CreateUpdateHospital";
import {
  fetchAllHospital,
  useCreateHospital,
  UseDeleteHospitalById,
} from "./query/HospitalQuery";

function HospitalIndex() {
  const [selectedId, setSelectedId] = useState<any>();

  console.log('logggggggg',selectedId);
  
  const {
    data: listHospital,
    isLoading: listLoading,
    isError: listError,
  } = fetchAllHospital();

  const { mutate: deleteHospital } = UseDeleteHospitalById();

  const { mutateAsync: createHospital } = useCreateHospital();

  console.log("aaaaaa", listHospital);

  return (
    <>
      <Slider
        header={`${selectedId ? 'Update Hospital' : 'Create Hospital'}`}
        id="hospitalCanvas"
        width="50"
        sliderBody={<CreateUpdateHospital selectedId={selectedId} />}
      />
      <div className="container-fluid">
        <h1>Hospital</h1>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#hospitalCanvas"
          >
            New
          </button>
        </div>
        <table className="table table-active">
          <thead>
            <tr>
              <th>Id</th>
              <th>Hospital Name</th>
              <th>Reg No</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>PinCode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Directly map over the listHospital array */}
            {listHospital?.map((hospital) => (
              <tr key={hospital.id}>
                <td>{hospital.id}</td>
                <td>{hospital.hospitalName}</td>
                <td>{hospital.registrationNo}</td>
                <td>{hospital?.location?.country}</td>
                <td>{hospital?.location?.state}</td>
                <td>{hospital?.location?.city}</td>
                <td>{hospital?.location?.pincode}</td>
                <td>
                  <button
                    className="btn btn-light"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#hospitalCanvas"
                    onClick={() => {
                      console.log("editID", hospital?.id);
                      setSelectedId(hospital?.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log("delete", hospital?.id);
                      deleteHospital(hospital?.id);
                      setSelectedId("");
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HospitalIndex;
