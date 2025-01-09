import Select from "react-select";
import { useStaffList } from "./StaffQuery";
import { genderOptions } from "./staffService";

function Staff() {
  const { data } = useStaffList();

  console.log("staff", data);

  return (
    <>
      <div className="m-3">
        <h5>Create Staff</h5>
        <form>
          <div className="row">
            <div className="form-group col-3 mb-2 row">
              <label htmlFor="name" className="col-sm-2 col-form-label fw-bold">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
              </div>
            </div>
            <div className="form-group col-3 mb-2 row">
              <label
                htmlFor="gender"
                className="col-sm-2 col-form-label fw-bold"
              >
                Gender
              </label>
              <div className="col-sm-10">
                <Select name="gender" options={genderOptions} />
              </div>
            </div>
            <div className="form-group col-3 mb-2 row">
              <label htmlFor="age" className="col-sm-2 col-form-label fw-bold">
                Age
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                />
              </div>
            </div>
            <div className="form-group col-3 mb-2 row">
              <label htmlFor="role" className="col-sm-2 col-form-label fw-bold">
                Role
              </label>
              <div className="col-sm-10">
                <Select name="role" aria-label="Role" />
              </div>
            </div>
            <div className="form-group col-3 mb-2 row">
              <label htmlFor="role" className="col-sm-2 col-form-label fw-bold">
                Role
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Staff;
