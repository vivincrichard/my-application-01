import Select from "react-select";
import { useDepartments, useStaffCreate, useStaffList } from "./StaffQuery";
import { genderOptions, IStaff } from "./staffService";
import { Controller, useForm } from "react-hook-form";
import { capitalFirstLetters } from "../Utils";
import { useState } from "react";

type OptionType = { value: string | any; label: string };

function Staff() {
  const { data: staffList } = useStaffList();
  const { mutateAsync: createStaff } = useStaffCreate();
  const { data: departmentData } = useDepartments();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
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
    const l = staffList?.length;
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

  const [searchTerm, setSearchTerm] = useState("");

  // Filter staff based on search term
  const filteredStaffList = staffList?.filter((staff) => {
    const name = staff?.name?.toLowerCase() ||undefined;
    const gender = staff?.gender?.toLowerCase() ||undefined;
    const phoneNumber = staff?.phoneNumber?.toString().toLowerCase() ||undefined;
    const email = staff?.email?.toLowerCase() ||undefined;
    const role = staff?.role?.toString().toLowerCase() ||undefined;
    const shift = staff?.shift?.toString().toLowerCase() ||undefined;

    console.log('mm',name,gender,phoneNumber,email,role,shift);
    

    // Check if any of the fields include the search term (case insensitive)
    return (
      name?.includes(searchTerm.toLowerCase()) ||
      gender?.includes(searchTerm.toLowerCase()) ||
      phoneNumber?.includes(searchTerm.toLowerCase()) ||
      email?.includes(searchTerm.toLowerCase()) ||
      role?.includes(searchTerm.toLowerCase()) ||
      shift?.includes(searchTerm.toLowerCase())
    );
  });

  // watch is act the onChange, we can get the onchange value with 'watch'
  const values = watch();
  console.log("Current Form Values:", values,filteredStaffList);

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
                  {...register("name", { required: "Required" })}
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

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search staff..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-active">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>E-Mail</th>
            <th>Role</th>
            <th>Shift</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffList?.length === 0 ? (
            <tr>
              <td colSpan={8}>No Data Found</td>
            </tr>
          ) : (
            filteredStaffList?.map((staff: IStaff) => (
              <tr key={staff?.id}>
                <td>{staff?.id}</td>
                <td>{capitalFirstLetters(staff?.name)}</td>
                <td>{capitalFirstLetters(staff?.gender)}</td>
                <td>{staff?.age}</td>
                <td>{staff?.phoneNumber}</td>
                <td>{staff?.email}</td>
                <td>{staff?.role}</td>
                <td>{staff?.shift}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* <table className="table table-active">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>E-Mail</th>
            <th>Role</th>
            <th>Shift</th>
          </tr>
        </thead>
        <tbody>
          {staffList?.length === 0 ? (
            <td>No Data Found</td>
          ) : (
            staffList?.map((staff: IStaff) => (
              <tr key={staff?.id}>
                <td>{staff?.id}</td>
                <td>{capitalFirstLetters(staff?.name)}</td>
                <td>{capitalFirstLetters(staff?.gender)}</td>
                <td>{staff?.age}</td>
                <td>{staff?.phoneNumber}</td>
                <td>{staff?.email}</td>
                <td>{staff?.role}</td>
                <td>{staff?.shift}</td>
              </tr>
            ))
          )}
        </tbody>
      </table> */}

      <div>
        <p>{capitalFirstLetters("vivin richard")}</p>
      </div>
    </div>
  );
}

export default Staff;
