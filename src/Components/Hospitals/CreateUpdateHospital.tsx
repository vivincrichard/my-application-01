import { Field, Form, Formik } from "formik";
import { useCreateHospital } from "./query/HospitalQuery";
import { IHospitalPayload } from "./service/HospitalService";
import * as Yup from "yup";
import { useRef } from "react";
// interface IProps {
//   hospital: IHospitalPayload;
// }

function CreateUpdateHospital() {
  const formikRef: any = useRef();

  const { mutateAsync: createHospital } = useCreateHospital();

  const initialData = {
    id: "",
    hospitalName: "",
    registrationNo: "",
  };

  const validationSchema = Yup.object({
    id: Yup.string().required("Required").max(10, "Less than 10 Characters"),
    hospitalName: Yup.string().required("Required"),
    registrationNo: Yup.number().required("Required"),
  });

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialData}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="from-group">
              <label htmlFor="name" className="form-label">
                Hospital Name
                <span className="text-danger">*</span>
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                values={values?.hospitalName}
                className="form-control"
              />
              <label htmlFor="regNo">Registration No</label>
              <Field
                type="number"
                name="regNo"
                id="regNo"
                values={values?.registrationNo}
                className="form-control"
              />
              <div className="d-flex justify-content-end mt-2 gap-2">
                <button className="btn btn-light" type="button">
                  Clear
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateUpdateHospital;
