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

export class Doctor {
  static create = async (data: IDoctors) => {
    const response = await axios.post<IDoctors>(
      "http://localhost:4000/doctors",
      data
    );
    return response.data;
  };

  static fetchAll = async () => {
    const response = await axios.get<IDoctors[]>(
      "http://localhost:4000/doctors"
    );
    return response.data;
  };

  static fetchId = async (id: string) => {
    const response = await axios.get<IDoctors>(
      `http://localhost:4000/doctors/${id}`
    );
    return response.data;
  };

  static update = async (id: string, data: any) => {
    const response = await axios.patch(
      `http://localhost:4000/doctors/${id}`,
      data
    );
    return response.data;
  };

  static delete = async (id: string) => {
    const response = await axios.delete(`http://localhost:4000/doctors/${id}`);
    return response.data;
  };
}
