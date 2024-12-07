import axios from "axios";

export interface IDoctors {
  id: string;
  firstName: string;
  lastName: string;
  contact: number;
  email: string;
  qualification: string[];
  specialization: string;
  MRI: number;
  stateMedicalCouncil: string;
  registrationDate: string;
}

export class Doctors {
  static create = async (data: IDoctors) => {
    const response = await axios.post<IDoctors>(
      "http://localhost:4000/doctors",
      data
    );
    return response.data;
  };

  static fetchAll = async () => {
    const response = await axios.get<IDoctors[]>("http://localhost:4000/doctors");
    return response.data;
  };

  
}
