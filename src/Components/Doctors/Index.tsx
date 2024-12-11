import { useState } from "react";
import Slider from "../HOD/Slider";
import CreateUpdateDoctor from "./CreateUpdateDoctor";
import ListDoctor from "./ListDoctor";

function Doctors() {

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  console.log('listId',selectedDoctorId);
  
  return (
    <>
      <div className="container-fluid">
        <Slider
          id="createUpdateDoctor"
          header={selectedDoctorId ? 'Update Doctor' : 'Create Doctor'}
          width="50"
          sliderBody={<CreateUpdateDoctor selectedId={selectedDoctorId} />}
        />
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#createUpdateDoctor"
            onClick={() => {
              setSelectedDoctorId('');
            }}
          >
            New
          </button>
        </div>
        <h1>Doctors List</h1>
        <ListDoctor onSelectDoctor={setSelectedDoctorId} />
      </div>
    </>
  );
}

export default Doctors;
