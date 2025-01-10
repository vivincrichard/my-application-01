import axios from "axios";

export interface roles {
  id: string;
  name: string;
}

export interface IStaff {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: string;
}
export type OptionType = { value: string; label: string };

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export interface IRoles {
  id: string;
  name: string;
}

export class Roles {
  static listRoles = async () => {
    const response = await axios.get(`http://localhost:4000/roles`);
    return response.data;
  };
  static createRoles = async (payload: IRoles) => {
    const response = await axios.post(`http://localhost:4000/roles`, payload);
    return response.data;
  };
}

export class StaffService {
  static create = async (payload: IStaff) => {
    const response = await axios.post<IStaff>(
      `http://localhost:4000/staff`,
      payload
    );
    return response.data;
  };

  static fetchAll = async () => {
    const response = await axios.get<IStaff>("http://localhost:4000/staff");
    return response.data;
  };
}
