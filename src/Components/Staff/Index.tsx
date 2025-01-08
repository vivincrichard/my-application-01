import { useStaffList } from "./StaffQuery";

function Staff() {
  const { data } = useStaffList();

  console.log("staff", data);

  return (
    <>
      <div className="m-3">
        <h5>Create Staff</h5>
        <form>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
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

          <div className="form-group row">
            <label htmlFor="age" className="col-sm-2 col-form-label">
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

          <div className="form-group row">
            <label htmlFor="role" className="col-sm-2 col-form-label">
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
        </form>
      </div>
    </>
  );
}

export default Staff;
