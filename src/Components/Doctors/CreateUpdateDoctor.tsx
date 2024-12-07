import { useForm } from "react-hook-form";
import { useCreateDoctor, useDoctorList } from "./DoctorQuery";

const CreateUpdateDoctor = () => {

  const {mutateAsync: createDoctor} = useCreateDoctor();
  const {data: list} = useDoctorList();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClear = () => {
    reset();
  };

  const findId = () => {
    const l = list?.length;
    console.log('llllllll',Number(l) + 1);
    
    return Number(l) + 1;
  }

  const onSubmit = (data: any) => {
    const idLength = findId();
    data = {...data,id:idLength }
    console.log("data", data);
    createDoctor(data);
    reset();
  };

  return (
    <div className="form-group">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          
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
              <p className="text-danger">
                {(errors.firstName as any)?.message}
              </p>
            )}
          </div>

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
              <p className="text-danger">{(errors.lastName as any)?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              id="contact"
              className="form-control"
              {...register("contact", { required: "Contact is required" })}
            />
            {errors.contact && (
              <p className="text-danger">{(errors.contact as any)?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="form-control"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-danger">{(errors.email as any)?.message}</p>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-light"
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateDoctor;
