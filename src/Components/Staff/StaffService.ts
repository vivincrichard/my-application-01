import axios from "axios";

export interface IStaff {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: number;
}

export const genderOptions = [
  { value: null, label: "Select" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export interface IRoles {
  id: number;
  name: string;
}

export class Roles {
  static listRoles = async () => {
    const response = await axios.get<IRoles[]>(`http://localhost:4000/roles`);
    return response.data;
  };
  static createRoles = async (payload: IRoles) => {
    const response = await axios.post(`http://localhost:4000/roles`, payload);
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
