import axios from "axios";

export interface roles {
  id: string;
  name: string;
}

export interface IStaff {
  id: string;
  name: string;
  age: number;
  role: string;
}

export class Staff {
  static create = async (payload :IStaff) => {
    const response = await axios.post<IStaff>(`http://localhost:4000/staff`,payload);
    return response.data;
  };

  static fetchAll = async () => {
    const response = await axios.get<IStaff>("http://localhost:4000/staff");
    return response.data;
  };
}
