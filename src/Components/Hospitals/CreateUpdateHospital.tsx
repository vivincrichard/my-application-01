import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  fetchAllHospital,
  useCreateHospital,
  useFetchById,
  useUpdateHospital,
} from "./query/HospitalQuery";
import { IHospitalPayload } from "./service/HospitalService";
import * as Yup from "yup";
import { useRef, useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

interface IProps {
  selectedId: number;
}

function CreateUpdateHospital(props: IProps) {
  const formikRef: any = useRef();

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const { mutateAsync: createHospital } = useCreateHospital();
  const { data: listHospital } = fetchAllHospital();
  const { data: selectedHospital } = useFetchById(props?.selectedId);
  const { mutateAsync: updateHospital } = useUpdateHospital();

  console.log("selectedHospital", selectedHospital);

  // Initial form data based on the selectedId (if available)
  const initialData = {
    hospitalName: props?.selectedId ? selectedHospital?.hospitalName : "",
    registrationNo: props?.selectedId ? selectedHospital?.registrationNo : "",
    location: {
      country: props?.selectedId ? selectedHospital?.location?.country : "",
      state: props?.selectedId ? selectedHospital?.location?.state : "",
      city: props?.selectedId ? selectedHospital?.location?.city : "",
      pinCode: props?.selectedId ? selectedHospital?.location?.pincode : "",
    },
  };

  console.log("init", initialData);

  const validationSchema = Yup.object({
    hospitalName: Yup.string().required("Hospital Name is required"),
    registrationNo: Yup.number()
      .required("Registration No is required")
      .typeError("Registration No must be a number"),
    location: Yup.object({
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      pinCode: Yup.number().required("PinCode is Required"),
    }),
  });

  const noOfHospital = () => {
    if (!listHospital || listHospital.length === 0) return 1;
    else {
      return listHospital.length + 1;
    }
  };

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    // Fetch states and cities based on selectedId if available
    if (props.selectedId && selectedHospital) {
      const countryIso = selectedHospital.location?.country;
      const stateIso = selectedHospital.location?.state;

      console.log("stateIso", stateIso, "countryIso", countryIso);

      if (countryIso) {
        const stateList = State.getStatesOfCountry(countryIso);
        setStates(stateList);

        // Set city list based on selected state
        if (stateIso) {
          const cityList = City.getCitiesOfState(countryIso, stateIso);
          setCities(cityList);
        }
      }
    }
  }, [props.selectedId, selectedHospital]);

  const handleCountryChange = (isoCode: string) => {
    const stateList = State.getStatesOfCountry(isoCode);
    setStates(stateList);
    setCities([]); // Reset cities when country changes
  };

  const handleStateChange = (isoCode: string) => {
    const cityList = City.getCitiesOfState(states[0]?.countryCode, isoCode);
    setCities(cityList);
  };

  console.log("tttt", typeof props?.selectedId);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialData}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          const idLength = noOfHospital();
          const createPayload: IHospitalPayload = {
            id: String(idLength),
            hospitalName: values?.hospitalName,
            registrationNo: Number(values?.registrationNo),
            location: {
              country: values.location?.country,
              state: values.location?.state,
              city: values.location?.city,
              pincode: Number(values.location?.pinCode),
            },
          };

          const updatePayload = {
            hospitalName: values?.hospitalName,
            registrationNo: Number(values?.registrationNo),
            location: {
              country: values.location?.country,
              state: values.location?.state,
              city: values.location?.city,
              pincode: Number(values.location?.pinCode),
            },
          };

          if (props.selectedId) {
            updateHospital({
              id: String(props?.selectedId),
              data: updatePayload,
            });
          } else {
            createHospital(createPayload);
            formikRef.current.resetForm();
            setStates([]);
            setCities([]);
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="hospitalName" className="form-label">
                Hospital Name <span className="text-danger">*</span>
              </label>
              <Field
                type="text"
                name="hospitalName"
                id="hospitalName"
                className="form-control"
              />
              <ErrorMessage
                name="hospitalName"
                component="div"
                className="text-danger"
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
              <ErrorMessage
                name="registrationNo"
                component="div"
                className="text-danger"
              />

              <label htmlFor="country">Country</label>
              <Field
                as="select"
                name="location.country"
                id="country"
                className="form-select"
                onChange={(e: any) => {
                  handleChange(e);
                  handleCountryChange(e.target.value);
                  setFieldValue("location.state", ""); // Reset state while changing country
                  setFieldValue("location.city", ""); // Reset city while changing country
                }}
                value={values.location.country}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="location.country"
                component="div"
                className="text-danger"
              />

              <label htmlFor="state">State</label>
              <Field
                as="select"
                name="location.state"
                id="state"
                className="form-select"
                onChange={(e: any) => {
                  handleChange(e);
                  handleStateChange(e.target.value);
                  setFieldValue("location.city", ""); // Reset city
                }}
                value={values.location.state}
                disabled={!states.length}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="location.state"
                component="div"
                className="text-danger"
              />

              <label htmlFor="city">City</label>
              <Field
                as="select"
                name="location.city"
                id="city"
                className="form-select"
                value={values.location.city}
                onChange={handleChange}
                disabled={!cities.length}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="location.city"
                component="div"
                className="text-danger"
              />

              <label htmlFor="pincode" className="form-label">
                PinCode
              </label>
              <Field
                type="number"
                name="location.pinCode"
                className="form-control"
              />
              <ErrorMessage
                name="location.pinCode"
                component="div"
                className="text-danger"
              />

              <div className="d-flex justify-content-end mt-2 gap-2">
                <button
                  id="hospital-formik"
                  className="btn btn-light"
                  type="button"
                  data-testid="reset-test"
                  onClick={() => {
                    formikRef.current.resetForm();
                    setStates([]);
                    setCities([]);
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
