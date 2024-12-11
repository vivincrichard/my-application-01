import { useForm, useFieldArray } from "react-hook-form";
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
  const [id, setId] = useState<string>();

  useEffect(() => {
    setId(props.selectedId);
  }, [props.selectedId]);

  console.log("iddddddddddd", id);
  const { mutateAsync: createDoctor } = useCreateDoctor();
  const { data: list } = useDoctorList();
  const { data: getDoctor } = useDoctorId(props?.selectedId);
  const { mutateAsync: updateDoctor } = useUpdateDoctor();

  console.log("oneDoc", getDoctor);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: props?.selectedId ? getDoctor?.firstName : "",
      lastName: props?.selectedId ? getDoctor?.lastName : "",
      contact: props?.selectedId ? getDoctor?.contact : "",
      email: props?.selectedId ? getDoctor?.email : "",
      qualification: props?.selectedId
        ? getDoctor?.qualification
        : [""], // Default qualification for edit
      specialization: props?.selectedId
        ? getDoctor?.specialization
        : [""],
    },
  });

  const {
    fields: qualificationFields,
    append: qualificationAppend,
    remove: qualificationRemove,
  } = useFieldArray<any>({
    control,
    name: "qualification", // The field name for qualification
  });

  const {
    fields: specializationField,
    append: specializationAppend,
    remove: specializationRemove,
  } = useFieldArray<any>({
    control,
    name: "specialization",
  });

  useEffect(() => {
    if (getDoctor) {
      reset({
        firstName: getDoctor.firstName || "",
        lastName: getDoctor.lastName || "",
        contact: getDoctor.contact || "" ,
        email: getDoctor.email || "",
        qualification: getDoctor.qualification || [""], // Fill qualification on edit
        specialization: getDoctor.specialization || [""],
      });
    }
  }, [getDoctor, reset]);

  const findId = () => {
    const l = list?.length;
    console.log("llllllll", String(Number(l) + 1));
    return String(Number(l) + 1);
  };

  const onSubmit = (payload: any) => {
    const idLength = findId();
    payload = { ...payload, id: idLength }; // No need to include qualification in payload, as it's managed by React Hook Form
    console.log("payload", payload);
    if (props?.selectedId) {
      updateDoctor({ id: props?.selectedId, data: payload });
    } else {
      createDoctor(payload);
      reset();
      setId("");
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
            {qualificationFields.map((item, index) => (
              <div key={item.id} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  {...register(`qualification.${index}`)}
                  className="form-control me-2"
                  placeholder={`Qualification ${index + 1}`}
                />
                {qualificationFields.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => qualificationRemove(index)} // Remove qualification
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={() => qualificationAppend("")} // Add a new qualification field
            >
              Add Qualification
            </button>
          </div>

          <div>
            <label htmlFor="specialization">Specialization</label>
            {specializationField.map((special, index) => (
              <div key={special.id} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  {...register(`specialization.${index}`)}
                  className="form-control"
                />
                {specializationField.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => specializationRemove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => specializationAppend("")}
            >
              Add Specialization
            </button>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={() => reset()}
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
