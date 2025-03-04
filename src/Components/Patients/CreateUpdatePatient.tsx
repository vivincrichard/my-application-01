import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const CreateUpdatePatient = () => {
  const initialValue = {
    patientId: null,
    name: null,
    age: null,
    gender: null,
  };
  const validationSchema = Yup.object({
    patientId: Yup.string().nullable(),
    name: Yup.string().nullable().required("Name is Required"),
    age: Yup.number().nullable(),
    gender: Yup.string().nullable(),
  });
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log("vvvv", values);
        }}
      >
        <Form>
          <div className="row m-2">
            <div className="form-group col-3">
              <label htmlFor="name" className="from-label fw-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
            </div>
            <div className="col-3">
                <label htmlFor="age" className="fw-semibold">Age</label>
                {/* <input type="number" id="age" name="age" className="form-control" /> */}
                <Field name='age' className='form-control' type='number' />
            </div>
            <div className="col-3">
                <label htmlFor="gender" className="fw-semibold">Gender</label>
                <input type="text" id="gender" name="gender" className="form-control" />
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CreateUpdatePatient;
