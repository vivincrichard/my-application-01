import { Formik } from "formik";
import { useCreateHospital } from "./query/HospitalQuery";
import { IHospitalPayload } from "./service/HospitalService"
import * as Yup from 'yup';
interface IProps {
    hospital: IHospitalPayload;
}

function CreateUpdateHospital(props : IProps) {


    const {mutateAsync: createHospital} = useCreateHospital()

    const initialData = {
        id:'',
        hospitalNme:'',
        registrationNo:'',
    }

    const validationSchema = Yup.object({
        id:
    })


  return (
    <>
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
        >

        </Formik>
    </>
  )
}

export default CreateUpdateHospital