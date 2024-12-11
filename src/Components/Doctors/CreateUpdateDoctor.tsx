import { useForm } from "react-hook-form";
import {
  useCreateDoctor,
  useDoctorId,
  useDoctorList,
  useUpdateDoctor,
} from "./DoctorQuery";
import { useEffect, useState } from "react";

interface IProps {
  selectedId: string;
}

const CreateUpdateDoctor = (props: IProps) => {
  console.log("receivedId", props.selectedId);

  const { mutateAsync: createDoctor } = useCreateDoctor();
  const { data: list } = useDoctorList();
  const { data: getDoctor } = useDoctorId(props?.selectedId);
  const { mutateAsync: updateDoctor } = useUpdateDoctor();

  console.log("oneDoc", getDoctor);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: props?.selectedId ? getDoctor?.firstName : "",
      lastName: props?.selectedId ? getDoctor?.lastName : "",
      contact: props?.selectedId ? getDoctor?.contact : "",
      email: props?.selectedId ? getDoctor?.email : "",
      qualification: props?.selectedId
        ? getDoctor?.qualification || [""]
        : [""], // Default to first qualification
    },
  });

  useEffect(() => {
    if (getDoctor) {
      reset({
        firstName: getDoctor.firstName,
        lastName: getDoctor.lastName,
        contact: getDoctor.contact,
        email: getDoctor.email,
        qualification: getDoctor.qualification || [""], // Fill qualification on edit
      });
      setqualification(getDoctor.qualification || [""]); // Set initial qualification from fetched data
    }
  }, [getDoctor, reset]);

  const [qualification, setqualification] = useState<string[]>(
    props?.selectedId ? getDoctor?.qualification || [""] : [""]
  );
  console.log('len',qualification);
  

  const handleClear = () => {
    reset();
  };

  const findId = () => {
    const l = list?.length;
    console.log("llllllll", String(Number(l) + 1));
    return String(Number(l) + 1);
  };

  const addQualification = () => {
    if (qualification[qualification.length - 1]) {
       ([...qualification, ""]); // Add a new qualification only if the last one is filled
    }
  };

  const handleQualificationChange = (index: number, value: string) => {
    const updatedqualification = [...qualification];
    updatedqualification[index] = value;
    setqualification(updatedqualification);
  };

  const removeQualification = (index: number) => {
    if (qualification.length > 1) {
      const updatedqualification = qualification.filter((_, i) => i !== index);
      setqualification(updatedqualification);
    }
  };

  const onSubmit = (payload: any) => {
    const idLength = findId();
    payload = { ...payload, id: idLength, qualification }; // Include qualification in the payload
    console.log("payload", payload);
    if (props?.selectedId) {
      updateDoctor({ id: props?.selectedId, data: payload });
    } else {
      createDoctor(payload);
      reset();
      setqualification([""]); // Reset qualification after submit
    }
  };

  return (
    <div className="form-group">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <p className="text-danger">{errors.firstName?.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <p className="text-danger">{errors.lastName?.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              id="contact"
              className="form-control"
              {...register("contact", { required: "Contact is required" })}
            />
            {errors.contact && (
              <p className="text-danger">{errors.contact?.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email?.message}</p>
            )}
          </div>

          {/* Dynamic qualification */}
          <div>
            <label htmlFor="qualification">qualification</label>
            {qualification.map((qualification, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) =>
                    handleQualificationChange(index, e.target.value)
                  }
                  className="form-control me-2"
                  placeholder={`Qualification ${index + 1}`}
                  required
                />
                {/* Remove Button */}
                {qualification.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeQualification(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {/* Add Qualification Button */}
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={addQualification}
            >
              Add Qualification
            </button>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-light"
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              {props?.selectedId ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateDoctor;
