import { useDoctorList } from "./DoctorQuery";

function ListDoctor() {
  const { data: doctorList } = useDoctorList();

  console.log("doc", doctorList);

  return (
    <>
      <table className="table table-active">
        <thead>
          <tr>
            <th>S.No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {doctorList?.map((doc: any) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.firstName}</td>
              <td>{doc.lastName}</td>
              <td>{doc.contact}</td>
              <td>{doc.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListDoctor;
