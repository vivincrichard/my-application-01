import axios from "axios";

export interface IHospitalPayload {
  id: String | any;
  hospitalName: string | undefined;
  registrationNo: number;
  location?: ILocation;
}

export interface ILocation {
  street?: string;
  area?: string;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  pincode?: number;
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
    const response = await axios.get<IHospitalPayload[]>(
      "http://localhost:4000/hospitals"
    );
    return response.data;
  };

  static fetchById = async (id:any) => {
    const response = await axios.get<IHospitalPayload>(
      `http://localhost:4000/hospitals/${id}`
    );
    return response.data;
  }
}
