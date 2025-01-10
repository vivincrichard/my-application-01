import Select from "react-select";
import { useRoles, useStaffList } from "./StaffQuery";
import { genderOptions, IRoles } from "./staffService";
import { Controller, useForm } from "react-hook-form";
type OptionType = { value: string | number; label: string };

function Staff() {
  const { data } = useStaffList();
  const { data: rolesData } = useRoles();

  const { control, register } = useForm({
    defaultValues: {
      name: data?.name || "",
      gender: data?.gender || "",
    },
  });

  console.log("staff", data, rolesData);

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
                  {...register("name")}
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
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={genderOptions as OptionType[]}
                    />
                  )}
                />
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
                <Select
                  name="role"
                  aria-label="Role"
                  options={
                    rolesData
                      ? rolesData.map((role: IRoles) => ({
                          value: role.id,
                          label: role.name,
                        }))
                      : []
                  }
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
