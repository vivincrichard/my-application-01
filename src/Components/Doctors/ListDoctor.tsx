import { useState } from "react";
import { useDeleteDoctor, useDoctorList } from "./DoctorQuery";

interface IProps {
  onSelectDoctor: (id: string) => void;
}
function ListDoctor(props: IProps) {
  const [selectedId, setSelectedId] = useState<string>();
  const { data: doctorList } = useDoctorList();
  const { mutateAsync: deleteDoctor } = useDeleteDoctor();

  const handleSelectId = (id: string) => {
    setSelectedId(id);
    props.onSelectDoctor(id);
  };

  const handleDelete = (id: string) => {
    deleteDoctor(id);
  };

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
            <th>action</th>
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
              <td>
                <button
                  className="btn btn-light"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#createUpdateDoctor"
                  onClick={() => handleSelectId(doc.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(doc.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListDoctor;
