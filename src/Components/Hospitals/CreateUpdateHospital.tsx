import { Field, Form, Formik } from "formik";
import { fetchAllHospital, useCreateHospital } from "./query/HospitalQuery";
import { IHospitalPayload } from "./service/HospitalService";
import * as Yup from "yup";
import { useRef } from "react";
// interface IProps {
//   hospital: IHospitalPayload;
// }

function CreateUpdateHospital() {
  const formikRef: any = useRef();

  const { mutateAsync: createHospital } = useCreateHospital();
  const { data: listHospital } = fetchAllHospital();
  const initialData = {
    hospitalName: "",
    registrationNo: "",
  };

  const validationSchema = Yup.object({
    hospitalName: Yup.string().required("Required"),
    registrationNo: Yup.number()
      .required("Required")
      .typeError("Must be a number"),
  });

  const findId = () => {
    if (!listHospital || listHospital.length === 0) return 1;
    else {
      console.log("lllll", typeof (listHospital.length + 1));

      return listHospital.length + 1;
    }
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialData}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
          const idLength = findId();
          const payload: IHospitalPayload = {
            id: idLength,
            hospitalName: values?.hospitalName,
            registrationNo: Number(values?.registrationNo),
          };

          createHospital(payload);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="hospitalName" className="form-label">
                Hospital Name
                <span className="text-danger">*</span>
              </label>
              <Field
                type="text"
                name="hospitalName"
                id="hospitalName"
                className="form-control"
              />
              <label htmlFor="registrationNo" className="form-label">
                Registration No
              </label>
              <Field
                type="number"
                name="registrationNo"
                id="registrationNo"
                className="form-control"
              />
              <div className="d-flex justify-content-end mt-2 gap-2">
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => {
                    formikRef.current.resetForm();
                  }}
                >
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
