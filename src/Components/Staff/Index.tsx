import Select from "react-select";
import { useRoles, useStaffCreate, useStaffList } from "./StaffQuery";
import { genderOptions, IRoles, IStaff } from "./staffService";
import { Controller, useForm } from "react-hook-form";

type OptionType = { value: string | any; label: string };

function Staff() {
  const { data } = useStaffList();
  const { mutateAsync: createStaff } = useStaffCreate();
  const { data: rolesData } = useRoles();

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      name: null,
      gender: null,
      age: null,
      role: null,
    },
  });

  const listLength = () => {
    const l = data?.length;
    return String(Number(l) + 1);
  };

  const onsubmit = (formData: any) => {
    const idLength = listLength();

    const payload: IStaff = {
      id: idLength,
      name: formData?.name,
      age: formData?.age,
      gender: formData?.gender,
      role: formData?.role,
    };

    createStaff(payload);
    console.log("submit", payload);
  };

  // Convert rolesData to the required format for react-select
  const rolesOptions = rolesData?.map((role) => ({
    value: role.id, // assuming 'id' is unique for each role
    label: role.name, // assuming 'name' is the display name
  }));

  const values = watch();
  console.log("Current Form Values:", values);

  return (
    <div className="m-3">
      <h5>Create Staff</h5>
      <div className="text-end mb-1">
        <button
          type="button"
          className="btn btn-outline-light text-dark mx-1"
          onClick={() =>
            reset({
              name: null,
              gender: null,
              age: null,
              role: null,
            })
          }
        >
          Clear
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="row">
          <div className="form-group col-12 col-sm-6 col-md-3">
            <div className="row">
              <label
                htmlFor="name"
                className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
              >
                Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name")}
                />
              </div>
            </div>
          </div>

          <div className="form-group col-12 col-sm-6 col-md-3">
            <div className="row">
              <label
                htmlFor="gender"
                className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
              >
                Gender
              </label>
              <div className="col-sm-8 m-0 p-0">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={genderOptions as OptionType[]}
                      value={genderOptions.find(
                        (option) => option?.value === field.value
                      )}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption?.value)
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="form-group col-12 col-sm-6 col-md-2">
            <div className="row">
              <label
                htmlFor="age"
                className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
              >
                Age
              </label>
              <div className="col-8 m-0 p-0">
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  {...register("age")}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-4">
            <div className="row">
              <label
                htmlFor="role"
                className="col-2 form-label d-flex justify-content-center fw-bold
              m-0 p-0"
              >
                Role
              </label>
              <div className="col-10 m-0 p-0">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={rolesOptions}
                      value={rolesOptions?.find(
                        (option) => option.value === field?.value
                      )}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption?.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Staff;
