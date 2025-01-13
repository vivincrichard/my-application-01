import Select from "react-select";
import { useDepartments, useStaffCreate, useStaffList } from "./StaffQuery";
import { genderOptions, IStaff } from "./staffService";
import { Controller, useForm } from "react-hook-form";

type OptionType = { value: string | any; label: string };

function Staff() {
  const { data } = useStaffList();
  const { mutateAsync: createStaff } = useStaffCreate();
  const { data: departmentData } = useDepartments();

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      name: null,
      gender: null,
      age: null,
      role: null,
      phoneNumber: null,
      email: null,
      shift: null,
    },
  });

  const clearValues = () =>
    reset({
      name: null,
      gender: null,
      age: null,
      role: null,
      phoneNumber: null,
      email: null,
      shift: null,
    });

  const listLength = () => {
    const l = data?.length;
    return String(Number(l) + 1);
  };

  const onsubmit = (formData: any) => {
    console.log("ssssss");

    const idLength = listLength();

    const payload: IStaff = {
      id: idLength,
      name: formData?.name,
      age: formData?.age,
      gender: formData?.gender,
      role: formData?.role,
      phoneNumber: formData?.phoneNumber,
      email: formData?.email,
      shift: Number(formData?.shift ? formData?.shift : undefined),
    };

    createStaff(payload);
    clearValues();
    console.log("submit", payload);
  };

  // Convert departmentData to the required format for react-select
  const departmentOptions = departmentData?.map((role) => ({
    value: role.id, // assuming 'id' is unique for each role
    label: role.name, // assuming 'name' is the display name
  }));

  const values = watch();
  console.log("Current Form Values:", values);

  return (
    <div className="m-3">
      <h5>Create Staff</h5>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="text-end mb-1">
          <button
            type="button"
            className="btn btn-outline-light text-dark mx-1"
            onClick={clearValues}
          >
            Clear
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
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
          <div className="form-group col-12 col-sm-6 col-md-3">
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
          <div className="form-group col-12 col-sm-6 col-md-3">
            <div className="row">
              <label
                htmlFor="phoneNumber"
                className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
              >
                Phone Number
              </label>
              <div className="col-8 m-0 p-0">
                <input
                  type="number"
                  id="phoneNumber"
                  className="form-control"
                  {...register("phoneNumber")}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-3 mt-1">
            <div className="row">
              <label
                htmlFor="email"
                className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
              >
                Email
              </label>
              <div className="col-8 m-0 p-0">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  {...register("email")}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-12 col-sm-6 col-md-3 mt-1">
            <div className="row">
              <label
                htmlFor="role"
                className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
              >
                Role
              </label>
              <div className="col-8 m-0 p-0">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: null, label: "Select a Role" }, // Placeholder option
                        ...(departmentOptions || []), // Actual departments
                      ]}
                      value={
                        departmentOptions?.find(
                          (option) => option.value === field.value
                        ) || {
                          value: null,
                          label: "Select a Role",
                        } // Fallback to placeholder
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption?.value || null); // Handle null value
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="form-group d-flex col-12 col-sm-6 col-md-3 mt-1 p-0">
            <label
              htmlFor="shift"
              className="col-4 form-label d-flex justify-content-center fw-bold m-0 p-0"
            >
              Shift
            </label>
            <div className="d-flex col-8 gap-3">
              <div className="form-check">
                <input
                  id="day_shift"
                  type="radio"
                  value={1} // Numeric value
                  className="form-check-input"
                  {...register("shift")} // Ensures value is a number
                />
                <label htmlFor="day_shift" className="form-check-label">
                  Day Shift
                </label>
              </div>
              <div className="form-check">
                <input
                  id="night_shift"
                  type="radio"
                  value={2} // Numeric value
                  className="form-check-input"
                  {...register("shift")} // Ensures value is a number
                />
                <label htmlFor="night_shift" className="form-check-label">
                  Night Shift
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Staff;
