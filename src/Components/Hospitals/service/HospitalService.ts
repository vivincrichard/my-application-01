import axios from "axios";

export interface IHospitalPayload {
  id: number;
  hospitalName: string;
  registrationNumber: number;
  location: IHospitalLocation;
}

export interface IHospitalLocation {
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
}

export interface IHospitalList {
  list:IHospitalPayload[];
}

export class Hospital {
  static create = async (data: IHospitalPayload) => {
    const response = await axios.post<IHospitalPayload>(
      "http://localhost:4000/hospitals",
      data
    );
    return response.data;
  };

  static fetchAll = async () => {
    const response = await axios.get<IHospitalList[]>(
      "http://localhost:4000/hospitals"
    );
    return response.data;
  };
}
