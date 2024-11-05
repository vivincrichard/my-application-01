import axios from "axios";

export interface IUserPayload {
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
export const UserById = (id: number | null) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.GET_USER, `ID-${id}`], // Key to identify this query in the cache
    queryFn: () => User.fetchUserById(id), // Fetching the user by ID via the User service
    enabled: false, // Initially disabling the query, it will only run when refetched
  });

  useEffect(() => {
    if (id) {
      // Only refetch when the ID is not null
      refetch(); // Manually trigger the query to fetch the user data
    }
  }, [id]); // Effect depends on the `id`, so it will rerun when `id` changes

  return { data, isLoading }; // Return the query result (data and loading state)
};
