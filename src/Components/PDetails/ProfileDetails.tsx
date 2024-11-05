import { useState } from "react";
import { listAllUser } from "./Query/PDetailQuery";
import { UserById } from "./service/PDetailService";

interface Errors {
  userName?: string;
  userContact?: string;
  userEmail?: string;
}

// function ProfileDetails() {
//   const [userName, setUserName] = useState<string>("");
//   const [userContact, setUserContact] = useState<string>(""); // Changed to string
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [userDetails, setUserDetails] = useState<
//     { name: string; contact: string; email: string }[]
//   >([]);
//   const [errors, setErrors] = useState<Errors>({}); // Specify type for errors

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Reset errors
//     setErrors({});

//     // Validation
//     const newErrors: Errors = {};
//     if (!userName) {
//       newErrors.userName = "Name is required.";
//     }
//     if (!userContact || userContact.length !== 10) {
//       // Checking length on string
//       newErrors.userContact = "Contact must be a 10-digit number.";
//     }
//     if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
//       newErrors.userEmail = "A valid email is required.";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Create a new user detail object
//     const newUserDetail = {
//       name: userName,
//       contact: userContact,
//       email: userEmail,
//     };

//     // Update the userDetails state
//     setUserDetails((prevDetails) => [...prevDetails, newUserDetail]);

//     // Clear the input fields
//     setUserName("");
//     setUserContact("");
//     setUserEmail("");
//   };

//   return (
//     <>
//       <div className="container mt-5 border">
//         <div className="d-flex justify-content-center mb-4">
//           <h1>Profile Details</h1>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group row">
//             <label htmlFor="name" className="col-sm-2 col-form-label">
//               Name
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className={`form-control ${
//                   errors.userName ? "is-invalid" : ""
//                 }`}
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//               {errors.userName && (
//                 <div className="invalid-feedback">{errors.userName}</div>
//               )}
//             </div>
//           </div>
//           <div className="form-group row">
//             <label htmlFor="contact" className="col-sm-2 col-form-label">
//               Contact
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="text" // Changed to text to handle digits correctly
//                 name="contact"
//                 id="contact"
//                 className={`form-control ${
//                   errors.userContact ? "is-invalid" : ""
//                 }`}
//                 value={userContact}
//                 onChange={(e) => setUserContact(e.target.value)}
//               />
//               {errors.userContact && (
//                 <div className="invalid-feedback">{errors.userContact}</div>
//               )}
//             </div>
//           </div>
//           <div className="form-group row">
//             <label htmlFor="email" className="col-sm-2 col-form-label">
//               Email
//             </label>
//             <div className="col-sm-10">
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className={`form-control ${
//                   errors.userEmail ? "is-invalid" : ""
//                 }`}
//                 value={userEmail}
//                 onChange={(e) => setUserEmail(e.target.value)}
//               />
//               {errors.userEmail && (
//                 <div className="invalid-feedback">{errors.userEmail}</div>
//               )}
//             </div>
//           </div>
//           <div className="form-group row">
//             <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className="container mt-4">
//         {userDetails.length > 0 && (
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Contact</th>
//                 <th>Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userDetails.map((detail, index) => (
//                 <tr key={index}>
//                   <td>{detail.name}</td>
//                   <td>{detail.contact}</td>
//                   <td>{detail.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

function ProfileDetails () {


  const {data: userList, isLoading, isError} = listAllUser();

  console.log('list',userList);
  

  return (
    <>
      {isLoading ? (
        <h3>Loading</h3>
      ) : isError ? (
        <h3>Error in Data</h3>
      ) : (
        <>
          {userList && userList?.length && (
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user) => (
                  <tr key={user?.id}>
                    <td>{user?.id}</td>
                    <td>{user?.name}</td>
                    <td>{user?.contact}</td>
                    <td>{user?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );

}
export default ProfileDetails;
