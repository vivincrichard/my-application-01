import axios from "axios";

export interface IUserPayload {
  id:number,
  name: string;
  contact: number;
  email: string;
}

export interface IUser {
  id: number;
  name: string;
  contact: number;
  email: string;
}

export class User {
  static create = async (payload: IUserPayload) => {
    const response = await axios.post<IUser>(
      "http://localhost:4000/user",
      payload
    );
    return response.data;
  };

  static update = async (id: number, data: IUserPayload) => {
    const response = await axios.patch<IUser>(
      `http://localhost:4000/user/${id}`,
      data
    );
    return response.data;
  };

  static delete = async (id: number) => {
    const response = await axios.delete<IUser>(
      `http://localhost:4000/user/${id}`
    );
    return response.data;
  };

  static fetchAllUser = async () => {
    const response = await axios.get<IUser[]>("http://localhost:4000/user");
    return response.data;
  };

  static fetchUserById = async (id: number | null) => {
    const response = await axios.get<IUser>(`http://localhost:4000/user/${id}`);
    return response.data;
  };
}