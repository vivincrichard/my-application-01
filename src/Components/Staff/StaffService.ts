import axios from "axios";

export interface IStaff {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: number;
  phoneNumber: number;
  email:string;
  shift:number;
}

export const genderOptions = [
  { value: null, label: "Select" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export interface IDepartments {
  id: number | null;
  name: string;
}

export class Departments {
  static listDepartments = async () => {
    const response = await axios.get<IDepartments[]>(`http://localhost:4000/departments`);
    return response.data;
  };
  static createDepartment = async (payload: IDepartments) => {
    const response = await axios.post(`http://localhost:4000/departments`, payload);
    return response.data;
  };
}

export class StaffService {
  static fetchAll = async () => {
    const response = await axios.get<IStaff[]>("http://localhost:4000/staff");
    return response.data;
  };

  static create = async (payload: IStaff) => {
    const response = await axios.post<IStaff>(
      `http://localhost:4000/staff`,
      payload
    );
    return response.data;
  };
}
