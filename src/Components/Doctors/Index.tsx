import Slider from "../HOD/Slider";
import CreateUpdateDoctor from "./CreateUpdateDoctor";
import ListDoctor from "./ListDoctor";

function Doctors() {
  return (
    <>
      <div className="container-fluid">
        <Slider
          id="createUpdateDoctor"
          header="Create Doctor"
          width="50"
          sliderBody={<CreateUpdateDoctor />}
        />
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#createUpdateDoctor"
          >
            New
          </button>
        </div>
        <h1>Doctors List</h1>
        <ListDoctor />
      </div>
    </>
  );
}

export default Doctors;
