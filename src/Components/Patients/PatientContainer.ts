import { connect } from "react-redux"
import { createPatient } from "./PatientAction"
import PatientIndex from "./Index"
import { IPatientState } from "./types"



const mapStateToProps = (state: IPatientState) => ({
patient: state.patientDetails,
})

const mapDispatchToProps =  {
    createPatient,
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientIndex)