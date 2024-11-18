import { fetchAllHospital } from "./query/HospitalQuery";

function HospitalIndex() {
  const {
    data: listHospital,
    isLoading: listLoading,
    isError: listError,
  } = fetchAllHospital();

  console.log('aaaaaa',listHospital);
  

  return (
    <>
      <h1>Hospital</h1>
      <div className="container-fluid">
        <table className="table table-active">
          <thead>
            <tr>
              <th>Id</th>
              <th>Hospital Name</th>
              <th>Reg No</th>
            </tr>
          </thead>
          <tbody>
            {/* Directly map over the listHospital array */}
            {listHospital?.map((hospital) => (
              <tr key={hospital.id}>
                <td>{hospital.id}</td>
                <td>{hospital.hospitalName}</td>
                <td>{hospital.registrationNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HospitalIndex;
