import Select from "react-select";
import { useRoles, useStaffList } from "./StaffQuery";
import { genderOptions, IRoles } from "./staffService";
import { Controller, useForm } from "react-hook-form";

type OptionType = { value: string; label: string };

function Staff() {
  const { data } = useStaffList();
  const { data: rolesData } = useRoles();

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      age: undefined,
    },
  });

  const onsubmit = (formData: any) => {
    console.log("submit", formData);
    // Handle form submission (e.g., send to API or update state)
  };

  console.log("staff", data, rolesData);

  return (
    <div className="m-3">
      <h5>Create Staff</h5>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="row">
          <div className="form-group col-2 col-md-3 mb-2 row">
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
            <label htmlFor="gender" className="col-sm-2 col-form-label fw-bold">
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
                    // Pass the value to the Select component to make the selected option show up
                    value={genderOptions.find(
                      (option) => option.value === field.value
                    )}
                    // Override the onChange to just return the value
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
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
                {...register("age")}
              />
            </div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Staff;
