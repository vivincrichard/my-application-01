import { useState } from "react";
import { createUser, listAllUser } from "./Query/PDetailQuery";
import { IUserPayload } from "./service/PDetailService";
import Reports from "../Pages/Reports";
import Slider from "../HOD/Slider";

interface Errors {
  userName?: string;
  userContact?: string; // Error message will be a string
  userEmail?: string;
}

function ProfileDetails() {
  const [userName, setUserName] = useState<string>("");
  const [userContact, setUserContact] = useState<number | "">(""); // userContact is either a number or empty string
  const [userEmail, setUserEmail] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});

  // Fetch list of users to get the highest ID
  const {
    data: listUser,
    isLoading: listLoading,
    isError: listError,
  } = listAllUser();

  const { mutateAsync: create } = createUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Errors = {};
    if (!userName) {
      newErrors.userName = "Name is required.";
    }
    if (
      typeof userContact !== "number" ||
      userContact.toString().length !== 10
    ) {
      newErrors.userContact = "Contact must be a 10-digit number.";
    }
    if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
      newErrors.userEmail = "A valid email is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Find the highest ID from the list of users
    const highestId =
      listUser && listUser.length > 0
        ? Math.max(...listUser.map((user) => user.id))
        : 0; // If no users exist, start from 0

    // Increment the ID for the new user
    const newUserId = highestId + 1;

    // Create new user detail object with the incremented ID
    const newUserDetail: IUserPayload = {
      id: newUserId, // Include the incremented ID here
      name: userName,
      contact: userContact,
      email: userEmail,
    };

    // Call the API to create the new user
    create(newUserDetail);

    // Clear form fields after submission
    setUserName("");
    setUserContact("");
    setUserEmail("");
  };

  return (
    <>
      <Slider
        header="Create User"
        id="offcanvasStart"
        width="50"
        sliderBody={
          <div className="container mt-5 border">
            <div className="d-flex justify-content-center mb-4">
              <h1>Profile Details</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${
                      errors.userName ? "is-invalid" : ""
                    }`}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {errors.userName && (
                    <div className="invalid-feedback">{errors.userName}</div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="contact" className="col-sm-2 col-form-label">
                  Contact
                </label>
                <div className="col-sm-10">
                  <input
                    type="number" // Ensures numeric input only
                    name="contact"
                    id="contact"
                    className={`form-control ${
                      errors.userContact ? "is-invalid" : ""
                    }`}
                    value={userContact === "" ? "" : userContact} // Handle the empty string correctly
                    onChange={(e) =>
                      setUserContact(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                  {errors.userContact && (
                    <div className="invalid-feedback">{errors.userContact}</div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                      errors.userEmail ? "is-invalid" : ""
                    }`}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  {errors.userEmail && (
                    <div className="invalid-feedback">{errors.userEmail}</div>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        }
      />
      <div className="container d-flex justify-content-end">
        {/* Offcanvas Toggle Button */}
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasStart"
          aria-controls="offcanvasStart"
        >
          Create User
        </button>
      </div>
      <div className="container mt-4">
        {listLoading ? (
          <h3>Loading...</h3>
        ) : listError ? (
          <h3>Error in Data</h3>
        ) : (
          listUser &&
          listUser.length > 0 && (
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
                {listUser.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
}

export default ProfileDetails;
