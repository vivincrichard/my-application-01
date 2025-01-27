import React, { useState } from "react";
import Select from "react-select";
import { useDepartments, useStaffCreate, useStaffList } from "./StaffQuery";
import { genderOptions, IStaff } from "./staffService";
import { Controller, useForm } from "react-hook-form";
import { capitalFirstLetters } from "../Utils";
import ShiftType, { shiftEnumType } from "./StaffHelper";

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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({
    name: "",
    gender: "",
    age: "",
    phoneNumber: "",
    email: "",
    role: "",
    shift: "",
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

  const handleSearchChange = (key: string, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
  };

  const filteredStaffList = staffList?.filter((staff) => {
    const overallMatch = Object.values(staff).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columnMatch = Object.entries(searchTerms).every(([key, term]) => {
      if (!term) return true;
      return String(staff[key as keyof IStaff])
        .toLowerCase()
        .includes(term.toLowerCase());
    });
    return overallMatch && columnMatch;
  });

  const departmentOptions = [
    { value: null, label: "Select Role" }, // Default option
    ...(departmentData?.map((role) => ({
      value: role.id,
      label: role.name,
    })) || []),
  ];

  const onSubmit = (formData: any) => {
    const newStaff: IStaff = {
      id: String((staffList?.length || 0) + 1),
      ...formData,
      shift: Number(formData.shift || undefined),
    };

    createStaff(newStaff);
    clearValues();
  };

  const watchValues = watch();
  console.log("Current Form Values:", watchValues, filteredStaffList);

  return (
    <div className="m-3">
      <h5>Create Staff</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        (opt) => opt.value === field.value
                      )}
                      onChange={(opt) => field.onChange(opt?.value)}
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
                      options={departmentOptions}
                      value={departmentOptions?.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(opt) => field.onChange(opt?.value)}
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

      <h5>Search Staff</h5>
      {/* Search Inputs */}
      <input
        type="text"
        placeholder="Search across all columns"
        className="form-control mb-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-active">
        <thead>
          <tr>
            <th>ID</th>
            {Object.keys(searchTerms).map((key) => (
              <th key={key}>
                {capitalFirstLetters(key)}
                <input
                  type="text"
                  placeholder={`${key}`}
                  className="form-control"
                  value={searchTerms[key]}
                  onChange={(e) => handleSearchChange(key, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStaffList?.length ? (
            filteredStaffList.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{capitalFirstLetters(staff.name)}</td>
                <td>{capitalFirstLetters(staff.gender)}</td>
                <td>{staff.age}</td>
                <td>{staff.phoneNumber}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
                <td>
                  <ShiftType p={staff.shift as shiftEnumType} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;

// Object.values() - Returns an array of all the values of an object’s properties (ignores keys). Eg: ["Alice", 30, "New York"]
// Object.entries() - Returns an array of the object’s key-value pairs as nested arrays. Eg: name: Alice, age: 30, city: New York
// .some(): An array method that checks whether at least one element in the array satisfies a given condition. return true or false