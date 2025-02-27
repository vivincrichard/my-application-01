import axios from "axios";
import { IPatient } from "./types";

export class Patient {
  static create = async (data: IPatient) => {
    const response = await axios.post(`http://localhost:4000/patients`);
    return response.data;
  };

  static update = async (id: string, data: IPatient) => {
    const response = await axios.patch(
      `http://localhost:4000/patients/${id}`,
      data
    );
    return response.data;
  };

  static delete = async (id: string) => {
    const response = await axios.delete(`http://localhost:4000/patients/${id}`);
    return response.data;
  };

  static getById = async (id: string) => {
    const response = await axios.get<IPatient>(
      `http://localhost:4000/patients/${id}`
    );
    return response.data;
  };

  static fetchAll = async () => {
    const response = await axios.get<IPatient[]>(
      `http://localhost:4000/patients`
    );
    return response.data;
  };
}
